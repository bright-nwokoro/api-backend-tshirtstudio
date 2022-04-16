const home = (req, res) => {
  res.json({
    message: "Welcome to the backend of tshirtstudio application!",
  });
};

module.exports = home;