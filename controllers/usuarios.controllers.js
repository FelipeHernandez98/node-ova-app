const { response } = require("express");
const bcryptjs = require('bcryptjs');
const pool = require('../database/config');
const { request } = require("express");

const usuariosList = async (req, res = response) => {
    const usuarios = await pool.query('SELECT * FROM usuarios');

    res.json({
        usuarios
    })
}

const usuarioPorId = async (req = request, res = response) => {
    const { id } = req.params;
    let usuario = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    usuario = usuario[0];

    res.json({
        usuario
    })

}

const usuariosAgregar = async (req, res = response) => {

    let {
        nombre,
        apellido,
        telefono,
        email,
        password
    } = req.body;

    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);

    const usuario_estado = 1;

    const nuevoUsuario = {
        nombre,
        apellido,
        telefono,
        email,
        password
    }

    try {

        await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);

        res.json({
            msg: 'usuario agregado correctamente'
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    usuariosList,
    usuariosAgregar,
    usuarioPorId
}