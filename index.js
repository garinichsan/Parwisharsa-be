const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');

const passport = require('passport');
var cookieSession = require('cookie-session');
require('./passport-setup');

const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ['http://localhost:3000','https://garinichsan.github.io'],
  credentials: true
}

app.use(cors(corsOptions));

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// DB congig
const db_link = "mongodb+srv://garin:kapalair@cluster0.ggvbv.mongodb.net/parwisharsa";

// Connect to MongoDB
mongoose.connect( db_link, { useNewUrlparser: true } )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
//

// cookies session
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// check function
const isLoggedIn = (req, res, next) => {
  if (req.user){
    next();
  } else {
    res.status(200).json({
      authenticated: false,
      mesaage: "user has not been authenticated"
    });
  }
}

// OAuth Config 
app.use(passport.initialize());
app.use(passport.session());

// Route
app.get('/', (req, res) => res.send(`Expres is Live!`));
app.get('/session', isLoggedIn, (req, res) => res.status(200).json({
  authenticated: true,
  message: "user authenticated successfully!",
  user: req.user,
  cookies: req.cookies
}));
app.get('/google/failure', (req, res) => res.send(`You failed to log in!`));
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect(config.FRONTEND);
});

app.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

// Google OAuth2
app.get( '/google/callback', passport.authenticate( 'google', {
        successRedirect: config.FRONTEND,
        failureRedirect: '/google/failure'
}));


// API Routes
let apiRoutes = require("./api-routes")
app.use('/api', apiRoutes)

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));


