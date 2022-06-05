//Imports
const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const { json } = require('body-parser');
const passport = require('passport');

//Passport Setup Config
require('./passport')

//Dot ENV Configuration
require('dotenv').config()


//Middlewares
app.use(passport.initialize())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


//Endpoints
app.get('/', (req, res, next) => {
    res.status(200), json({
        'ok': true,
        'message': 'Welcome to OAuth Demonstration.'
    })
})

app.get('/success', (req, res, nex) => {
    res.status(200), json({
        'ok': true,
        'message': `Welcome ${req.user.email}`
    })
})

app.get('/failed', (req, res, next) => {
    res.status(500), json({
        'ok': false,
        'message': 'Connect Failed.'
    })
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/success');
});

app.listen(process.env.PORT, () => console.log(`Server started listening in ${process.env.PORT}`))