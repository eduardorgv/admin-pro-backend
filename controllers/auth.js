const { response } = require('express');
const  bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { genererJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMeenuFrontEnd } = require('../helpers/menu-frontend');


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
            token,
            menu: getMeenuFrontEnd(usuarioDB.role)
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const googleSingIn = async(req, res = response) => {
    try {
        const { email, name, picture } = await googleVerify(req.body.token);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // * Guardar usuario
        await usuario.save();

        // * Generar el token - JWT
        const token = await genererJWT(usuario.id);

        res.json({
            ok: true,
            email, 
            name, 
            picture,
            token,
            menu: getMeenuFrontEnd(usuario.role)
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });
    }
}

const rewewToken = async(req, res = response) => {
    const uid = req.uid;

    // * Generar el token - JWT
    const token = await genererJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMeenuFrontEnd(usuario.role)
    });
}

module.exports = {
    login,
    googleSingIn,
    rewewToken
}