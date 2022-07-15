const { Router } = require('express');
const { getUsuarios, crearUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole, validarAdminRole_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();


// * Ruta para obtener todos los usuarios
router.get( '/', validarJWT, getUsuarios );

// * Ruta para insertar un nuevo usuario
router.post( '/', 
    [
        check('nombre', 'El nombre el obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    crearUsuario
);

// * Ruta para actualizar un usuario
router.put( '/:id', 
    [
        validarJWT,
        validarAdminRole_o_MismoUsuario,
        check('nombre', 'El nombre el obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    updateUsuario
);

// * Ruta para eliminar un usuario
router.delete( '/:id', [validarJWT, validarAdminRole], deleteUsuario );


module.exports = router;