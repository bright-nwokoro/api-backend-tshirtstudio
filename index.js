const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const stripe = require('stripe')('SECRET_KEY');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const homeRoute = require('./routes/home');
const joinRoute = require('./routes/join');
const signInRoute = require('./routes/sign-in');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// app.use(express.static(path.join(__dirname, './views')));

app.use('/', homeRoute)
app.use("api/v1/join", joinRoute);
app.use("api/sign-in", signInRoute);

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB = DB_URI.replace("<password>", DB_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log("DB is now running");
  });

const port = PORT || 3100;
app.listen(port, () => console.log('Server is running...'));