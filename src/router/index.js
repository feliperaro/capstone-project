const router = require("express").Router();
const authentication = require("./authentication");
const users = require("./users");

router.use("/auth", authentication);
router.use("/users", users);

router.get(
  "/",
  function (req, res, next) {
    if (!req.user) {
      return res.render("home");
    }
    next();
  },
  function (req, res, next) {
    res.locals.filter = null;
    res.render("index", { user: req.user });
  }
);

module.exports = router;
