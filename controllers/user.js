require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const mongoose = require("mongoose");
const argon2 = require("argon2");

/**** DATABASE ****/
const db = require("../models");

/**** CONTROLLER ****/

const test = (req, res) => {
  res.json({ message: "User endpoint OK! ✔" });
};

const register = async (req, res) => {
  db.User.findOne({ email: req.body.email }, async (err, doc) => {
    if (doc) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    } else {
      const passwordHash = await argon2.hash(req.body.password);
      const user = new db.User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
        profilePicture: req.file.filename,
      });

      user
        .save()
        .then((result) => {
          console.log(result);
          res.json({ message: "Registered new user." });
        })
        .catch((err) => console.log(err));
    }
  });
};

const login = async (req, res) => {
  const user = await db.User.findOne({ email: req.body.email }).select(
    "password"
  );
  let hash = user.password;
  let password = req.body.password;

  try {
    if (await argon2.verify(hash, password)) {
      res.status(200).json({ message: "Login successful." });
    } else {
      res.status(400).json({ message: "Email or Password incorrect." });
    }
  } catch (err) {
    res.status(500).json({ message: "This action is not allowed." });
  }
};

const getAllUsers = (req, res) => {
  db.User.find({}, (err, users) => {
    if (err) console.log("user.getAllUsers", err);
    res.json(users);
  });
};

const getUser = async (req, res) => {
  db.User.findById(req.params._id, (err, user) => {
    if (err) console.log("user.getUser", err);
    res.json(user);
  });
};

const updateUser = (req, res) => {
  const payload = req.body;
  db.User.findOneAndUpdate(
    req.params._id,
    payload,
    { new: true },
    (err, updatedUser) => {
      if (err) console.log("user.updateUser", err);
      res.json(updatedUser);
    }
  );
};

module.exports = {
  test,
  register,
  getUser,
  getAllUsers,
  updateUser,
  login,
};
