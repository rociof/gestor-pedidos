const { Sequelize } = require('sequelize');
const { db } = require('../config');


const sequelize = new Sequelize(
    db.database,
    db.username,
    db.password, {
        host: db.host,
        dialect: db.dialect
    }
);

// test DB 
sequelize.authenticate()
    .then(()=> 
    {
     console.log('Databases Conectada 1.......\n');
     sequelize.sync({ force: false });
    }
    )
    .catch(err => console.log('Error:' + err));   

module.exports = sequelize ;