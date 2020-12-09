const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
User = require('./userModel');

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
    callbackURL: "http://localhost:8000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id, name: profile.displayName, email: profile.email }, function (err, user) {
      return done(err, user);
    });
  }
));