/**
 * Establecemos la conexión con la base de datos. Primeramente hay que definir el objeto
connection, que contendrá los datos de acceso a la base de datos que queremos usar. Una vez
definido, llamamos al método authenticate para iniciar la conexión.
El método autenticate devuelve una promesa (Promise), lo que quiere decir que el establecimiento
de la conexión con la base de datos ocurre de forma no bloqueante. El control es devuelto a nuestro
programa de forma inmediata.
Necesitamos realizar algunas operaciones con la base de datos una vez que se establezca la
conexión. A esa promesa que nos devuelve authenticate le podemos indicar algunas instrucciones para
que las ejecute una vez que la conexión se establezca: es por eso que añadimos la llamada then. Y si
ocurriese algún error durante la conexión, incorporamos también una llamada a catch.
Tanto then como catch reciben como único parámetro una función (utilizamos en ambos casos funciones
anónimas en línea). Esas funciones contienen esas instrucciones que queremos lanzar en diferido,
cuando la conexión se establezca o cuando falle.
 */
/**
 * En lugar de poner los datos de la conexión podemos crear VARIABLES DE ENTORNO (para entorno de pruebas,
  *  producción, despliegue...) que definiremos en la ejecución 
  * (En el terminal: DATABASE_URL = //root:maria123@localhost:3306/dbPedidos)
  * La conexión se establece así (process.env es donde se guardan las variables de entorno):
  *  "const connection = new Sequelize(process.env.DATABASE_URL)"
  * Se puede crear un fichero con las variables de entorno que se carguen en cada
  * ejecución (lo añadimos al .gitignore).
    
  Por seguridad es recomendable hacerlo así porque no dejamos expuesta la contraseña de la base de datos.
  También podemos modificar el puerto con una variable "port"
 */


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