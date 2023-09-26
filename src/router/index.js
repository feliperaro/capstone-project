const router = require("express").Router();
const authentication = require("./authentication");
const users = require("./users");

module.exports = () => {
  authentication(router)
  users(router);
  return router;
};
