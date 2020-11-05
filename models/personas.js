const { Sequelize, DataTypes, Model } = require("sequelize");
//const sequelize = new Sequelize('sqlite::memory');

class Personas extends Model {
  static init(sequelize) {
    Personas.init(
      {
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
          allowNull: false,
          primaryKey
        },
        Direccion: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Localidad: {
          type: DataTypes.STRING,
          allowNull: false
        },
        CP: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Provincia: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Telefono: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Email: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Personas" // We need to choose the model name
      }
    );
  }
  // the defined model is the class itself
}
console.log(Personas === sequelize.models.Personas); // true

module.exports = Personas;
