var GoogleStrategy = require("passport-google-oauth20").Strategy;
var GoogleTokenStrategy = require("passport-google-token").Strategy;
const User = require("../models/User");
var bcrypt = require("bcrypt");
const saltRounds = 10;

async function authenticateGoogleUser(user) {
  try {
    const userInDb = await User.findOne({ username: user.username });
    if (userInDb) {
      return userInDb;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

function passportConfig(passport) {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
      async function (accessToken, refreshToken, profile, done) {
        const username = profile.emails[0].value;
        const googleId = profile.id;

        const user = await authenticateGoogleUser({ username, googleId });
        console.log("auth result " + user);

        if (!user) {
          const newUser = new User({
            username: username,
            googleId: googleId,
          });

          newUser.save((err, user) => {
            if (err) {
              console.log(err);
            } else {
              console.log("user created:" + user);
              return done(null, user);
            }
          });
        } else return done(null, user);
      }
    )
  );
}
module.exports = passportConfig;
