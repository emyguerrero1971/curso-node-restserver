const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, '']
    },
    correo: {
        type: String,
        required: [true, '']
    },
    pais: {
        type: String,
        required: [false, 'Seleccione su pais de origen']
    },
    celular: {
        type: String,
        required: [false, 'Número de celular es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true
    },
    // rol: {
    //     type: String,
    //     required: true,
    //     enum: ['ADMIN_ROL', 'USER_ROL', 'CAND_ROL', 'AUDIO_ROL', 'VIDEO_ROL', 'WINNER_ROL']
    // },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);