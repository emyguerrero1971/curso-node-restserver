const auth = require('./auth');
const buscar = require('./buscar');
const categorias = require('./categorias');
const productos = require('./productos');
const roles = require('./roles');
const usuarios = require('./usuarios');
const uploads = require('./uploads');

module.exports = {
    ...auth,
    ...buscar,
    ...categorias,
    ...productos,
    ...roles,
    ...usuarios,
    ...uploads
}