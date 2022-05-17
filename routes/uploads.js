const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarSubirArchivo } = require('../middlwares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarSubirArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    validarSubirArchivo,
    check('id', 'No es un ID válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
// ], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);



module.exports = router;