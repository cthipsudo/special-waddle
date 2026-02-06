const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/movieApp") //name of the db after the address
  .then(() => {
    console.log("Connection Open!!");
  })
  .catch((err) => {
    console.log("Something went wrong.", err);
  });

const movieSchemea = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchemea); // Needs to be singular and Uppercase

// const parasite = new Movie({
//   title: "Parasite",
//   year: 2014,
//   score: 9.8,
//   rating: "R",
// });
// need to manually save the model if making a singular instance like above

Movie.insertMany([
  {
    title: "The Grand Budapest Hotel",
    year: "2014",
    score: "8.1",
    rating: "R",
  },
  { title: "Asteroid City", year: "2023", score: "6.4", rating: "PG-13" },
  { title: "The French Dispatch", year: "2021", score: "7.1", rating: "R" },
  { title: "Isle of Dogs", year: "2018", score: "7.8", rating: "PG-13" },
  { title: "Fantastic Mr.Fox", year: "2009", score: "7.9", rating: "PG" },
]).then((data) => {
  console.log("It worked!");
  console.log(data);
});
