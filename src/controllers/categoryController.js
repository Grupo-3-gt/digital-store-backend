const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;
    const newCategory = await Category.create({ name, slug, use_in_menu });
    res.status(201).send({
      message: `Categoria ${newCategory.name} criada com sucesso! ID: ${newCategory.id}`,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map((e) => e.message),
      });
    }
    res
      .status(400)
      .send({ message: "Erro ao criar categoria!", error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  if (!id) {
    return res.status(400).json({ message: "id invalido" });
  }
    try {
        const category = await Category.findByPk(req.params.id);

        if(!category) {
            
        }

    } catch (error) {
        
    }
}

const listCategories = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields, use_in_menu } = req.query;

    const query = {};
    if (use_in_menu !== undefined) {
      query.use_in_menu = use_in_menu === "true";
    }

    const options = {
      where: query,
      attributes: fields ? fields.split(",") : undefined,
      limit: limit == -1 ? undefined : parseInt(limit, 10),
      offset:
        limit == -1
          ? undefined
          : (parseInt(page, 10) - 1) * parseInt(limit, 10),
    };

    const categories = await Category.findAll(options);
    const total = await Category.count({ where: query });

    res.status(200).send({
      data: categories,
      total,
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
    });
  } catch (error) {
    res.status(400).send({
      message: "Erro ao buscar categorias!",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });
    if (category) {
      await category.update(req.body);
      res.status(200).send({
        message: `Categoria ${category.name} atualizada com sucesso!`,
      });
    } else {
      res.status(404).send({
        message: "Categoria não encontrada!",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Erro ao atualizar categoria!",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });
    if (category) {
      await category.destroy();
      res.status(200).send({
        message: `Categoria ${category.name} deletada com sucesso!`,
      });
    } else {
      res.status(404).send({
        message: "Categoria não encontrada!",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Erro ao deletar categoria!",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
  getCategoryById
};
