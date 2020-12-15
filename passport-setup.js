const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
User = require('./userModel');

const config = require('./config');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
});

passport.use(new GoogleStrategy({
    clientID:     "1037088497351-p2d2o1u3340u1p4j145njg3l3ptj756i.apps.googleusercontent.com",
    clientSecret: "94iMXniXdtUZ7qT368HfgzIr",
    callbackURL: config.BACKEND + "google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ email: profile.email }, function (err, user) {
      user.name = profile.displayName,
      user.picture = profile.picture;
      user.save();
      return done(err, user);
    });
  }
));