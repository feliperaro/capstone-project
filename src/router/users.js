const { getAllUsers } = require("../controllers/users");
const { isAuthenticaded } = require("../middlewares");

module.exports = (router) => {
  router.get("/users", isAuthenticaded, getAllUsers);
};
