const { Sequelize, DataTypes, Model } = require("sequelize");

class Detallepedido extends Model {
  static init(sequelize) {
    super.init(//hace referencia a la clase de la que hereda (model)
      {
        // Model attributes are defined here
        Cantidad: {
          type: DataTypes.INTEGER,
          allowNull: false, 
          primaryKey: true
        },
        
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Detallepedido", // We need to choose the model name
      }
    );
  }
  // the defined model is the class itself
}
//console.log(Personas === sequelize.models.Personas); // true

module.exports = Detallepedido;
