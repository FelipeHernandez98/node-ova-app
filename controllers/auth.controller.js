const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const pool = require('../database/config');

const login = async(req, res = response)=>{

    const {email, password } = req.body;

    try{
        
        let usuario = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        usuario = usuario[0];

        if(!usuario){
            return res.status(404).json({
                msg: 'Usuario o contraseña invalidos'
            })
        }

        const contraseñaValida = bcryptjs.compareSync( password, usuario.password);
        
        if(!contraseñaValida){
            return res.status(404).json({
                msg: 'Usuario o contraseña invalidos'
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

module.exports ={
    login
}