const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
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
module.exports = router