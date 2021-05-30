const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 7000;

//Sattic Path
const staticPath = path.join(__dirname, "../public");
const staticPathTemplates = path.join(__dirname, "../templates/views");
const staticPathPartials = path.join(__dirname, "../templates/partials");

//Path settings
app.set("view engine", "hbs");
app.set("views", staticPathTemplates);

// Partials Registered
hbs.registerPartials(staticPathPartials);

//console.log(staticPath);
app.use(express.static(staticPath));

//Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("error", {errMsg:"Click To go back"});
});

app.listen(port, () => {
  console.log("Listening at port number : " + port);
});
