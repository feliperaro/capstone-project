const { login, register } = require("../controllers/authentication");
const { authentication, random } = require("../helpers/");
const express = require("express");
const passport = require("passport");

const LocalStrategy = require("passport-local");
const { getUserByEmail } = require("../models/user");

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("teste");
    console.log("username", username);
    const user = getUserByEmail(username).select(
      "+authentication.salt +authentication.password"
    );
    console.log("user", user);

    if (!user) {
      return done(null, false);
    }
    const expectedPassword = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedPassword) {
      return done(null, false);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    user.save();
    return done(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  console.log("serializeUser", user);
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserializeUser", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();

router.post("/register", register);

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/auth/login",
    failureMessage: true,
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

module.exports = router;
