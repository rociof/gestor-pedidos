const { Sequelize, DataTypes, Model } = require("sequelize");

class Persona extends Model {
  static init(sequelize) {
    super.init(//hace referencia a la clase de la que hereda (model)
      {
        // Model attributes are defined here
        Nombre: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        Apellido: {
          type: DataTypes.STRING(100),
          allowNull: false
          // allowNull defaults to true
        },
        DNI: {
          type: DataTypes.STRING(9),
          allowNull: false,
          primaryKey: true
        },
        Direccion: {
          type: DataTypes.STRING(150),
          allowNull: false
        },
        Localidad: {
          type: DataTypes.STRING(60),
          allowNull: false
        },
        CP: {
          type: DataTypes.STRING(6),
          allowNull: false
        },
        Provincia: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        Telefono: {
          type: DataTypes.STRING(15),
          allowNull: false
        },
        Email: {
          type: DataTypes.STRING(60),
          allowNull: false
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Persona", // We need to choose the model name
        tableName:" Persona",
        timestamps:false,
      }
    );
  }
  
}
//console.log(Personas === sequelize.models.Personas); // true

module.exports = Persona;
