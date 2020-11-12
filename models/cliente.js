const { Sequelize, DataTypes, Model } = require("sequelize");

class Cliente extends Model {
  static init(sequelize) {
    super.init(//hace referencia a la clase de la que hereda (model)
      {
        // Model attributes are defined here
        DNI: {
          type: DataTypes.STRING(9),
          allowNull: false,
          primaryKey: true
        },

        Nombre: {
          type: DataTypes.STRING(50),
          //allowNull: false
        },
        Apellido: {
          type: DataTypes.STRING(100),
          //allowNull: false
        
        },
        Direccion: {
          type: DataTypes.STRING(150),
          //allowNull: false
        },
        Localidad: {
          type: DataTypes.STRING(60),
          //allowNull: false
        },
        CP: {
          type: DataTypes.STRING(6),
          //allowNull: false
        },
        Provincia: {
          type: DataTypes.STRING(30),
          //allowNull: false
        },
        Telefono: {
          type: DataTypes.STRING(15),
          //allowNull: false
        },
        Email: {
          type: DataTypes.STRING(60),
          //allowNull: false
        },
        Password: {
            type: DataTypes.STRING(42),
             //allowNull: false
          },
        Activo: {
            type: DataTypes.BOOLEAN,
            //allowNull: false,
            default:true
          },

      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Cliente", // We need to choose the model name
        tableName: "Cliente",
        timestamps:false,
      }
    );
  }
  // the defined model is the class itself
}
//console.log(Personas === sequelize.models.Personas); // true

module.exports = Cliente;
