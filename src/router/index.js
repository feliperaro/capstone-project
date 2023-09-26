const router = require("express").Router();
const users = require("./users");

module.exports = () => {
  users(router);
  return router;
};
