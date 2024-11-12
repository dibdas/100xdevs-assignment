const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const jwtPassword = "secret";
// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  User.findOne({ username, password }).then(function (result) {
    result
      ? res.json({ token: jwt.sign({ username }, jwtPassword) })
      : res.json({ msg: "incorrect email or password" });
  });
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
