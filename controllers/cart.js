const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");

const addCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  const cartObject = await Cart.findOne({ user: user._id });

  //   console.log(user._id);
  await Product.create({
    name: req.body.name,
    price: req.body.price,
    color: req.body.color,
    size: req.body.size,
    quantity: req.body.quantity,
    backImage: req.body.backImage,
    frontImage: req.body.frontImage,
    user: user._id, // this is the user id
  })
    .then((product) => {
      if (cartObject) {
        cartObject.cart.push(product);
        cartObject.save();
        return res.status(200).json({
          data: { cartLength: cartObject.cart.length }, // this is the cart length of the user
          message: "Product added to cart",
        });
      }
      Cart.create({
        user: user._id,
        cart: [
          {
            productId: product._id,
            name: req.body.name,
            price: req.body.price,
            color: req.body.color,
            size: req.body.size,
            quantity: req.body.quantity,
            backImage: req.body.backImage,
            frontImage: req.body.frontImage,
          },
        ],
      });

      return res.status(200).json({
        data: cartObject.cart.length, // this is the cart length of the user
        message: "Product added to cart",
      });
    })
    .catch((err) => {
      if (err.message.includes("Product validation failed")) {
        return res.status(400).json({
          message: "Select color before adding to cart",
        });
      }
      res.status(400).json({
        message: err.message,
        // message: "Product could not be added to cart",
      });
    });
};

const getCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  const cartObject = await Cart.findOne({ user: user._id });
  if (cartObject) {
    return res.status(200).json({
      data: { items: cartObject, cartLength: cartObject.cart.length },
      message: "Cart retrieved successfully",
    });
  }
  return res.status(200).json({
    data: { cartLength: 0 },
    message: "Cart is empty",
  });
};

module.exports = { addCart, getCart };
