const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../database/config');

const validarJWT = async( req = request, res = response, next) =>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.id = id;

        let usuario = await pool.query('SELECT * FROM usuarios WHERE id = ?', [ id ])
        usuario = usuario[0];

        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no registrado'
            });
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = validarJWT;