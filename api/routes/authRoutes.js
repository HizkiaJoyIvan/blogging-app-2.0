const router = require("express").Router();
const {
  register,
  login,
  getUsers,
  logout,
  refresh,
} = require("../controller/authController");

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", refresh);

router.get("/", getUsers);

router.post("/logout", logout);

module.exports = router;
