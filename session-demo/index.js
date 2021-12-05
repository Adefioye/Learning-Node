const express = require("express");
const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`YOU HAVE VIEWED THIS PAGE ${req.session.count} TIMES`);
});

app.get("/register", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  const { username } = req.session;
  res.send(`You are welcome: ${username}`);
});

app.listen(3000, () => {
  console.log("APP LISTENING ON PORT 3000");
});
