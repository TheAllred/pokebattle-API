const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const dotenv = require("dotenv");

const port = process.env.PORT || 3000;
const app = express();

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: "https://pokebattleapi.onrender.com",
  clientID: "mp8Z9YgtQeHbhHmga8RoW4dpWOH6gcUa",
  issuerBaseURL: "https://dev-ysgqikzna2aqfoi7.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
console.log(process.env.baseURL);
// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // Encode the email and picture parameters
    var email = encodeURIComponent(req.oidc.user.email);
    var picture = encodeURIComponent(req.oidc.user.picture);

    // Create the URL with encoded parameters
    var url =
      "https://pokedex-uifd.onrender.com/pokedex.html" +
      "?email=" +
      email +
      "&picture=" +
      picture;
    res.redirect(url);
  } else {
    res.redirect("https://pokedex-uifd.onrender.com");
  }
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    // res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use("/", require("./routes"));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
