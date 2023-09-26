const { login, register } = require("../controllers/authentication");

module.exports = (router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
