const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

mongoose
  .connect(
    "mongodb+srv://Akshat_Mystic:pD9M18fMeQOR61NV@cluster0.4qeanap.mongodb.net/Paytm"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
