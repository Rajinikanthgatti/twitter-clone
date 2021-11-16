const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../Schemas/UserSchema")
const Post = require("../../Schemas/PostSchema")
const middleware = require("../../middleware")
const {check, validationResult} = require("express-validator");
const Chart = require("../../Schemas/ChartSchema");
const Message = require("../../Schemas/MessageSchema");

app.use(bodyParser.urlencoded({extended: false}))

//Add charts to the DB
router.post("/", async (req, res, next) => {
    if(!req.body.content || !req.body.chartId){
        return res.status(400).send("Invalid data passed");
    }
    var newMessage = {
        sender : req.session.user._id,
        content: req.body.content,
        chart : req.body.chartId
    }
    try {
        const result = await Message.create(newMessage);
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send("Error in fetching the messages");
    }
})

module.exports = router