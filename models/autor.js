const { Model, DataTypes } = require("sequelize");
//const Mensaje = require("./mensaje");

class Autor extends Model {

    static init(connection) {
        super.init({
            nombre: {type: DataTypes.STRING, allowNull: false},
            email: {type: DataTypes.STRING, allowNull: false, unique: true},
            password: {type: DataTypes.STRING, allowNull: false},
        }, {
            sequelize: connection,
            modelName: "Autor",
            tableName: "Autores"
        });       
    }
}




module.exports = Autor;