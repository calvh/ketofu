require("dotenv").config();

// -------------------------------  EXPRESS  ------------------------------
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

// ------------------------------  DATABASE  ------------------------------
const db = require("./models");

// -----------------------------  MIDDLEWARE  -----------------------------

// ---------- bodyparser ----------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());

// ------------ helmet ------------
// * helmet sets security headers
app.use(require("helmet")());

// ------------- cors -------------
// * allow app to access HTTP resources on another domain other than origin
app.use(require("cors")());

// ---------- compression ---------
// * compression increases performance
app.use(require("compression")());

// ------------ morgan ------------
// * http logging
// app.use(require("morgan")("combined"));

// -----------------------------  HANDLEBARS  -----------------------------
const exphbs = require("express-handlebars");
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// -------------------------------  PUBLIC  -------------------------------
app.use(express.static("public"));

// ------------------------------  PASSPORT  ------------------------------
const passport = require("./auth/passport");
app.use(
  require("express-session")({
    secret: "25EC9F66F434192D22D482A413F4B",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

// -------------------------------  ROUTES  -------------------------------

const router = express.Router();
require("./routes/authRoutes")(router, passport, require("./utils/validate"));
require("./routes/apiRoutes")(router, db, ensureLoggedIn, require("./utils/calculateMacros"));
require("./routes/renderRoutes")(router, db, ensureLoggedIn, require("./utils/calculateMacros"));

app.use("/", router);

// -------------------------------  STARTUP  ------------------------------

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
