const { Sequelize, DataTypes, Model } = require("sequelize");

/**
 * Define la estructura y tipo de datos de la clase Articulo
 */
class Articulo extends Model {
  static init(sequelize) {
    super.init(
      {
        IdArticulo: {
          type: DataTypes.STRING(4),
          primaryKey: true,
        },
        Familia: {
          type: DataTypes.ENUM("A", "B", "C"),
          // allowNull: false,
          // allowNull defaults to true
        },
        Descripcion: {
          type: DataTypes.STRING(200),
          // allowNull: false,
        },
        Stock: {
          type: DataTypes.DOUBLE,
          // allowNull: false,
        },
        Activo: {
          type: DataTypes.TINYINT(1),
          // allowNull: false,
        },
        PrecioVenta: {
          type: DataTypes.DOUBLE,
        },
        PrecioCompra: {
          type: DataTypes.DOUBLE,
        },
        ImagenArticulo: {
          type: DataTypes.STRING(150),
          // allowNull: true,
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Articulo", // We need to choose the model name
        tableName: "Articulo",
        timestamps: false,
      }
    );
  }
  // the defined model is the class itself
}

module.exports = Articulo;
