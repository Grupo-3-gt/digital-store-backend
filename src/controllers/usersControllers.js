const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
  const { nome, cpf, email, telefone, senha } = req.body;

  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(senha, saltRounds);

  const newUser = await userModel.create({
    full_name: nome,
    cpf: cpf,
    email: email,
    phone: telefone,
    password: senhaHash,
  });

  console.log("Usuário criado com sucesso!:", newUser.id);

  res.status(201).send({
    message: `Usuário ${newUser.full_name}, id ${newUser.id} criado com sucesso! ID: ${newUser.id}`,
  });
};

const userList = async (req, res) => {
  try {
    const users = await userModel.findAll({
      order: [["id", "ASC"]], //foi adicionado.
    });
    res.send(users);
  } catch (error) {
    res.send({
      message: "Erro ao listar usuários!",
    });
  }
};

const userUpdate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await userModel.update({ ...req.body }, { where: { id: id } });
    res.status(201).send({
      message: `Usuário alterado com sucesso! ID: ${id}`,
    });
  } catch (error) {
    res.send({
      message: `Erro ao alterar o usuário!`,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await userModel.destroy({ 
        where: { id: id } 
    });
    res.status(201).send({ 
        message: `Usuário com ID: ${id} deletado com sucesso!` 
    });
  } catch (error) {
    res.send({ 
        message: `Erro ao deletar o usuário!` 
    });
  }
};

module.exports = {
  createNewUser,
  userList,
  userUpdate,
  deleteUserById,
};
