const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlwares');

const {
    crearRol,
    obtenerRoles,
    // obtenerRol,
    // actualizarRol,
    // borrarRol
} = require('../controllers');

const router = Router();

/**
 * {{url}}/api/roles
 */

// Obtener todos los Roles - privado - cualquier usuario con token valido
router.get('/', obtenerRoles );

// Crear rol - privado - cualquier usuario con token valido
router.post('/', [
    // validarJWT,
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], crearRol );


module.exports = router;