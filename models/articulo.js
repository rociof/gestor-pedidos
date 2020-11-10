const { Sequelize, DataTypes, Model } = require("sequelize");


class Articulo extends Model {
static init(sequelize) {
super.init(
  {
    // Model attributes are defined here
    Id_articulo: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey:true
    },
    Familia: {
      type: DataTypes.ENUM('A', 'B','C'),
      allowNull: false
      // allowNull defaults to true
    },
    Descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Stock: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Precio_venta: {
      type: DataTypes.DOUBLE
    },
    Precio_compra: {
      type: DataTypes.DOUBLE
    },
    Imagen_articulo: {
      type: DataTypes.STRING(150)
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Articulo",// We need to choose the model name
    tableName:"Articulo",
    timestamps:false,
  }
);
}
// the defined model is the class itself
}
//console.log(Articulos === sequelize.models.Articulos); // true

module.exports = Articulo;
