const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos,
    validarJWT,
    rolAutorizado
} = require('../middlwares');

const { 
    existeCategoriaPorId
} = require('../helpers/db-validators');

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

// Obtener una categoria de acuerdo al id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier usuario con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// Actualizar categoria - privado - cualquier usuario con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    rolAutorizado('SUPER_ROL', 'ADMIN_ROL'),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria );

// Borrar categoria - privado - rol Admin o grupo de Roles
router.delete('/:id', [
    validarJWT,
    rolAutorizado('SUPER_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria );


module.exports = router;