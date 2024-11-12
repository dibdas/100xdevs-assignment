const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtsecret = require("../index");
const { Admin } = require("../db");
const jwtPassword = "secret";
// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  Admin.findOne({ username, password }).then(function (result) {
    result
      ? res.json({ token: jwt.sign({ username }, jwtPassword) })
      : res.json({ msg: "incorrect email or password" });
  });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
