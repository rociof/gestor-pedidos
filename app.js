var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);


const { Sequelize } = require("sequelize");
const Personas = require("./models/Personas");
const Articulos = require("./models/Articulos");
const Clientes = require("./models/Clientes");
const Proveedores = require("./models/Proveedores");
const Empleados = require("./models/Empleados");
const Pedido_cliente = require("./models/Pedido_cliente");
const Pedido_proveedor = require("./models/Pedido_proveedor");
const Detallepedido_clie = require("./models/Detallepedido_clie");
const Detallepedido_prov = require("./models/Detallepedido_prov");



const connection = new Sequelize(
  "mariadb://root:maria123@localhost:3306/dbPedidos"
);

   connection
    .authenticate()
    .then(() => {
      Personas.init(connection);
      Articulos.init(connection);
      Clientes.init(connection);
      Proveedores.init(connection);
      Empleados.init(connection);
      Pedido_cliente.init(connection);
      Pedido_proveedor.init(connection);
      Detallepedido_clie.init(connection);
      Detallepedido_prov.init(connection);
      connection.sync();
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
