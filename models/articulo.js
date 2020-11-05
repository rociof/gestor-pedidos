const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class Articulos extends Model {}

Articulos.init({
    // Model attributes are defined here
    Id_articulos: {
        type: DataTypes.STRING(4),
        allowNull: false, primaryKey
    },
    Familia: {
        type: DataTypes.STRING(2),
        allowNull: false
        // allowNull defaults to true
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Precio_venta: {
        type: DataTypes.INTEGER,
        
    },
    Precio_compra: {
        type: DataTypes.INTEGER,
        
    }, 
    Imagen_articulo: {
        type: DataTypes.STRING,
       
    }
    

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Articulos' // We need to choose the model name
});

// the defined model is the class itself
console.log(Articulos === sequelize.models.Articulos); // true

module.exports = Articulos;