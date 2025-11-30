const express = require("express");
const connectDB = require("./src/config/db");
const app = express();
app.use(express.json());

const authRouter = require("./src/routes/userRoutes");

app.post("/basic", (req, res) => {
  res.status(200).send("API running");
});

app.use("/", authRouter);

connectDB()
  .then(() => {
    console.log("DB connection established successfully");

    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("db connection not established" + err.message);
  });
