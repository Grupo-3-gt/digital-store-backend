const { Op } = require("sequelize");
const Category = require("../models/categoryModel");

async function middlewareCreateCategory(req, res, next) {
    try {
        const { name, slug, use_in_menu } = req.body;

        const newCategory = Category.build({
            name,
            slug,
            use_in_menu,
        });
        await newCategory.validate();

        const categoryByName = await Category.findOne({ where: { name: name } });
        if (categoryByName) {
            return res.status(409).json({ message: "Categoria já existe com este nome" });
        }

        const categoryBySlug = await Category.findOne({ where: { slug: slug } });
        if (categoryBySlug) {
            return res.status(409).json({ message: "Categoria já existe com este slug" });
        }

        next();
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: "Erro de validação",
                errors: error.errors.map((e) => e.message),
            });
        }

        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
}

async function middlewareGetCategoryById(req, res, next) {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const category = await Category.findOne({ where: { id: id } });

        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
}

async function middlewareUpdateCategory(req, res, next) {
    try {
        const { name, slug, use_in_menu } = req.body;

        const category = await Category.findByPk(req.params.id);

        if (name !== undefined) category.name = name;
        if (slug !== undefined) category.slug = slug;
        if (use_in_menu !== undefined) category.use_in_menu = use_in_menu;

        await category.validate();

        if (name !== undefined) {
            const categoryByName = await Category.findOne({
                where: { name: name, id: { [Op.ne]: req.params.id } },
            });
            if (categoryByName) {
                return res.status(409).json({ message: "Outra categoria já existe com este nome" });
            }
        }

        if (slug !== undefined) {
            const categoryBySlug = await Category.findOne({
                where: { slug: slug, id: { [Op.ne]: req.params.id } },
            });
            if (categoryBySlug) {
                return res.status(409).json({ message: "Outra categoria já existe com este slug" });
            }
        }

        next();
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: "Erro de validação",
                errors: error.errors.map((e) => e.message),
            });
        }

        return res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
}

async function middlewareDeleteCategory(req, res, next) {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const category = await Category.findOne({ where: { id: id } });

        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
}

module.exports = {
    middlewareCreateCategory,
    middlewareGetCategoryById,
    middlewareUpdateCategory,
    middlewareDeleteCategory,
};