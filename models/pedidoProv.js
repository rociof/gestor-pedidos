const { Sequelize, DataTypes, Model } = require("sequelize");
/**
 * Define la estructura y tipo de datos de la clase PedidoProv
 */



const sequelize = require("../database/db");
class PedidoProv extends Model {}

console.log("P e d i d o   P r o v e e d o r");
PedidoProv.init(
  {

    IdPedidoProv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
  
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
      // allowNull defaults to true
    },
    //La clave foránea sería DNI(tabla proveedor)
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "PedidoProv", // We need to choose the model name
    tableName:"DetPedidoProveedor",
    timestamps:false,
  }
);
// }
// the defined model is the class itself
// }
//console.log(Articulos === sequelize.models.Articulos); // true
module.exports = PedidoProv;
