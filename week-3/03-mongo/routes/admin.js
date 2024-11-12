const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin } = require("../db");
const { Course } = require("../db");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic

  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  Admin.create({ username, password }).then(function (result) {
    console.log(result);
    result
      ? res.json({ msg: "admin created successfully" })
      : res.json({ msg: "found error" });
  });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  Course.create({ title, description, price, imageLink }).then(function (
    result
  ) {
    console.log(result);
    result
      ? res.json({ msg: "course created successfully", courseId: result._id })
      : res.status(403).json({ msg: "found error" });
  });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find().then(function (result) {
    result ? res.json(result) : res.json({ msg: "no courses found" });
  });
});

module.exports = router;
