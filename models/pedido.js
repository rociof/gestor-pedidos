const { Sequelize, DataTypes, Model } = require("sequelize");

class Pedido extends Model {
  static init(sequelize) {
    super.init(//hace referencia a la clase de la que hereda (model)
      {
        // Model attributes are defined here
        Id_Pedido: {
          type: DataTypes.INTEGER,
          allowNull: false, 
          primaryKey: true,
          autoincrement: true
        
        },
        Fecha: {
          type: DataTypes.DATE,
          allowNull: false
          
          // allowNull defaults to true
        },
        Imagen_familia: {
          type: DataTypes.STRING(150)
    
        },
        
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Familia", // We need to choose the model name
      }
    );
  }
  // the defined model is the class itself
}
//console.log(Personas === sequelize.models.Personas); // true

module.exports = Familia;
