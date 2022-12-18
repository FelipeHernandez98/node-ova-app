const { request, response } = require('express');
const pool = require('../database/config');


const calificacionesList = async(req = request, res=response ) => {
    const calificaciones = await pool.query('SELECT * FROM calificaciones');

    res.json({
        calificaciones
    })
}

const calificacionSpecifica = async( req = request, res = response) => {
    const { id_usuario, id_tema } = req.params;
    let calificaciones = await pool.query('SELECT * FROM calificaciones WHERE id_usuario = ? AND id_tema= ?', [id_usuario, id_tema]); 
    calificaciones = calificaciones[0];

    res.json({
        calificaciones
    })
}

const calificacionRegistrar = async( req = request, res=response ) =>{

    const {
        id_usuario,
        id_tema,
        calificacion
    } = req.body;

    const newCalificacion = {
        id_usuario,
        id_tema,
        calificacion
    }

    try {

        await pool.query('INSERT INTO calificaciones SET ?', [newCalificacion]);

        res.json({
            msg: 'calificacion agregada correctamente'
        })

    } catch (err) {
        console.log(err)
    }
}


module.exports ={
    calificacionesList,
    calificacionSpecifica,
    calificacionRegistrar
}