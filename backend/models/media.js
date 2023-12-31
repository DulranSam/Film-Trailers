const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 20,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 5,
    },
    trailer: {
      type: String,
      required: true,
      trim: true,
      min: 5,
    },
    photo: {
      type: String,
    },
    alternate: {
      type: String,
    },
    rating: { type: String },
  },
  { timestamps: true }
);

const movieModel = mongoose.model("movies", movieSchema);
module.exports = movieModel;
