const User = require("../models/user");
const bcrypt = require("bcrypt");

const { generateToken } = require("../utils/token");

const signIn = async (req, res) => {
  const authHeader = req.headers["Authorization"];
  if (authHeader !== undefined) {
    return res.json({ message: "User already logged in" });
  }

  const Email = req.body.Email;
  const Password = req.body.Password;

  const user = await User.findOne({ email: Email });

  if (!user) {
    return res.status(400).json({
      data: "",
      message: "Username does not exist",
    });
  }

  if (await bcrypt.compare(Password, user.password)) {
    // res.set("Authorization", `Bearer ${generateToken(user._id)}`);
    res.cookie("Authorization", `${generateToken(user._id)}`, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    res.status(200).json({
      data: "",
      message: "User login successful",
    });
  } else {
    res.status(400).json({ data: "", message: "Invalid password" });
  }
};

module.exports = signIn;
