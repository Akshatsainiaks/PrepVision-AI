// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// module.exports = async function (req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;

//     // No token passed
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];
//     const secret = process.env.JWT_SECRET;

//     // Token decode
//     const decoded = jwt.verify(token, secret);

//     // Fetch user
//     const user = await User.findById(decoded.id).select("-passwordHash");
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("AUTH ERROR:", err.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };


const jwt = require("jsonwebtoken");
const User = require("../models/User");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
