const { Router } = require('express');
const { check } = require('express-validator');
const { calificacionSpecifica, calificacionesList, calificacionRegistrar } = require('../controllers/calificaciones.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT
], calificacionesList )

router.get('/:id_usuario/:id_tema', [
    validarJWT
], calificacionSpecifica)

router.post('/', [
    validarJWT,
    check('id_usuario', 'El id del usuario es obligatorio').not().isEmpty(),
    check('id_tema', 'El id del tema es obligatorio').not().isEmpty(),
    check('calificacion', 'La calificacion es obligatoria').not().isEmpty(),
    validarCampos
], calificacionRegistrar)

module.exports = router;