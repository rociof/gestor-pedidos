const { Sequelize } = require('sequelize');
// const { db } = require('../config_ant');
require('dotenv').config();


const sequelize = new Sequelize(
    // db.database,
    // db.username,
    // db.password, {
    //     host: db.host,
    //     dialect: db.dialect
    // }
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: "mariadb"
    }
);

// test DB 
sequelize.authenticate()
    .then(()=> 
    {
     console.log('Databases Conectada 1.......\n');
     sequelize.sync({ force: false})
    })
    .catch(err => console.log('Error:' + err));   

module.exports = sequelize ;