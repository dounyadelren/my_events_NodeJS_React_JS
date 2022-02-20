const express = require('express')
const bodyParser = require('body-parser')
const middleware = require('./middleware')
const cors = require('cors')
const path = require('path')
const app = express()
const apiPort = 8000
const session = require("express-session");
require('dotenv').config({path: '.env'})
require('./config/db');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false,
}))

const loginFbRoute = require('./Routes/loginFbRoutes')
const descRoute = require('./Routes/descRoutes');
const eventRoute = require('./Routes/eventRoutes');
const getEvent = require('./Routes/getEvents');
const logout = require('./Routes/logoutRoutes');
const getUsers = require('./Routes/getUsersRoutes');
const chat = require('./Routes/chatRoutes');

app.use("/loginFb", loginFbRoute);
app.use("/update", descRoute);
app.use("/add_event", eventRoute);
app.use("/get_event", getEvent);
app.use("/logout", logout);
app.use("/get_users", getUsers);
app.use("/chat", chat);

app.get('/',  middleware.requireLogin, (req, res) => {

    var playload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    }

    res.status(200).render('/login', playload)
})

app.listen(apiPort, () => console.log(`Server running on port http://localhost:${apiPort}`))
