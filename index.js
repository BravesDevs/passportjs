//Imports
const express = require('express');
const app = express();
// const cors = require('cors');
// const bodyparser = require('body-parser');
// const { json } = require('body-parser');
const passport = require('passport');

//Dot ENV Configuration
require('dotenv').config()


const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Middleware

app.use(passport.initialize()) // init passport on every route call

const authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, authUser));


//Start the NODE JS server
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}...`))

const authorizeToken = (req, res, next) => {
    console.log(req.user)
    res.status(200).json({
        "ok": true,
        "message": `Welcome aboard!! ${req.user.displayName}`
    })
}

app.get('/google', passport.authenticate('google', { session: false, scope: ['email', 'profile'] }));

app.get('/google/callback', passport.authenticate('google', { session: false }), authorizeToken);