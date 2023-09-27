require("dotenv").config();
const express = require("express");
const router = require("./src/router");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const { connectToMongo } = require("./src/config/mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/", router());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectToMongo();
});
