const mongoose = require("mongoose");
async function main() {
  await mongoose.connect("mongodb://localhost:27017/movieApp");
}

main()
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

// Lets construct a Movie class which is use to create documents in mongodb
const Movie = mongoose.model("Movie", movieSchema);
// const amadeus = new Movie({
//   title: "Amadeus",
//   year: 1986,
//   score: 9.2,
//   rating: "R",
// });

// Inserting an array of items
// Movie.insertMany([
//     { title: "Amelie", year: 2001, score: 8.3, rating: "R" },
//     { title: "Alien", year: 1979, score: 8.1, rating: "R" },
//     { title: "The Iron Giant", year: 1999, score: 7.5, rating: "PG" },
//     { title: "Stand By Me", year: 1986, score: 8.6, rating: "R" },
//     { title: "Moonrise Kingdom", year: 2021, score: 7.3, rating: "PG-13" }
// ])
// .then((data) => {
//     console.log("IT WORKED!")
//     console.log(data)
// })
