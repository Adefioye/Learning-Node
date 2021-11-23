const express = require("express");
const app = express();
const path = require("path");


app.use(express.json());  // for parsing JSON payload
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

const comments = [
    {
        username: "Todd",
        comment: "lol that is so funny"
    },
    {
        username: "Skyler",
        comment: "I like to go birdwatching with my dog"
    },
    {
        username: "Sk8erBoi",
        comment: "Plz delete your account, Todd"
    },
    {
        username: "onlysayswoof",
        comment: "woof woof woof"
    }
]
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments })
})

app.get("/comments/new", (req, res) => {
    res.render("comments/new")
})

app.post("/comments", (req, res) => {
    const {username, comment} = req.body
    comments.push({username, comment})
    res.send("It worked!")
})


app.post("/tacos", (req, res) => {
    console.log(req.body);
    res.send("POST /tacos response")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})