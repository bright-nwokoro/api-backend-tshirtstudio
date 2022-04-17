const User = require("../models/user");
const { generateToken } = require("../utils/token");

const join = async (req, res) => {
  await User.create({
    name: req.body.Name,
    email: req.body.Email,
    phone: req.body.Phone,
    password: req.body.Password,
  })
    .then((user) => {
      generateToken(user._id);
      // res.set("Authorization", `Bearer ${generateToken(user._id)}`);
      res.cookie("Authorization", `${generateToken(user._id)}`, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      return res.status(200).json({
        status: "success",
        message: "User created successfully \nRedirecting to sign-in page...",
        // data: user,
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Email already exists \nKindly use another email",
        });
      }
      res.json(error);
    });
};

module.exports = join;
