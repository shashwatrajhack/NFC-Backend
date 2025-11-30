const express = require("express");
const connectDB = require("./src/config/db");
const app = express();
app.use(express.json());
const globalError = require("./src/middlewares/globalError");

const authRouter = require("./src/routes/userRoutes");
const profileRouter = require("./src/routes/profile");

app.use("/", authRouter);
app.use("/",profileRouter)
app.use(globalError);

connectDB()
  .then(() => {
    console.log("DB connection established successfully");

    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB not connected" + err.message);
  });
