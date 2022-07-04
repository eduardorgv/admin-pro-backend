const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { subirArchivo, retornarImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(fileUpload());

// * Ruta para obtener todo
router.put('/:tipo/:id', validarJWT, subirArchivo);
// * Ruta para obtener foto
router.get('/:tipo/:foto', retornarImagen);


module.exports = router;