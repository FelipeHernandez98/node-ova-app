const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosAgregar, usuariosList } = require('../controllers/usuarios.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT,
], usuariosList);

router.get('/:id', [
    validarJWT,
], usuariosList);

router.post('/', [
    validarJWT,
    check('email', 'El email no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El numero de celular es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener 5 caracteres minimo').isLength({ min: 5 }),
    validarCampos
], usuariosAgregar)

module.exports = router;