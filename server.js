//Dependencies

const express  = require("express");
const exphbs   = require("express-handlebars");
const logger   = require("morgan");
const mongoose = require("mongoose");

// Require all models
// var db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

// Set view engine to handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
