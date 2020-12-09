const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = require("../database/db");

/**
 * Define la estructura y tipo de datos de la clase Cliente
 */

class Cliente extends Model {}
console.log("C L I E N T E S");

Cliente.init(
  {
    // Model attributes are defined here
    DNI: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        // len: {
        //   args: [9],
        //   msg: "El DNI debe incluír 9 caracteres",
        // }
      },
    },

    Nombre: {
      type: DataTypes.STRING(50),
      // allowNull: false
    },
    Apellido: {
      type: DataTypes.STRING(100),
      // allowNull: false
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
      unique: { args: true, msg: "Error de correo repetido" },
      validate: {
        isEmail: {
          args: true,
          msg: "El campo tiene que ser un correo valido",
        },
      },
    },
    Password: {
      type: DataTypes.STRING(42),
      allowNull: false,
    },
    Activo: {
      // type: DataTypes.TINYINT(1)
      type: DataTypes.BOOLEAN,

      //allowNull: false,
      //default:true
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Cliente", // We need to choose the model name
    tableName: "Cliente",
    timestamps: false,
  }
);


// User.associate = function(models) {
//   // Usuario tiene un domicilio o una direccion
//   User.hasOne(models.pedidoClie, { as: "domicilio", foreignKey: "user_id" });
// };

module.exports = Cliente;
