const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    req.jwt = token;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
  };
  const options = {
    expiresIn: "1d",
    issuer: "tshirtstudio test projejct",
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, options);
};

const setAuthHeaders = (res, req, next) => {
  res.set("Authorization", req.jwt);
  res.set("Access-Control-Expose-Headers", "Authorization");

  next();
};

module.exports = {
  authToken,
  generateToken,
  setAuthHeaders,
};
