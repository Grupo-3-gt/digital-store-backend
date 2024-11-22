const usersModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/dotenvConfig');
const bcrypt = require('bcrypt');

const loginAuth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({
            where: { email }
        })

        const userPassword = user ? user.password : ''
        const hashValid = await bcrypt.compare(password, userPassword)

        if ( hashValid ) {
            const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '3h' })
            res.send({
                token: token,
            })
        } else {
            res.status(401).send({
                message: 'Usuário ou senha inválidos!'
            })
        }
    } catch (error) {
        res.send({
            message: `Algo deu errado! Erro: ${error}`
        })
    }
}


module.exports = {
    loginAuth
}