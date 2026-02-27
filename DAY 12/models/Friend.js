const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    birthday: { type: Date, required: true },
    city: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friend", friendSchema);