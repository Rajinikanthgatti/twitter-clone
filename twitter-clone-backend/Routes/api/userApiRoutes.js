const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({dest : "uploads/"});
const path = require("path");
const fs = require("fs");
const {check, validationResult} = require("express-validator");
const User = require("../../Schemas/UserSchema")

app.use(bodyParser.urlencoded({extended: false}))

//Follow a user
router.put("/:userId/follow", async (req, res, next) => {
    try {
        var userId = req.params.userId;
        var user = await User.findById(userId);
        if(user == null){
            return res.status(400).send({msg : 'User not found'})
        }
        var isFollowing = user.following && user.followers.includes(req.session.user._id);
        const option = isFollowing ? "$pull" : "$addToSet";
        //updating the following attribute
        req.session.user = await User.findByIdAndUpdate(req.session.user._id, { [option] : {following : userId}}, {new : true})
        //updating the followers array of the user that is being followed
        await User.findByIdAndUpdate(userId, {[option] : {followers : req.session.user._id}})
        res.status(200).send(req.session.user);
    } catch (error) {
        return res.status(400).send({msg : 'Session Error'})
    }
})

//List of following users
router.get("/:userId/following", async (req, res, next) => {
    try {
        var userId = req.params.userId;
        var user = await User.findById(userId).populate({path: "following", select: "-password"});
        res.status(200).send(user);
    } catch (error) {
        return res.status(400).send({msg : 'Session Error'})
    }
})

//List of followers users
router.get("/:userId/followers", async (req, res, next) => {
    try {
        var userId = req.params.userId;
        var user = await User.findById(userId).populate({path: "followers", select: "-password"});
        res.status(200).send(user);
    } catch (error) {
        return res.status(400).send({msg : 'Session Error'})
    }
})

//Updating the profilePicture
router.post("/profilePicture", upload.single("croppedImage"), async (req, res, next) => {
    if(!req.file){
        console.log("No File was uploaded")
        return res.status(400).send({error : "Please upload an image"})
    }
    var filePath = `/uploads/images/${req.file.filename}.png`
    var tempPath = req.file.path;
    console.log(tempPath)
    var targetPath = path.join(__dirname, `../../${filePath}`);
    fs.rename(tempPath, targetPath, async err => {
        if(err){
            res.status(400).send({error : err})
        }
        req.session.user = await User.findByIdAndUpdate(req.session.user._id, { profilePic: filePath}, {new : true})
        res.status(200).send(req.session.user)
    })
})
module.exports = router