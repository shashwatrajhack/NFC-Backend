const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, age } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
    });
    await user.save();
    res.status(200).send("user added successfully!!");
  } catch (err) {
    res.status(400).send({ message: "error saving the user " + err.message });
  }
});

authRouter.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("user not exist");
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("password",isPasswordValid);

    if (isPasswordValid) {
      const token = user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 36000),
        httpOnly: true,
      });
      res.send("login Successfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("User not found " + err.message);
  }
});

authRouter.delete("/api/deleteUser", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, password, password });

  try {
    if (!user) {
      res.send("user not exist");
    } else {
      await User.deleteOne(user);
      res.status(200).send("user deleted successfully!!");
    }
  } catch (err) {
    res.status(400).send("please give correct email and password");
  }
});

authRouter.patch("/api/update",async(req,res) => {

})

module.exports = authRouter;
