const { Sequelize, DataTypes, Model } = require("sequelize");
/**
 * Define la estructura y tipo de datos de la clase DetPedClie
 */

const sequelize = require("../database/db");
class DetPedCliente extends Model {}

console.log("P e d i d o  C l i e n t e ");
DetPedCliente.init(
  {
    // class DetPedClie extends Model {
    //   static init(sequelize) {
    //     super.init(//hace referencia a la clase de la que hereda (model)
    //       {
    //         // Model attributes are defined here

    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    Precio: {
      type: DataTypes.DOUBLE(10, 2),
      allownull: false,
      defaultValue: 0,
    },

    //La clave primaria se compone de Id_Pedido_cli + Id_articulo
    //Precio_venta sería clave foránea
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "DetPedCliente", // We need to choose the model name
    tableName: "DetPedCliente",
    timestamps: false,
  }
);
// }
// the defined model is the class itself
// }
//console.log(Personas === sequelize.models.Personas); // true

module.exports = DetPedCliente;
