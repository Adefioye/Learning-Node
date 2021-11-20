const express = require("express");
const app = express();
// console.dir(app);

// This always runs anytime a request is send specifically to the listening port
app.use((req, res) => {
  console.log("A new request has just been sent!");
  res.send("Hello bastard! I got your request. Take it! Your father!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
