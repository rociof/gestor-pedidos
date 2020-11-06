const { Sequelize, DataTypes, Model } = require("sequelize");

class Empleados extends Model {
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
        Password: {
            type: DataTypes.STRING(42),
            allowNull: false
          },
        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
        Tipo: {
            type: DataTypes.ENUM('usuario_basico', 'gestor', 'administrador'),
            allowNull: false
          },

      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Empleados", // We need to choose the model name
      }
    );
  }
  // the defined model is the class itself
}
//console.log(Personas === sequelize.models.Personas); // true

module.exports = Empleados;
