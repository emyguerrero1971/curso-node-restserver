const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

/**
 * Validaciones para usuarios 
 */

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol) {
        throw new Error(`El Rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) {
        throw new Error(`El email ${correo} ya está registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id ${id} no está registrado en la BD`);
    }
}

/**
 * Validaciones para categorias 
 */

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria) {
        throw new Error(`El id ${id} no está registrado en la BD`);
    }
}

/**
 * Validaciones para productos 
 */

 const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto) {
        throw new Error(`El id ${id} no está registrado en la BD`);
    }
}

module.exports = {
    emailExiste,
    esRolValido,
    existeCategoriaPorId,
    existeProductoPorId,
    existeUsuarioPorId
}