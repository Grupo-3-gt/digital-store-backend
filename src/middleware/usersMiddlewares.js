const { Op } = require("sequelize");
const userModel = require("../models/userModel");

async function middlewareCreateUser(req, res, next) {
  try {
    const { first_name, surname, cpf, email, phone, password } = req.body;

    const newUser = userModel.build({
      first_name,
      surname,
      cpf,
      email,
      phone,
      password,
    });
    
    await newUser.validate();

    const userByEmail = await userModel.findOne({ where: { email: email } });

    if (userByEmail) {
      return res
        .status(409)
        .json({ message: "Usuário já existe com este email" });
    }

    const userByCpf = await userModel.findOne({ where: { cpf: cpf } });
    if (userByCpf) {
      return res
        .status(409)
        .json({ message: "Usuário já existe com este CPF" });
    }

    next();
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

async function middlewareGetUserById(req, res, next) {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "id invalido" });
  }

  try {
    const user = await userModel.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
}

async function middlewareUpdadeUser(req, res, next) {
  try {
    const { first_name, surname, cpf, email, phone, password } = req.body;

    const user = await userModel.findByPk(req.params.id);

    if (first_name !== undefined) user.first_name = first_name;
    if (surname !== undefined) user.surname = surname;
    if (cpf !== undefined) user.cpf = cpf;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (password !== undefined) user.password = password;

    await user.validate();

    if (email !== undefined) {
      const userByEmail = await userModel.findOne({
        where: { email: email, id: { [Op.ne]: req.params.id } },
      });
      if (userByEmail) {
        return res
          .status(409)
          .json({ message: "Outro usuário já existe com este email" });
      }
    }

    if (cpf !== undefined) {
      const userByCpf = await userModel.findOne({
        where: { cpf: cpf, id: { [Op.ne]: req.params.id } },
      });
      if (userByCpf) {
        return res
          .status(409)
          .json({ message: "Outro usuário já existe com este CPF" });
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

    return res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
}

module.exports = {
  middlewareCreateUser,
  middlewareGetUserById,
  middlewareUpdadeUser,
};
