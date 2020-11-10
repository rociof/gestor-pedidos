const { Sequelize, DataTypes, Model, DATE } = require("sequelize");


class PedidoClie extends Model {
static init(sequelize) {
super.init(
  {
    // Model attributes are defined here
    Id_pedido_cli: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey:true
      
    },
    Fecha: {
      type:DATE,
      allowNull: false
      // allowNull defaults to true
    },
    Direccion_entrega: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
     //La clave foránea sería DNI(Tabla Cliente)
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "PedidoClie", // We need to choose the model name
    tableName: "PedidoC",
    timestamps:false,
  }
);
}
// the defined model is the class itself
}
//console.log(Articulos === sequelize.models.Articulos); // true

module.exports = PedidoClie;
