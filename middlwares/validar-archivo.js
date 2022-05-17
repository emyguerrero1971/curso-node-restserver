const { response } = require("express");


const validarSubirArchivo = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No ha seleccionado ningún archivo'
        });
    }

    next();
}


module.exports = {
    validarSubirArchivo
}