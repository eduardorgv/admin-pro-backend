const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, postMedico, putMedico, deleteMedico, getMedicobById } = require('../controllers/medicos');

const router = Router();


// * Ruta para obtener todos los médicos
router.get( '/', validarJWT, getMedicos );

// * Ruta para insertar un nuevo médico
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico debe ser necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validarCampos
    ], 
    postMedico
);

// * Ruta para actualizar un médico
router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validarCampos
    ], 
    putMedico
);

// * Ruta para eliminar un médico
router.delete( '/:id', validarJWT, deleteMedico );

// * Ruta para obtener médico por ID
router.get( '/:id', validarJWT, getMedicobById );


module.exports = router;