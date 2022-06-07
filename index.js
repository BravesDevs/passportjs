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
require('./passport')
app.use(passport.initialize()) // init passport on every route call


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