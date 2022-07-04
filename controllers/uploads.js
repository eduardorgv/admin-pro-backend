const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const subirArchivo = (req, res = response) => {
    const tipo =  req.params.tipo;
    const id = req.params.id;
    const tiposPermitidos = ['hospitales','medicos','usuarios'];

    // * Se valida que el parámetro "tipo" de la ruta, esté bien.
    if(!tiposPermitidos.includes(tipo)) {
        return res.json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }

    // * Se valida que exista un archivo.
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // * Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // * Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if(!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El archivo no tiene una extensión válida'
        });
    }

    // * Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // * Path para guardar la imagen
    const path = (__dirname, './' + `/uploads/${tipo}/${nombreArchivo}`);

    // * Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
                err
            });
        }

        actualizarImagen(tipo, id, nombreArchivo);

        // * Actualizar base de datos
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const retornarImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname, '../' + `/uploads/${tipo}/${foto}`);

    // * Imagen por defecto
    if(fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }else {
        const pathImg = path.join(__dirname, '../' + `/uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    subirArchivo,
    retornarImagen
}