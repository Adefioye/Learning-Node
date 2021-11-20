const express = require("express");
const app = express();
// console.dir(app);

// This always runs anytime a request is send specifically to the listening port
app.use(() => {
  console.log("A new request has just been sent!");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
