const mongoose = require("mongoose");
async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopApp");
}

main()
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive value"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
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
    enum: ["S", "M", "L"],
  },
});

// Using instance methods
// Setting a greet method on the Product model
// productSchema.methods.greet = function () {
//   console.log("Hey! Howdy! You are awesome!");
// };

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save;
};

productSchema.methods.addcategory = function (newCat) {
  this.categories.push(newCat);
  return this.save;
};

// Instance methods work basically on individual item in the Model class while static methods
// work on the ehole Model class
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Bike Helmet" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addcategory("Outdoor");
  console.log(foundProduct);
};

Product.fireSale().then((res) => console.log(res));

// findProduct();

// const bike = new Product({
//   name: "Tire Pump",
//   price: 100,
//   categories: ["Cycling"],
// });

// bike
//   .save()
// .then((data) => {
//   console.log("IT WORKED!");
//   console.log(data);
// })
// .catch((err) => {
//   console.log("OH NO ERROR!");
//   console.log(err);
// });

// Learning to update an existing document in the collection
// Product.findOneAndUpdate(
//   { name: "Tire Pump" },
//   { size: "XL" },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("IT WORKED!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO ERROR!");
//     console.log(err);
//   });
