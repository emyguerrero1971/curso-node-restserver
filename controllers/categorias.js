const { response } = require("express");
const { Categoria } = require("../models");
 
const obtenerCategorias = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', {_id:0, nombre:1})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async (req, res = response) => {
    const {id} = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario', {nombre:1});

        // .populate('usuario', {_id:0,  nombre:1});   Excluye el campo id

    res.json({
        categoria
    });
}

const crearCategoria = async(req, res=response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res = response) => {
    const {id} = req.params; 
    const {estado, usuario, ...data} = req.body;

    const nombreMayus = data.nombre.toUpperCase();
    data.nombre = nombreMayus;
    data.usuario = req.usuario._id;

    const categoriaDB = await Categoria.findOne({nombreMayus});
    console.log(categoriaDB);
    if(categoriaDB.nombre === nombreMayus) {
        return res.status(400).json({
            msg: `Ya existe una Categoría con ese nombre`
        });
    }
    
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});  // New hace que se muestre en la respuesta la actualizacion 

    res.json(categoria);
}

const borrarCategoria = async (req, res = response) => {
    const {id} = req.params;

    // Borrado logico
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    
    res.json(categoria);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}