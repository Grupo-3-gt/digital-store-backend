const addressModel = require("../models/addressModel");
const userModel = require("../models/userModel");

const createNewAddress = async (req, res) => {
  const { street, number, neighborhood, city, cep, complement } = req.body;
  const userId = parseInt(req.params.id);

  if (!street || !number || !neighborhood || !city || !cep) {
    return res.status(400).send({
      message:
        "Campos obrigatórios faltando: street, number, neighborhood, city, cep",
    });
  }

  try {
    const newAddress = await addressModel.create({
      user_id: userId,
      street: street,
      number: number,
      neighborhood: neighborhood,
      city: city,
      cep: cep,
      complement: complement || null,
    });

    return res.status(201).send({
      message: `Endereço criado com sucesso! ID: ${newAddress.id}`,
      address: newAddress,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).send({
        message: "Erro de validação dos dados",
        errors: error.errors.map((err) => err.message),
      });
    }

    return res.status(500).send({
      message: "Erro ao criar o endereço. Tente novamente mais tarde.",
    });
  }
};

const addressList = async (req, res) => {
  try {
    const addresses = await addressModel.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).send(addresses);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao listar endereços!",
    });
  }
};

const findAddressById = async (req, res) => {
  const address = await addressModel.findOne({
    where: { id: Number(req.params.id) },
  });

  if (!address) {
    return res.status(404).send({
      message: `Endereço com ID: ${req.params.id} não encontrado!`,
    });
  }

  res.status(200).send(address);
};

const addressUpdate = async (req, res) => {
  const { id } = req.params;
  const { street, number, neighborhood, city, cep, complement } = req.body;

  const updated = await addressModel.update(
    { street, number, neighborhood, city, cep, complement },
    { where: { id } }
  );

  if (updated[0] === 0) {
    return res.status(404).send({
      message: `Endereço com ID: ${id} não encontrado ou não alterado!`,
    });
  }

  res.status(200).send({
    message: `Endereço alterado com sucesso! ID: ${id}`,
  });
};

const deleteAddressById = async (req, res) => {
  const { id } = req.params;

  const deleted = await addressModel.destroy({
    where: { id },
  });

  if (deleted === 0) {
    return res.status(404).send({
      message: `Endereço com ID: ${id} não encontrado!`,
    });
  }

  res.status(200).send({
    message: `Endereço com ID: ${id} deletado com sucesso!`,
  });
};

module.exports = {
  createNewAddress,
  addressList,
  findAddressById,
  addressUpdate,
  deleteAddressById,
};
