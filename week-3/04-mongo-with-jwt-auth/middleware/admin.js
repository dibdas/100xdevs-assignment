// Middleware for handling auth
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const { Admin } = require("../db");
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  const token = req.headers.authorization.split(" ")[1];
  const verrifyToken = jwt.verify(token.jwtPassword);
  verrifyToken ? next() : res.json({ msg: "you are not authorized" });
}

module.exports = adminMiddleware;
