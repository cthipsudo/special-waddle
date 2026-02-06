const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => {
    console.log("Connection Open!!");
  })
  .catch((err) => {
    console.log("Something went wrong.", err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be positive ya dunce!"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
    default: ["cycling"],
  },
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"], // size can only be these values
  },
});

// Instance Methods
// Use this when needing to do individual updates affecting the ONE product
productSchema.methods.greet = function () {
  console.log("hi");
  console.log(`From - ${this.name}`);
};

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save(); // Need to save the object again
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

// Static Method
// Use this when needing to do mass function affecting ALL products
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { oneSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Cool Bike" });
  console.log(foundProduct);
  foundProduct.greet();
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory("Cool");
  console.log(foundProduct);
};

Product.fireSale().then((res) => {
  console.log(res);
});

findProduct();

// const bike = new Product({
//   name: "Helmet",
//   price: 20,
//   categories: ["Cycling", "Safety"],
// });
// bike
//   .save()
//   .then((data) => {
//     console.log("It has been added", data);
//   })
//   .catch((err) => {
//     console.log("Something went wrong", err);
//   });

// Product.findOneAndUpdate(
//   { name: "Helmet" },
//   { price: 1 },
//   { new: true, runValidators: true },
// )
//   .then((data) => {
//     console.log("It has been updated!", data);
//   })
//   .catch((err) => {
//     console.log("Something went wrong", err);
//   });
// Need to specific runValidators when updating, it does not do it by default
