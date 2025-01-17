const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const apiRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", apiRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
