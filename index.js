const express = require("express");
const bodyParser = require("body-parser");
// const path = require('path');
const helmet = require("helmet");
const stripe = require("stripe")("SECRET_KEY");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const homeRoute = require("./routes/home");
const joinRoute = require("./routes/join");
const signInRoute = require("./routes/sign-in");
// const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    exposedHeaders: 'Authorization',
    credentials: true,
  })
);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", homeRoute);
app.use("/api/v1/join", joinRoute);
app.use("/api/v1/sign-in", signInRoute);
app.use("/api/v1/cart", cartRoute);

// app.use("/api/v1/product", productRoute);

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB = DB_URI.replace("<password>", DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log("DB is now running");
});

const port = PORT || 3100;
app.listen(port, () => console.log(`Server is running on port ${port}`));
