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
    min: 0,
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
});

const Product = mongoose.model("Product", productSchema);

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
Product.findOneAndUpdate(
  { name: "Tire Pump" },
  { price: -100 },
  { new: true, runValidators: true }
)
  .then((data) => {
    console.log("IT WORKED!");
    console.log(data);
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err);
  });
