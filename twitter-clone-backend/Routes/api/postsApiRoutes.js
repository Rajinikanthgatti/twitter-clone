const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../Schemas/UserSchema")
const middleware = require("../../middleware")

app.use(bodyParser.urlencoded({extended: false}))

router.get("/", (req, res, next) => {
    console.log("Login entered")
    res.status(200).send("Login Page");
})

router.post("/", middleware.requireLogin ,(req, res, next) => {
    res.statusCode(200).send("Posts API");
})

module.exports = router