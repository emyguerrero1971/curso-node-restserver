const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    celular: {
        type: String,
        required: [true, 'Número de celular obligatorio']
    },
    rol: {
        type: String,
        required: true
    },
    coordenadas: [{}],
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);