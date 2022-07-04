const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, postMedico, putMedico, deleteMedico } = require('../controllers/medicos');

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

    ], 
    putMedico
);

// * Ruta para eliminar un médico
router.delete( '/:id', validarJWT, deleteMedico );


module.exports = router;