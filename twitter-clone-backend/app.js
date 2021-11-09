const express = require("express");
const app = express();
const port = 3005;
const middleware = require("./middleware")
const bodyParser = require("body-parser");
const mongoose = require("./database");  //Connects to the MongoDB database
const session = require("express-session");

const server = app.listen(port, () => {console.log("Server running")})
app.use(bodyParser.urlencoded({extended: false}))

//Routes
const loginRoutes = require("./Routes/loginRoutes")
const registerRoutes = require("./Routes/registerRoutes")
const logoutRoute = require("./Routes/logoutRoute")

app.use(session({
    secret: "session secretkey",
    resave: true,
    saveUninitialized: false
}))

app.use("/login", loginRoutes)
app.use("/register", registerRoutes)
app.use("/logout", logoutRoute)

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        userLoggedIn: req.session.user
    }
    console.log("Home page")
    res.status(200).send("At Home page");
})