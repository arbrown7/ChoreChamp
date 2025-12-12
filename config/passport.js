const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.AUTH0_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      state: false // optional — depends on your setup
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      return done(null, profile);
    }
  )
);

// save the whole user object in the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// restore it from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
