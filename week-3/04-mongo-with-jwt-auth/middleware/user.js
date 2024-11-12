const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  const token = req.headers.authorization.split(" ")[1];
  // const verifyToken = jwt.verify(token, jwtPassword);
  // console.log(verifyToken);
  const decodeToken = jwt.decode(token, jwtPassword);
  console.log(decodeToken);
  // verify and decode is same
  console.log("decodeToken.username", decodeToken.username);
  // req.headers.username = decodeToken.username;
  or;
  req.username = decodeToken.username;
  decodeToken ? next() : res.json({ msg: "you are not authorized" });
}

module.exports = userMiddleware;
