const { Sequelize } = require("sequelize");
const connection = require("../config/database/connection");
const productModel = require("../models/productModel");
const productImageModel = require("../models/imageModel");
const productOptionModel = require("../models/productOptionModel");
const categoryModel = require("../models/categoryModel");
const productCategoryModel = require("../models/productCategoryModel");

async function createProduct(req, res) {
  const {
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
    images,
    options,
  } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({
      message:
        "O campo 'images' é obrigatório e deve conter pelo menos uma imagem.",
    });
  }

  if (!options || !Array.isArray(options) || options.length === 0) {
    return res.status(400).json({
      message:
        "O campo 'options' é obrigatório e deve conter pelo menos uma opção.",
    });
  }

  const transaction = await connection.transaction();

  try {
    const product = await productModel.create(
      {
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      },
      { transaction }
    );

    const categoryAssociations = category_ids.map((categoryId) => ({
      product_id: product.id,
      category_id: categoryId,
    }));

    await productCategoryModel.bulkCreate(categoryAssociations, {
      transaction,
    });

    await productImageModel.bulkCreate(
      images.map((img) => ({
        ...img,
        product_id: product.id,
      })),
      { validate: true, transaction }
    );

    await productOptionModel.bulkCreate(
      options.map((opt) => ({
        ...opt,
        product_id: product.id,
      })),
      { validate: true, transaction }
    );

    await transaction.commit();
    res.status(201).send(product);
  } catch (error) {
    await transaction.rollback();

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "AggregateError"
    ) {
      const validationErrors = error.errors.map((err) => {
        if (err instanceof Sequelize.BulkRecordError) {
          if (Array.isArray(err.errors)) {
            return err.errors.map((e) => e.message);
          } else if (err.errors && err.errors.message) {
            return err.errors.message;
          }
        }
        return err.message;
      });

      return res.status(400).json({
        message: "Erro de validação",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
}

async function listProducts(req, res) {
  try {
    const {
      limit = 12,
      page = 1,
      fields,
      match,
      category_ids,
      "price-range": priceRange,
      ...options
    } = req.query;
    const limitValue = parseInt(limit, 10);
    const offset = limitValue > 0 ? (page - 1) * limitValue : undefined;
    const attributes = fields ? fields.split(",") : undefined;
    const where = {};
    if (match) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${match}%` } },
        { description: { [Op.iLike]: `%${match}%` } },
      ];
    }
    if (category_ids) {
      where.category_id = {
        [Op.in]: category_ids.split(",").map((id) => parseInt(id, 10)),
      };
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange
        .split("-")
        .map((price) => parseFloat(price));
      where.price = { [Op.between]: [minPrice, maxPrice] };
    }
    for (const [optionId, optionValues] of Object.entries(options)) {
      if (optionId.startsWith("option[")) {
        const id = optionId.slice(7, -1);
        where[`option_${id}`] = { [Op.in]: optionValues.split(",") };
      }
    }
    const { count: total } = await productModel.findAndCountAll({ where });

    const products = await productModel.findAll({
      where,
      include: [
        {
          model: productImageModel,
          as: "images",
          attributes: ["id", "enabled", "path"],
        },
        {
          model: productOptionModel,
          as: "options",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        { model: productCategoryModel, as: "category_ids", attributes: ["id"] },
      ],
      attributes,
      limit: limitValue > 0 ? limitValue : undefined,
      offset,
    });

    res.status(200).json({
      data: products,
      total,
      limit: limitValue > 0 ? limitValue : undefined,
      page: limitValue > 0 ? page : undefined,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
}

async function getProductById(req, res) {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).send({ message: "id invalido" });
  }

  const product = await productModel.findByPk(id, {
    include: [
      {
        model: productImageModel,
        as: "images",
        attributes: ["id", "enabled", "path"],
      },
      {
        model: productOptionModel,
        as: "options",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      { model: productCategoryModel, as: "category_ids", attributes: ["id"] },
    ],
  });

  if(!product){
    return res.status(400).send({ message: "produto não encontrado" });
  }

  res.status(200).send(product)
}

async function deleteProduct(req, res) {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).send({ message: "id invalido" });
  }

  const product = await productModel.findByPk(id);

  if(!product){
    return res.status(400).send({ message: "produto não encontrado" });
  }

  product.destroy()

  res.status(204).send()
}

module.exports = { createProduct, listProducts, getProductById, deleteProduct };
