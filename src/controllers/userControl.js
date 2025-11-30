const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
  try {
    // const { firstName, lastName, email, password, age } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).send("user added successfully!!");
  } catch (err) {
    res.status(400).send({ message: "error saving the user " + err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("user not exist");
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("password", isPasswordValid);

    if (isPasswordValid) {
      const token = user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 36000),
      });
      return res.send("login Successfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("User not found " + err.message);
  }
};
const deleteUser = async (req, res) => {
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
};

const logoutUser = async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successfull");
};

module.exports = { signup, login, deleteUser, logoutUser };

