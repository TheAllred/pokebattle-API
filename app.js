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
  baseURL: "https://duck-directory-api.onrender.com/",
  clientID: "v9EMKJY95JYvlVb8UvH9UBmniMUSSSbn",
  issuerBaseURL: "https://dev-ysgqikzna2aqfoi7.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
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
