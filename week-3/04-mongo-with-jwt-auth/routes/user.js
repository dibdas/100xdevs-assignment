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
  const courseId = req.params.courseId;
  const username = req.headers.username;
  // const username = req.headers.username;
  console.log("username", username);
  console.log(courseId);
  User.findOneAndUpdate(
    { username },
    {
      $push: { purchasedCourses: courseId },
      // $push: { purchasedCourses: mongoose.Types.ObjectId(courseId) },
    },
    { new: true }
  )
    .then(function (result) {
      result
        ? res.json({ msg: "course added and updated", result })
        : res.status(403).json({ msg: "course not updated" });
    })
    .catch(function (error) {
      console.log("error" + error);
    });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
