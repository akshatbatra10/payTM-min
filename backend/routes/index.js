const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
