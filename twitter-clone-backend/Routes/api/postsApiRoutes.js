const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../Schemas/UserSchema")
const Post = require("../../Schemas/PostSchema")
const middleware = require("../../middleware")
const {check, validationResult} = require("express-validator");

app.use(bodyParser.urlencoded({extended: false}))

//Get all the posts
router.get("/", async (req, res, next) => {
    try {
        let result = await Post.find().populate({path: "postedBy", select: "-password"}).populate({path: "retweetData", select: "-password"}).sort({"createdAt": -1});
        result = await User.populate(result, {path: "retweetData.postedBy"})
        console.log(result)
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Error while retrieving the data"});
    }
})

//Get a single post
router.get("/:id", async (req, res, next) => {
    const id = req.params.id
    try {
        let result = await Post.findOne({id}).populate({path: "postedBy", select: "-password"}).populate({path: "retweetData", select: "-password"}).sort({"createdAt": -1});
        result = await User.populate(result, {path: "retweetData.postedBy"})
        console.log(result)
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Error while retrieving the data"});
    }
})

//Adding a post
router.post("/", 
    middleware.requireLogin, 
    check("content", "Post data can't be empty").not().isEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            var postData = {
                content: req.body.content,
                postedBy: req.session.user
            }
            if(req.body.replyTo != null){
                postData.replyTo = req.body.replyTo
            }
            await Post.create(postData).then(async newPost => {
                newPost = await User.populate(newPost, {path: "postedBy", select: "-password"});
                res.status(201).send(newPost)
            })
        } catch (error) {
            return res.status(500).send("Server Error, please try again after sometime!!")
        }
})

//Liking or unliking a post
router.put("/:id/like", async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.user._id;
    const isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    const option = isLiked ? "$pull" : "$addToSet";
    let result = null;
    let post = null;
    try{
        //Adding postid to the user schema to identify the posts added by the user
        result = req.session.user = await User.findByIdAndUpdate(userId, {[option] : {likes : postId}}, {new : true})
        //Adding userId to the post schema to identify the user who liked the post
        post = await Post.findByIdAndUpdate(postId, {[option] : {likes : userId}}, {new : true})
        res.status(200).send(post);
    }catch{
        res.status(400).send("Error liking the post");
    }
})

//Retweeting the post
router.put("/:id/retweet", async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.user._id;
    let result = null;
    let post = null;
    console.log('---------------------')
    console.log(postId)
    console.log(userId)
    try{
        //Check if the post is already retweeted, if yes delete the retweet else retweet
        var deletedPost = await Post.findOneAndDelete({postedBy:userId, retweetData: postId})
        const option = deletedPost != null ? "$pull" : "$addToSet";
        console.log(deletedPost)
        if(deletedPost == null){
            //If tweet is not retweet add the tweet to Posts data
            await Post.create({postedBy: userId, retweetData: postId});
        }
        //Adding postid to the user schema to identify the posts that user retweeted
        req.session.user = await User.findByIdAndUpdate(userId, {[option] : {retweets : postId}}, {new : true})
        //Adding userId to the post schema to identify the tweets that are retweeted by the user
        post = await Post.findByIdAndUpdate(postId, {[option] : {retweetUsers : userId}}, {new : true})
        console.log(post)
        res.status(200).send(post);
    }catch{
        res.status(400).send("Error retweeting the post");
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        return res.sendStatus(202);  
    } catch (error) {
        console.log(error)
        res.status(400).send({error : "Error deleting the post"})
    }
})

module.exports = router