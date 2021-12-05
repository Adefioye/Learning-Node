const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
  const { name } = req.cookies;
  res.send(`WELCOME ${name}`);
});

app.get("/setProperties", (req, res) => {
  res.cookie("name", "adeshola");
  res.cookie("color", "black&yellow");
  res.send("Just stole some information");
});

app.listen(3000, () => {
  console.log("APP LISTENING ON PORT 3000");
});
