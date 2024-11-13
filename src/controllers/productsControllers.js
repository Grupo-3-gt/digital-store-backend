const productModel = require("../models/productModel");
const productImageModel = require("../models/imageModel");
const productOptionModel = require("../models/productOptionModel");
const categoryModel = require('../models/categoryModel')

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

  try {
    const product = await productModel.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
    });

    // if (category_ids && category_ids.length > 0) {
    //   const categories = await categoryModel.findAll({
    //     where: { id: category_ids },
    //   });
    //   await product.setCategories(categories);
    // }

    if (images && images.length > 0) {
      for (let image of images) {
        await productImageModel.create({ product_id: product.id, ...image });
      }
    }

    if (options && options.length > 0) {
      for (let option of options) {
        await productOptionModel.create({ product_id: product.id, ...option });
      }
    }

    res.status(201).json(product);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map((e) => e.message),
      });
    }
    res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
}
module.exports = { createProduct };
