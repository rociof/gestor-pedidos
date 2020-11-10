const { Sequelize, DataTypes, Model } = require("sequelize");


class PedidoProv extends Model {
static init(sequelize) {
super.init(
  {
    // Model attributes are defined here
    Id_Pedido_prov: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey:true
  
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
      // allowNull defaults to true
    },
    //La clave foránea sería DNI
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "PedidoProv", // We need to choose the model name
    tableName:"PedidoP"
  }
);
}
// the defined model is the class itself
}
//console.log(Articulos === sequelize.models.Articulos); // true
module.exports = PedidoProv;
