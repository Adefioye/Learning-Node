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

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema
  .virtual("fullname")
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  .set(function (v) {
    const first = v.slice(0, v.indexOf(" "));
    const last = v.slice(v.indexOf(" ") + 1);
    this.set({ first, last });
  });

const Person = mongoose.model("Person", personSchema);

// const p = new Person({ first: "Koko", last: "Lamba" });
// p.save();
