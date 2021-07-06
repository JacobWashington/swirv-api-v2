const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    min: [1, "Please enter your first name."],
    max: [100, "First name must contain between 1 and 100 characters."],
  },
  lastName: {
    type: String,
    required: true,
    min: [1, "Please enter your last name."],
    max: [100, "Last name must contain between 1 and 100 characters."],
  },
  email: {
    type: String,
    required: true,
    min: [1, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password must contain at least 8 characters."],
    select: false,
  },
  profilePicture: {
    type: String,
  },
  roles: {
    type: Array,
    default: "author",
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
