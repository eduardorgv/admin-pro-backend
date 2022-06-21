const { response } = require('express');
const  bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { genererJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });

        // * Varificar email
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            });
        }

        // * Varificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // * Generar JWT
        const token = await genererJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    login
}