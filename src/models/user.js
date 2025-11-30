const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 4,
    max: 50,
  },
  lastName: {
    type: String,
    min: 3,
    max: 10,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 15,
    max: 70,
  },
  about:{
    type:String,
  }
});

userSchema.methods.getJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
    {httpOnly:true},
  );
};

const User = mongoose.model("user", userSchema);
module.exports = User;
