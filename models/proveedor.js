const { Sequelize, DataTypes, Model } = require("sequelize");
/**
 * Define la estructura y tipo de datos de la clase Proveedor
 */

const sequelize = require("../database/db");
class Proveedor extends Model {}

console.log("P R O V E E D O R ");
Proveedor.init(
  {
    /**
     * hace referencia a la clase de la que hereda (model)
     * @param {*} sequelize
     */

    // Model attributes are defined here
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    DNI: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
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
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(60),
      unique: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Proveedor", // We need to choose the model name,
    tableName: "Proveedor",
    timestamps: false,
  }
);
//   }
//   // the defined model is the class itself
// }
// //console.log(Personas === sequelize.models.Personas); // true

module.exports = Proveedor;
