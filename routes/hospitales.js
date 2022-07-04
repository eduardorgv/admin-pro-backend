const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, postHospital, putHospital, deleteHospital } = require('../controllers/hospitales');

const router = Router();


// * Ruta para obtener todos los hopitales
router.get( '/', validarJWT, getHospitales );

// * Ruta para insertar un nuevo hospital
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], 
    postHospital
);

// * Ruta para actualizar un hospital
router.put( '/:id', 
    [

    ], 
    putHospital
);

// * Ruta para eliminar un hospital
router.delete( '/:id', validarJWT, deleteHospital );


module.exports = router;