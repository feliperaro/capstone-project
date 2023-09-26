require("dotenv").config();
const express = require("express");
const { connectToMongo } = require("./src/config/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const router = require("./src/router");

app.use("/", router());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectToMongo();
});
