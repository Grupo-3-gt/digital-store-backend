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
    message: `Usuário ${newUser.first_name}, id ${newUser.id} criado com sucesso! ID: ${newUser.id}`,
  });
};

const findUserById = async (req, res) => {
  const user = await userModel.findOne({
    where: { id: Number(Number(req.params.id)) },
    attributes: { exclude: ["password"] },
  });

  res.status(200).send(user);
};

const userUpdate = async (req, res) => {
  if (req.user.id != req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ message: "Permissão insuficiente" });
  }

  await userModel.update({ ...req.body }, { where: { id: req.params.id } });
  
  res.status(204).send();
};

const deleteUserById = async (req, res) => {
  if (req.user.id != req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ message: "Permissão insuficiente" });
  }

  await userModel.destroy({
    where: { id: req.params.id },
  });

  res.status(204).send()
};

module.exports = {
  createNewUser,
  userUpdate,
  deleteUserById,
  findUserById,
};
