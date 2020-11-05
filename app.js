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

//  //Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:'); // Example for sqlite
//const sequelize = new Sequelize//('mariadb://root:maria123@localhost:3306/biblioteca');
const { Sequelize } = require("sequelize");
const Personas = require("./models/Personas");
const connection = new Sequelize(
  "mariadb://root:maria123@localhost:3306/dbPedidos"
);
connection
  .authenticate()
  .then(() => {
    Personas.init(connection);
    Personas.sync();
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
// module.exports = app;
