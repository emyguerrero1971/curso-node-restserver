const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos,
    validarJWT,
    rolAutorizado
} = require('../middlwares');

const { 
    existeCategoriaPorId,
    existeProductoPorId
} = require('../helpers/db-validators');

const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers');

const router = Router();

/**
 * {{url}}/api/productos
 */

// Obtener todos los productos - publico
router.get('/', obtenerProductos );

// Obtener un producto de acuerdo al id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

// Crear producto - privado - cualquier usuario con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto );

// Actualizar producto - privado - cualquier usuario con token valido
router.put('/:id', [
    validarJWT,
    rolAutorizado('SUPER_ROL', 'ADMIN_ROL'),
    // check('categoria', 'No es un ID válido').isMongoId(), //Esta validacion se debe hacer siempre y cuando se envie la categoria
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto );

// Borrar producto - privado - rol Admin o grupo de Roles
router.delete('/:id', [
    validarJWT,
    rolAutorizado('SUPER_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto );


module.exports = router;