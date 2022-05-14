const { response } = require("express");
const { Producto } = require("../models");
 
const obtenerProductos = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', {_id:0, nombre:1})
            .populate('categoria', {_id:0, nombre:1})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProducto = async (req, res = response) => {
    const {id} = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', {nombre:1})
        .populate('categoria', {_id:0, nombre:1});

        // .populate('usuario', {_id:0,  nombre:1});   Excluye el campo id

    res.json({
        producto
    });
}

const crearProducto = async(req, res=response) => {
    const nombreMayus = req.body.nombre.toUpperCase();
    const {estado, usuario, ...resto} = req.body;

    const productoDB = await Producto.findOne({nombre: nombreMayus});
    
    if(productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...resto,
        nombre: resto.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async (req, res = response) => {
    const {id} = req.params; 
    const {estado, usuario, ...data} = req.body;

    if(data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario = req.usuario._id;
    
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});  // New hace que se muestre en la respuesta la actualizacion 

    res.json(producto);
}

const borrarProducto = async (req, res = response) => {
    const {id} = req.params;

    // Borrado logico
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    
    res.json(producto);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}