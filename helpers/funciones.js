const { Usuario, Categoria, Producto } = require("../models");

const buscarIdPorNombre = async (coleccion = '', termino = '') => {
    let result = '';

    switch (coleccion) {
        case 'categorias':
            result = await Categoria.findOne({ nombre: termino, estado: true });
        
            break;
        case 'productos':
            result =  await Producto.findOne({ nombre: termino, estado: true });

            break;
        case 'usuarios':
            result =  await Usuario.findOne({ nombre: termino, estado: true });
    }

    if( result)
        return result._id;
    else
        return result;
}

module.exports = {
    buscarIdPorNombre
}