const express = require("express");
const app = express();
const port = 3005;
const middleware = require("./middleware")
const bodyParser = require("body-parser");
const mongoose = require("./database");  //Connects to the MongoDB database
const session = require("express-session");

const server = app.listen(port, () => {console.log("Server running")})
//app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({extended: false}))

//Routes
const loginRoutes = require("./Routes/loginRoutes")
const registerRoutes = require("./Routes/registerRoutes")
const logoutRoute = require("./Routes/logoutRoute")
const searchRoute = require("./Routes/searchRoutes")

//API Routes
const postsApiRoutes = require("./Routes/api/postsApiRoutes")
const profileApiRoutes = require("./Routes/api/profileApiRoutes")
const userApiRouters = require("./Routes/api/userApiRoutes")
const uploadApiRouters = require("./Routes/api/uploadApiRoutes")
const chartApiRouters = require("./Routes/api/chartsApiRouters")

app.use(session({
    secret: "session secretkey",
    resave: true,
    saveUninitialized: false
}))

app.use("/login", loginRoutes)
app.use("/register", registerRoutes)
app.use("/logout", logoutRoute)
//Api
app.use("/api/posts", postsApiRoutes)
app.use("/profile", profileApiRoutes)
app.use("/api/users", userApiRouters)
app.use("/uploads", uploadApiRouters)
app.use("/search", searchRoute)
app.use("/api/charts", chartApiRouters)

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        userLoggedIn: req.session.user
    }
    console.log("Home page")
    res.status(200).send("At Home page");
})