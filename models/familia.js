const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class Personas extends Model {}

Personas.init({
    // Model attributes are defined here
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellido: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    DNI: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Localidad: {
        type: DataTypes.STRING,
        allowNull: false
    }
   
    

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

module.exports = Personas;