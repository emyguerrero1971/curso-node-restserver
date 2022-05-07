
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlwares/validar-campos');
const { emailExiste, esRolValido, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
    check('correo').custom(emailExiste ), 
    check('correo', 'Correo no válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL', 'CANDI_ROL', 'AUDIO_ROL', 'VIDEO_ROL', 'WINNER_ROL']),
    // check('rol').custom((rol) => (esRolValido(rol) ), //cuando una funcion o callback cuyo primer argumento es el que se recibe se puede simplificar asi como debajo
    check('rol').custom(esRolValido ), 
    validarCampos
], usuariosPost );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido ),
    validarCampos
], usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

module.exports = router;