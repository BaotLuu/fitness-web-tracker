const express = require("express");
const { login, signup } = require("../controllers/userController");

const router = express.Router();

//log in
router.post("/login", login);

//singup
router.post("/signup", signup);

module.exports = router;
