const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
// function restrictToLogin(token){
//     return jwt.verify(token, SECRET)
// }

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.uid;
    if (!token) {
        console.log(token)
      return res
        .status(401)
        .json({ message: "Unauthorized (token not found)" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({message : 'Invalid Token'})
  }
};

module.exports = authenticate
