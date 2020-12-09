const {
  Sequelize,
  DataTypes,
  Model,
  DATE
} = require("sequelize");
/**
 * Define la estructura y tipo de datos de la clase PedidoClie
 */

const sequelize = require("../database/db");
class PedidoClie extends Model {}

console.log("P e d i d o  C l i e n t e ");
PedidoClie.init({
  // class PedidoClie extends Model {
  // static init(sequelize) {
  // super.init(
  //   {
  // Model attributes are defined here
  IdPedidoCli: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  ClienteDNI: {
    type: DataTypes.STRING(9),
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo no puede ser nulo"
      }
    }
  },

  Fecha: {
    type: DATE,
    allowNull: false,
    // allowNull defaults to true
  },
  Direccion_entrega: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  TotalPedido: {
    type: DataTypes.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  //La clave foránea sería DNI(Tabla Cliente)
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: "PedidoClie", // We need to choose the model name
  tableName: "PedidoCliente",
  timestamps: false,
});
// }
// the defined model is the class itself
// }
//console.log(Articulos === sequelize.models.Articulos); // true

module.exports = PedidoClie;