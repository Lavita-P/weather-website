const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Lavita",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Lavita",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helptext: "Help Text",
    name: "Lavita",
  });
});

app.get("/weather", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            error,
          });
        }
        //res.setHeader("Content-Type", "application/json");

        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article not found",
    name: "Lavita",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found",
    name: "Lavita",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
