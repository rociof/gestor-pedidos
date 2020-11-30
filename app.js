var createError = require("http-errors");
var express = require("express");
var path = require("path");

/**
 * Multer es un middleware que sirve para subir imágenes al servidor
 * a través de un formulario
 */
const multer = require('multer');

/****
 * Módulos para manejar la sesión del usuario mediante cookies
 */

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



//  autenticación de usuarios
const {
  necesitaAutenticacion,
  necesitaAdmin,
  necesitaGestor,
} = require("./auth");

var app = express();
// var session = require('express-session')

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
    keys: ["secret1234", "secret1234"], //claves de firma
    maxAge: 5 * 60 * 1000, //caducidad [milisegundos]
  })
);
/**
 * Este otro middleware (static) se utiliza para servir contenidos estáticos. Todos
los archivos que estén dentro de la carpeta public estarán accesibles con una
ruta igual a la ruta relativa dentro de la carpeta public.
 */

app.use(express.static(path.join(path.dirname(""), "public")));

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


const { Sequelize } = require("sequelize");

//Modelos

const Articulo = require("./models/articulo");
const Cliente = require("./models/cliente");
const Proveedor = require("./models/proveedor");
const Empleado = require("./models/empleado");
const PedidoClie = require("./models/pedidoClie");
const PedidoProv = require("./models/pedidoProv");
const DetPedClie = require("./models/detPedClie");
const DetPedProv = require("./models/detPedProv");

const connection = new Sequelize(
  "dbPedidos",    // base de datos
  "root",         // Usuario
  "maria123",     // passw
  {
    host: "localhost",  // host
    dialect: "mariadb" // Motor BD
  }
  // "mariadb://root:maria123@localhost:3306/dbPedidos"
  //   "mariadb://hugo:hugo@localhost:3306/dbPedidos"
);

connection
  .authenticate()
  .then(() => {
    Articulo.init(connection);
    Cliente.init(connection);
    Proveedor.init(connection);
    Empleado.init(connection);
    PedidoClie.init(connection);
    PedidoProv.init(connection);
    DetPedClie.init(connection);
    DetPedProv.init(connection);
    //Autor.init(connection);

    //RELACIONES

    // Proveedor.hasMany(PedidoProv);
    // PedidoProv.belongsTo(Proveedor);

    Cliente.hasMany(PedidoClie);
    PedidoClie.belongsTo(Cliente);

    /**Genera una clave primaria compuesta para DetPedClie
     *  con las claves primarias de PedidoClie y Articulo
     */
    Articulo.belongsToMany(PedidoClie, {
      through: DetPedClie,
      foreignKey: "IdArticulo",
    });
    PedidoClie.belongsToMany(Articulo, {
      through: DetPedClie,
      foreignKey: "IdPedidoCli",
    });
    /**La clave foránea es un campo (no la PK)
     * de la tabla DetPedclie
     */
    DetPedClie.belongsTo(PedidoClie, { foreignKey: "IdPedidoCli" });

    // Articulo.belongsToMany(PedidoProv, {through: DetPedProv, foreignKey:'IdArticulo'});
    // PedidoProv.belongsToMany(Articulo, {through: DetPedProv, foreignKey:'IdPedidoProv'});
    // DetPedProv.belongsTo(PedidoProv, { foreignKey:'IdPedidoProv'});

    //creación de tablas si no existen
    // con { force: true} borra los datos existentes
    connection.sync({ force: false });
  })

  .catch((err) => {
    console.log(err);

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
  });

module.exports = app;