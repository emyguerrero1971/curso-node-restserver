
const dbValidators = require('./db-validators');
const buscarIdPorNombre = require('./funciones');
const generarJWT = require('./generar-jwt');
// const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...buscarIdPorNombre,
    ...generarJWT,
    // ...googleVerify,
    ...subirArchivo
}