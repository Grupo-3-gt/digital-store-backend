const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
  const { first_name, surname, cpf, email, phone, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = await userModel.create({
    first_name: first_name,
    surname: surname,
    cpf: cpf,
    email: email,
    phone: phone,
    password: passwordHash,
  });

  res.status(201).send({
    message: `Usuário ${newUser.full_name}, id ${newUser.id} criado com sucesso! ID: ${newUser.id}`,
  });
};

const findUserById = async (req, res) => {
  const user = await userModel.findOne({
    where: { id: Number(Number(req.params.id)) },
  });

  res.status(200).send(user);
};

const userList = async (req, res) => {
  try {
    const users = await userModel.findAll({
      order: [["id", "ASC"]],
    });
  } catch (error) {
    res.send({
      message: "Erro ao listar usuários!",
    });
  }
};

const userUpdate = async (req, res) => {
  await userModel.update({ ...req.body }, { where: { id: req.params.id } });
  res.status(201).send({
    message: `Usuário alterado com sucesso! ID: ${req.params.id}`,
  });
};

const deleteUserById = async (req, res) => {
  await userModel.destroy({
    where: { id: req.params.id },
  });
  res.status(201).send({
    message: `Usuário com ID: ${req.params.id} deletado com sucesso!`,
  });
};

module.exports = {
  createNewUser,
  userList,
  userUpdate,
  deleteUserById,
  findUserById,
};
