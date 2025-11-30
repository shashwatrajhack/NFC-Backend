const express = require("express");
const authRouter = express.Router();

const {
  signup,
  login,
  deleteUser,
  logoutUser,
} = require("../controllers/userControl");

authRouter.post("/api/signup", signup);
authRouter.post("/api/login", login);
authRouter.delete("/api/deleteUser", deleteUser);
authRouter.post("/api/logout", logoutUser);

module.exports = authRouter;
