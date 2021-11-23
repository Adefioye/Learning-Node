const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");


app.use(express.json());  // for parsing JSON payload
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

const comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that is so funny",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuid(),
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments })
})

app.get("/comments/new", (req, res) => {
    res.render("comments/new")
})

app.post("/comments", (req, res) => {
    const {username, comment} = req.body
    comments.push({ username, comment, id: uuid() });
    res.redirect("/comments")
})

// Showing one comment using path parameters
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/show", {comment})
})

// Updating the content
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const textComment = req.body.comment 
  const foundComment = comments.find(c => c.id === id)
  foundComment.comment = textComment 
  res.redirect("comments/index")
  console.log("It's fine")
})


app.post("/tacos", (req, res) => {
    console.log(req.body);
    res.send("POST /tacos response")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})