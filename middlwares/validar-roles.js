const { response } = require("express");

const esRolX = (req, res=response, next) => {

    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Validar token antes de verificar el Rol'
        })
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: `${nombre} no está autorizado para ejecutar este proceso`
        })
    }
    
    next();
}


const rolAutorizado = (... roles) => {

    return (req, res=response, next) => {
        if(!req.usuario) {
            return res.status(500).json({
                msg: 'Validar token antes de verificar el Rol'
            })
        }

        if(!roles.includes(req.usuario.rol)) {
            return res.status(500).json({
                msg: `El servicio requiere uno de estos roles [${roles}]`
            })
        }

        next();
    }

}


module.exports = {
    esRolX,
    rolAutorizado
}