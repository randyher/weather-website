const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const port = process.env.PORT || 3000;

// Define Paths for Express Config
const publicDirPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set Up Handle Bars & Views Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set Up Static Directory to Serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Randy"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Randy"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Randy"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Require an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Require a search query" });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Randy"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "404 Page Not Found",
    name: "Randy"
  });
});

app.listen(port, () => {
  console.log("It's working");
});
