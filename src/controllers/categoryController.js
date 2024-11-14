const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  const { name, slug, use_in_menu } = req.body;

  const newCategory = await Category.create({ name, slug, use_in_menu });

  res.status(201).send({
    message: `Categoria ${newCategory.name} criada com sucesso! ID: ${newCategory.id}`,
  });
};

const getCategoryById = async (req, res) => {
  const category = await Category.findByPk(parseInt(req.params.id));
  console.log(category);

  res.status(200).send(category);
};

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
  const category = await Category.findByPk(parseInt(req.params.id));

  await category.update(req.body);

  res.status(204).send();
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByPk(parseInt(req.params.id));

  await category.destroy();

  res.status(200).send();
};

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
