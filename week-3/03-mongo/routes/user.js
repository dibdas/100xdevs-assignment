const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const { Course } = require("../db");
const mongoose = require("mongoose");
// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic

  const username = req.body.username;
  const password = req.body.password;
  User.create({ username, password }).then(function (result) {
    result
      ? res.json({ msg: "user created successfully" })
      : res.json({ msg: "unsucessful" });
  });
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find({}).then(function (result) {
    result
      ? res.json({ courses: result })
      : res.json({ msg: "courses not found" });
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  console.log(username);
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

// router.get("/purchasedCourses", userMiddleware, (req, res) => {
//   // Implement fetching purchased courses logic
//   const username = req.headers.username;
//   User.findOne({ username })
//     .populate("purchasedCourses")
//     .then(function (result) {
//       result
//         ? res.json({ result })
//         : res.status(403).json({ msg: "something is wrong" });
//     });
// });

// another way of the solution

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  const username = req.headers.username;
  User.findOne({ username })
    .then(function (result) {
      const courses = result.purchasedCourses;
      console.log(courses);
      Course.find({
        _id: {
          $in: courses,
        },
      })
        .then(function (coursesList) {
          console.log("Purchased Courses:", coursesList);
          res.json({ purchasedCourses: coursesList });
        })
        .catch(function (error) {
          console.error("Error finding courses:", error);
          res.status(500).json({ msg: "Error fetching courses" });
        });
    })
    .catch(function (error) {
      console.error("Error finding user:", error);
      res.status(500).json({ msg: "Error fetching user" });
    });
});
module.exports = router;
