const { Sequelize, DataTypes, Model } = require("sequelize");
/**
 * Define la estructura y tipo de datos de la clase Empleado
 */
class Empleado extends Model {
  static init(sequelize) {
    super.init(
      //hace referencia a la clase de la que hereda (model)
      {
        // Model attributes are defined here
        DNI: {
          type: DataTypes.STRING(9),
          allowNull: false,
          primaryKey: true,
        },
        Nombre: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        Apellido: {
          type: DataTypes.STRING(100),
          allowNull: false          
        },
        Direccion: {
          type: DataTypes.STRING(150),
          allowNull: true
        },
        Localidad: {
          type: DataTypes.STRING(60),
          allowNull: true
        },
        CP: {
          type: DataTypes.STRING(6),
           allowNull: true
        },
        Provincia: {
          type: DataTypes.STRING(30),
           allowNull: true
        },
        Telefono: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        Email: {
          type: DataTypes.STRING(60),
          allowNull: false
        },
        Password: {
          type: DataTypes.STRING(42),
          allowNull: false,
        },
        Activo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        Tipo: {
          type: DataTypes.ENUM("Usuario_basico", "Gestor", "Administrador"),
          defaultValue: "Usuario_basico",
         },
         Foto: {
           type: DataTypes.STRING(150),
           allowNull: true,

        }
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Empleado", // We need to choose the model name
        tableName: "Empleado",
        timestamps: false,
      }
    );
  }
  // the defined model is the class itself
}
//console.log(Personas === sequelize.models.Personas); // true

module.exports = Empleado;
