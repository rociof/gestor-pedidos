require('dotenv').config(); //variables de entorno específicas para el programa
var createError = require("http-errors");
var express = require("express");
const path = require("path");
const { Sequelize } = require("sequelize");

// Database
// const sequelize = require('./database/db');

/****
 * Módulos para manejar la sesión del usuario mediante cookies
 */

 // const sequelize = require("../database/db");

var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
/**
 * Middleware para login
 */
var logger = require("morgan");

var hbs = require("hbs");
require("./hbs/helpers");

// variables de rutas
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var loginRouterEmpleado = require("./routes/loginEmpleado");
var empleadoRouter = require("./routes/empleado.routes");
var clienteRouter = require('./routes/cliente.routes');
var proveedorRouter= require('./routes/proveedor.routes');
var articuloRouter= require('./routes/articulo.routes');
var pedidoClienteRouter= require('./routes/pedidoClie.routes');


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/parciales", function (err) {});

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);


/**
 * Los middlewares cookieParser y cookieSession se encargan,
respectivamente, de procesar las cookies y de gestionar la información de la
sesión en éstas.

Es necesario darle un nombre a la cookie, así como un par de claves para que
el middleware firme los datos y un periodo de validez máximo.
 
El periodo de validez se expresa en milisegundos. Si se omite, la duración de
la cookie será hasta el cierre de la sesión (cerrar navegador/salir del sistema).

 */

app.use(cookieParser());
app.use(
  cookieSession({
    name: "sesion", //nombre de la cookie
    keys: [process.env.COOKIE_SECRET_1, process.env.COOKIE_SECRET_2], //claves de firma, definidas en ".env"
    maxAge: 60 * 60 * 1000, //caducidad [milisegundos] 1 hora
  })
);
/**
 * Este otro middleware (static) se utiliza para servir contenidos estáticos. Todos
los archivos que estén dentro de la carpeta public estarán accesibles con una
ruta igual a la ruta relativa dentro de la carpeta public.
 */


// static folder NO TOCAR
app.use(express.static(path.join(__dirname, 'public')));

/***************************
 * Rutas(controlador)
 * **************************
 */
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/loginEmpleado", loginRouterEmpleado);
app.use("/empleado", empleadoRouter);
app.use("/cliente", clienteRouter);
app.use("/proveedor", proveedorRouter);
app.use("/articulo", articuloRouter);
app.use("/pedidoCliente", pedidoClienteRouter);




//Modelos

// require('./database/mdelos');

const Empleado = require("./models/empleado");
const Cliente = require("./models/cliente");
const Proveedor = require("./models/proveedor");
const Articulos = require("./models/articulo");
const PedidoCliente = require("./models/pedidoClie");
const DetPedClie = require('./models/detPedClie');

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





// const connection = new Sequelize(
//   "dbPedidos",    // base de datos
//   "root",         // Usuario
//   "maria123",     // passw
//   {
//     host: "localhost",  // host
//     dialect: "mariadb" // Motor BD
//   }
//   // "mariadb://root:maria124@localhost:3306/dbPedidos"
//   //   "mariadb://hugo:hugo@localhost:3306/dbPedidos"
// );


// connection
//   .authenticate()
//   .then(() => {
//     Articulo.init(connection);
//     Cliente.init(connection);
//     Proveedor.init(connection);
//     Empleado.init(connection);
//     PedidoClie.init(connection);
//     PedidoProv.init(connection);
//     DetPedClie.init(connection);
//     DetPedProv.init(connection);
//     //Autor.init(connection);

//     //RELACIONES

//     Proveedor.hasMany(PedidoProv);
//     PedidoProv.belongsTo(Proveedor);

//     // cliente - Pedidos
//     Cliente.hasMany(PedidoClie);
//     PedidoClie.belongsTo(Cliente);

//     /**Genera una clave primaria compuesta para DetPedClie
//      *  con las claves primarias de PedidoClie y Articulo
//      */
//     Articulo.belongsToMany(PedidoClie, {
//       through: DetPedClie,
//       foreignKey: "IdArticulo",
//     });
//     PedidoClie.belongsToMany(Articulo, {
//       through: DetPedClie,
//       foreignKey: "IdPedidoCli",
//     });
   
//     DetPedClie.belongsTo(PedidoClie, { foreignKey: "IdPedidoCli" });

//     Articulo.belongsToMany(PedidoProv, {through: DetPedProv, foreignKey:'IdArticulo'});
//     PedidoProv.belongsToMany(Articulo, {through: DetPedProv, foreignKey:'IdPedidoProv'});
//     DetPedProv.belongsTo(PedidoProv, { foreignKey:'IdPedidoProv'});

//     //creación de tablas si no existen
//     // con { force: true} borra los datos existentes
//     connection.sync({ force: false });
//   })

//   .catch((err) => {
//     console.log(err);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  // });

module.exports = app;