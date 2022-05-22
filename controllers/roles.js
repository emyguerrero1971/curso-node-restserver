const { response } = require("express");
const { Role } = require("../models");

const obtenerRoles = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, roles] = await Promise.all([
        Role.countDocuments(query),
        Role.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        roles
    });
}

const crearRol = async(req, res=response) => {

    const nombreRol = req.body.rol.toUpperCase();

    const rolDB = await Role.findOne({nombreRol});
    if(rolDB) {
        return res.status(400).json({
            msg: `El rol ${rolDB.nombreRol}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombreRol
    }

    const rol = new Role(data);

    // Guardar DB
    await rol.save();

    res.status(201).json(rol);
}

module.exports = {
    crearRol,
    obtenerRoles
}