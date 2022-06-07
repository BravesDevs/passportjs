const passport = require('passport');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.serializeUser((user, done) => {
//     done(null, user)
// })

// passport.deserializeUser((user, done) => {
//     done(null, done)
// })

// passport.use(new GoogleStrategy({
//     clientID: process.env.OAUTH_CLIENT_ID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/google/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(null, profile);
//         // });
//     }
// ));

const authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}


passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, authUser));