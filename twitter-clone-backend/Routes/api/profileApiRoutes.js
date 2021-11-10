const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const {check, validationResult} = require("express-validator");
const User = require("../../Schemas/UserSchema")

app.use(bodyParser.urlencoded({extended: false}))

router.get("/:username", async (req, res, next) => {
    try {
        const userName = req.params.username
        var result = await User.findOne({userName})
        if(result == null){
            return res.status(404).send({error : "User not found"})
        } else {
            return res.status(200).send(result)
        }
    } catch (error) {
        res.status(400).send({error : "Error fetching the user"})
    }
    console.log("Profile Page")
    res.status(200).send("Profile page");
})

module.exports = router