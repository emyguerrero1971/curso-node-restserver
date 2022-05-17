const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;
const { buscarIdPorNombre } = require("../helpers/funciones");

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'prodcat',
    'roles',
    'usuarios'
];

const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //True
    
    if( esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const categorias = await Categoria.find({ nombre: regex, estado: true });

    // Para contar los registros que cumplen la condicion
    
    const cuantos = await Categoria.count({ nombre: regex, estado: true });

    res.json({
        cuantos,
        results: categorias
    });
}

const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //True
    
    if( esMongoID) {
        const producto = await Producto.findById(termino)
                            .populate('categoria', {_id:0, nombre:1})
                            .populate('usuario', {_id:0, nombre:1});

                            // .populate('categoria', 'nombre')
                            // .populate('usuario', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria', {_id:0, nombre:1})
                            .populate('usuario', {_id:0, nombre:1});

                            // .populate('categoria', 'nombre')
                            // .populate('usuario', 'nombre');

    // Para contar los registros que cumplen la condicion
    
    const cuantos = await Producto.count({ nombre: regex, estado: true });

    res.json({
        cuantos,
        results: productos
    });
}

const buscarProdCat = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //True

    if( esMongoID) {
        const producto = await Producto.find({categoria: ObjectId(termino), estado: true });

        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const idCat = await buscarIdPorNombre('categorias', regex);

    if( idCat) {
        const productos = await Producto.find({categoria: ObjectId(idCat), estado: true });

        res.json({
            results: ( productos ) ? [ productos ] : []
        });
    }
    else {
        res.json({
            msg: 'No existen coincidencias para esta categoria'
        })
    }
}

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //True
    
    if( esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true}]
    });

    // Para contar los registros que cumplen la condicion
    
    const cuantos = await Usuario.count({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true}]
    });

    res.json({
        cuantos,
        results: usuarios
    });
}

const buscar = (req, res=response) => {
    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
        
            break;
        case 'productos':
            buscarProductos(termino, res);

            break;
        case 'prodcat':
            buscarProdCat(termino, res);

            break;
        case 'usuarios':
            buscarUsuarios(termino, res);

            break;
        default:
            res.status(500).json({
                msg: 'Se implementará próximamente'
            })
    }
}

module.exports = {
    buscar
}