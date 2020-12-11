const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
var cookieSession = require('cookie-session');
require('./passport-setup');

const cors = require("cors");

const app = express();

var corsOptions = {
  origin: 'https://localhost:3000/',
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
    res.sendStatus(401);
  }
}

// OAuth Config 
app.use(passport.initialize());
app.use(passport.session());

// Route
app.get('/', (req, res) => res.send(`Expres is Live! \n You're not loggedin!`));
app.get('/google/success', (req, res) => res.send(`Hello ${req.user.name}!`));
app.get('/google/failure', (req, res) => res.send(`You failed to log in!`));
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

app.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

// Google OAuth2
app.get( '/google/callback', passport.authenticate( 'google', {
        successRedirect: '/google/success',
        failureRedirect: '/google/failure'
}));


// API Routes
let apiRoutes = require("./api-routes")
app.use('/api', apiRoutes)

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));


