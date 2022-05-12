

const validaCampos = require('../middlwares/validar-campos');
const validaJWT = require('../middlwares/validar-jwt');
const validaRoles = require('../middlwares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}