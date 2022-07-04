const { Router } = require('express');
const { getTodo, getDocumentosCollecion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// * Ruta para obtener todo
router.get('/:busqueda', validarJWT, getTodo);

// * Ruta para obtener una colección específica
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosCollecion);

module.exports = router;