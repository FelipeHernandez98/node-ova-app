const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next )=>{
    const errors = validationResult(req); // recoge la validación del middleware que esta en la ruta
    if(!errors.isEmpty()){ // negacion -> no hay errores(isEmpty)
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}