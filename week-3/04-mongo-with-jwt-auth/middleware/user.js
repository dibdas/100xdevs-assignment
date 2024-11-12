const { User } = require("../db");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;
  console.log(username);
  console.log(password);
  User.findOne({ username: username, password: password }).then(function (
    result
  ) {
    console.log(result);
    result ? next() : res.status(403).json({ msg: "user does exist" });
  });
}

module.exports = userMiddleware;
