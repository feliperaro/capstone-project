require("dotenv").config();
const express = require("express");
const router = require("./src/router");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { connectToMongo } = require("./src/config/mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const expressSession = session({
  secret: process.env.SESSION_SECRET,
  name: "user",
  resave: false,
  saveUninitialized: true,
  cookie: {
    sessionToken: null,
    expires: null,
  },
});

app.use(cookieParser());
app.use(express.json());
app.use(expressSession);
app.use(passport.authenticate("session"));

app.use("/", router());
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectToMongo();
});
