const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => {
    console.log("Connection Open!!");
  })
  .catch((err) => {
    console.log("Something went wrong.", err);
  });

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

// A way to create properties
// Below returns the full name of the document object without having a fullName key:pair
personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

// Middleware - before 'save' runs
personSchema.pre("save", async function () {
  console.log("ABOUT TO SAVE");
});

// Middleware - after 'save' runs
personSchema.post("save", async function () {
  console.log("JUST SAVED");
});

const Person = mongoose.model("Person", personSchema);
