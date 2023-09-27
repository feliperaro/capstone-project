const router = require("express").Router();
const authentication = require("./authentication");
const users = require("./users");

module.exports = () => {
  router.use("/auth", authentication);
  router.use("/users", users);
  return router;
};
