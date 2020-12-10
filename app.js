var createError = require("http-errors");
var express = require("express");
const path = require("path");


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
// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// eslint-disable-next-line no-undef
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
    // name: "sesion", //nombre de la cookie
    // eslint-disable-next-line no-undef
    name: process.env.NAME_SESSION,
    // eslint-disable-next-line no-undef
    keys: [ process.env.SECRETO1, process.env.SECRETO2 ],
    // keys: ["secret1234", "secret1234"], //claves de firma
    maxAge: 60 * 60 * 1000, //caducidad [milisegundos] 1 hora
    // maxAge: process.env.CADUCIDAD
  })
);
/**
 * Este otro middleware (static) se utiliza para servir contenidos estáticos. Todos
los archivos que estén dentro de la carpeta public estarán accesibles con una
ruta igual a la ruta relativa dentro de la carpeta public.
 */


// static folder NO TOCAR
// eslint-disable-next-line no-undef
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


const { Sequelize } = require("sequelize");

// Database
const sequelize = require('./database/db');

//Modelos

// require('./database/mdelos');

const Empleado = require("./models/empleado");
const Cliente = require("./models/cliente");
const Proveedor = require("./models/proveedor");
const Articulos = require("./models/articulo");
const PedidoCliente = require("./models/pedidoClie");
const DetPedClie = require('./models/detPedClie');


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