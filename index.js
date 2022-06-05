//Imports
const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const { json } = require('body-parser');
require('dotenv').config()


//Middlewares
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


//Endpoints
app.get('/', (req, res, next) => {
    res.status(200), json({
        'ok': true,
        'message': 'Welcome to OAuth Demonstration.'
    })
})

app.listen(process.env.PORT, () => console.log(`Server started listening in ${process.env.PORT}`))