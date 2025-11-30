const express = require("express");
const user = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/api/all", async (req, res) => {
  try {
    const users = await user.find();
    if (!users) {
      return res.status(200).send("Users not registered yet");
    } else {
      res.json({ users: users });
    }
  } catch (err) {
    console.log("Users not found" + err.message);
  }
});

profileRouter.get("/api/getuser/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const userId = await user.findById(id);
  if (!userId) {
    return res.status(401).send("id doesn't exist");
  } else {
    res.json({ user: userId });
  }
});

profileRouter.delete("/api/deleteuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = await user.findByIdAndDelete(id);
    if (!userId) {
      return res.status(400).send("user does not exist");
    } else {
      return res.status(200).send("user deleted successfully !!");
    }
  } catch (err) {
    res.send("error deleting the user " + err.message);
  }
});

profileRouter.patch("/api/edit/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({ user });
  } catch (err) {
    res.status(400).send("");
  }
});

module.exports = profileRouter;
