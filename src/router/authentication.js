const { login, register } = require("../controllers/authentication");
const { authentication, random } = require("../helpers/");
const express = require("express");
const passport = require("passport");

const LocalStrategy = require("passport-local");
const { getUserByEmail } = require("../models/user");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    console.log("username", username);
    const user = await getUserByEmail(username).select(
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

    await user.save();
    return done(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();

router.post("/register", register);
router.post("/auth/login", login);

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/home",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

/* POST /logout
 *
 * This route logs the user out.
 */
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

router.post("/signup", function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      db.run(
        "INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)",
        [req.body.username, hashedPassword, salt],
        function (err) {
          if (err) {
            return next(err);
          }
          var user = {
            id: this.lastID,
            username: req.body.username,
          };
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        }
      );
    }
  );
});

module.exports = router;
