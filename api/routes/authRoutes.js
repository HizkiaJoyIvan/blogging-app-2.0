const router = require("express").Router();
const {
  register,
  login,
  getUsers,
  logout,
} = require("../controller/authController");

router.post("/register", register);

router.post("/login", login);

router.get("/", getUsers);

router.post("/logout", logout);

module.exports = router;
