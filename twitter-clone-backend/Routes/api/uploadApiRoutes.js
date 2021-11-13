const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const {check, validationResult} = require("express-validator");
const User = require("../../Schemas/UserSchema")
const path = require("path")

app.use(bodyParser.urlencoded({extended: false}))

//fetching the profile picture
router.get("/images/:path", async (req, res, next) => {
    try {
       return res.sendFile(path.join(__dirname, "../../uploads/images/" + req.params.path));
    } catch (error) {
        res.status(400).send({error : "Error fetching the image"})
    }
    console.log("Profile Page")
    res.status(200).send("Profile page");
})

module.exports = router