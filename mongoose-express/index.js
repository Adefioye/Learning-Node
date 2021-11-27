const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopApp");
}

main()
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION FAILED !");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/dogs", (req, res) => {
  res.send("WHOFF!");
});

app.listen(3000, () => {
  console.log("APP LISTENING ON P0RT 3000");
});
