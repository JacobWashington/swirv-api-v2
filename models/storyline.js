const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new Schema({
  authId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: [1, "Please give your story a title."],
    max: [1000, "Title must contain between 1 and 1000 characters."],
  },
  genre: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
}, {timestamps: true});

const storylineSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  authId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: [1, "Please give your storyline a title."],
    max: [1000, "Title must contain between 1 and 1000 characters."],
  },
  genre: {
    type: String,
    required: true,
  },
  stories: {
    type: [storySchema],
  },
}, {timestamps: true});

const Storyline = mongoose.model("Storyline", storylineSchema);
module.exports = Storyline;
