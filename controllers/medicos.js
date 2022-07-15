const { response } = require('express');

const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    });
}

const postMedico = async(req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
           medico: medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const putMedico = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);

        // * Validar si existe el médico
        if(!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'Médico Actualizado',
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteMedico = async(req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);

        // * Validar si existe el médico
        if(!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const getMedicobById = async(req, res = response) => {
    const id = req.params.id;
    
    try {
        const medico = await Medico.findById(id).populate('usuario', 'nombre img').populate('hospital', 'nombre');
        res.json({
            ok: true,
            medico
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getMedicos,
    postMedico,
    putMedico,
    deleteMedico,
    getMedicobById
}