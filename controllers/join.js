const User = require("../models/user");
const { generateToken } = require("../utils/token");

const join = async (req, res) => {
  await User.createUser({
    name: req.body.Name,
    email: req.body.Email,
    phone: req.body.Telephone,
    password: req.body.Password,
  })
    .then((user) => {
      generateToken(user._id);
      res.set("Authorization", generateToken(user._id));
      res.set("Access-Control-Expose-Headers", "Authorization");
      res.redirect("/");
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = join;
