require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("Hello Capstone Project!");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
