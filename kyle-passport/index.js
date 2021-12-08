if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./passport-config");
const methodOverride = require("method-override");

initializePassport(
  passport,
  (email) => {
    return users.find((user) => user.email === email);
  },
  (id) => {
    return users.find((user) => user.id === id);
  }
);

const users = [];

// Setting for ejs and path for viewing templated files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Setting up middlewares for passport
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", isLoggedIn, (req, res) => {
  res.render("index", { name: req.user.name });
});

app.get("/register", isNotLoggedIn, (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    hashedpassword = await bcrypt.hash(password, 12);
    users.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedpassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users);
});
app.get("/login", isNotLoggedIn, (req, res) => {
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

// Some middleware callbacks
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function isNotLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(3000, () => {
  console.log("APP IS SERVED ON PORT 3000");
});
