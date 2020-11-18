const { Sequelize, DataTypes, Model } = require("sequelize");

class Empleado extends Model {
  static init(sequelize) {
    super.init(//hace referencia a la clase de la que hereda (model)
      {
        // Model attributes are defined here
        Nombre: {
          type: DataTypes.STRING(50),
          //allowNull: false
        },
        Apellido: {
          type: DataTypes.STRING(100),
          //allowNull: false
          // allowNull defaults to true
        },
        DNI: {
          type: DataTypes.STRING(9),
          allowNull: false,
          primaryKey: true
        },
        Direccion: {
          type: DataTypes.STRING(150),
          // allowNull: false
        },
        Localidad: {
          type: DataTypes.STRING(60),
          // allowNull: false
        },
        CP: {
          type: DataTypes.STRING(6),
          // allowNull: false
        },
        Provincia: {
          type: DataTypes.STRING(30),
          // allowNull: false
        },
        Telefono: {
          type: DataTypes.STRING(15),
          // allowNull: false
        },
        Email: {
          type: DataTypes.STRING(60),
          // allowNull: false
        },
        Password: {
            type: DataTypes.STRING(42),
            // allowNull: false
          },
        Activo: {
            type: DataTypes.TINYINT(1),
            allowNull: false
          },
        Tipo: {
            type: DataTypes.ENUM('Usuario_basico', 'Gestor', 'Administrador'),
            defaultValue: 'Usuario_basico'
          
          },

      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Empleado",// We need to choose the model name
        tableName: "Empleado",
        timestamps:false,
      }
    );
  }
  // the defined model is the class itself
}
//console.log(Personas === sequelize.models.Personas); // true

module.exports = Empleado;
