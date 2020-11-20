const { Sequelize, DataTypes, Model } = require("sequelize");
/**
 * Define la estructura y tipo de datos de la clase DetPedProv
 */
class DetPedProv extends Model {
  static init(sequelize) {
    super.init(//hace referencia a la clase de la que hereda (model)
      {
        // Model attributes are defined here
        Cantidad: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        
        //La clave primaria se compone de Id_Pedido_prov + Id_articulo
        //Precio_compra sería clave foránea
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "DetPedProv", // We need to choose the model name
        tableName: "DetPedP",
        timestamps:false,
      }
    );
  }
  // the defined model is the class itself
}
//console.log(Personas === sequelize.models.Personas); // true

module.exports = DetPedProv;
