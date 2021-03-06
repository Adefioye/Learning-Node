const express = require("express");
const app = express();
// console.dir(app);

// This always runs anytime a request is send specifically to the listening port
// app.use((req, res) => {
//   console.log("A new request has just been sent!");
//   res.send("Hello bastard! I got your request. Take it! Your father!");
// });

// If the below is set at the beginning of the file, the other get request routes
// // would not be located
// app.get("*", (req, res) => {
//   res.send("This is not the path");
// });
// Set config for serving static files like css for styling html pages
app.use(express.static("public"));

app.get("/r/:pathName", (req, res) => {
  const { pathName } = req.params;
  res.send(`<h1>Hello! This is the new ${pathName}</h1>`);
});
app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/cats", (req, res) => {
  res.send("MEOW!!!");
});

app.get("/dogs", (req, res) => {
  res.send("Whoof!!");
});

app.post("/cats", (req, res) => {
  res.send("This is a post request to /cats...");
});

// app.get("*", (req, res) => {
//   res.send("This is not the path");
// });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
