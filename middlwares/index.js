

const validaCampos = require('../middlwares/validar-campos');
const validaJWT = require('../middlwares/validar-jwt');
const validaRoles = require('../middlwares/validar-roles');
const validarArchivo = require('../middlwares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivo
}