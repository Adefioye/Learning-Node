const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("IT'S HOMEPAGE! WELCOME!");
});

app.get("/setProperties", (req, res) => {
  res.cookie("name", "adeshola");
  res.cookie("color", "black&yellow");
  res.send("Just stole some information");
});
app.listen(3000, () => {
  console.log("APP LISTENING ON PORT 3000");
});
