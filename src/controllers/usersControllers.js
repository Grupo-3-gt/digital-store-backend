const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    const { nome, cpf, email, telefone, senha } = req.body;

    const saltRounds = 10
    const senhaHast = await bcrypt.hash(senha, saltRounds)

    const newUser = await userModel.create({
        full_name: nome,
        cpf: cpf,
        email: email,
        phone: telefone,
        password:senha
    });

    res.status(201).send({
        message: `Usuário ${newUser.full_name},`
    })
    
    console.log("Usuário criado com sucesso!:", newUser.id)
    
    res.status(201).send({
        message: `Usuário ${newUser.full_name}, id ${ newUser.id} criado com sucesso! ID: ${newUser.id}`
    })



}

const userList = async (req, res, next) => {
    try{
     const users = await userModel.findAll();
     res.send(users)
    
    }catch (error){
        res.send({
            message: 'Erro ao listar usuários!'
        })
    
    }
}

const userUpdate = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await userModel.update(
            { ...req.body },
            { where: {id: id}}
        );
        res.status(201).send({
            message: `Usuário alterado com sucesso! ID: ${id}`
        })
        
    } catch (error) {
        res.send({
            message: `Erro ao alterar os usuários!`
        })
    }
};

const deleteUserById = async (req, res) => {

}

module.exports = {
    createNewUser,
    userList,
    userUpdate,
    deleteUserById
}