const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../Schemas/UserSchema")
const Post = require("../../Schemas/PostSchema")
const middleware = require("../../middleware")
const {check, validationResult} = require("express-validator");

app.use(bodyParser.urlencoded({extended: false}))

router.get("/", async (req, res, next) => {
    try {
        let result = await Post.find().populate({path: "postedBy", select: "-password"}).sort({"createdAt": -1});
        console.log(result)
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Error while retrieving the data"});
    }
})

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
            Post.create(postData).then(async newPost => {
                newPost = await User.populate(newPost, {path: "postedBy", select: "-password"});
                res.status(201).send(newPost)
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send("Server Error, please try again after sometime!!")
        }
})
//Liking or unliking a post
router.put("/:id/like", async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.user._id;
    const isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    const option = isLiked ? "$pull" : "$addToSet";
    console.log(isLiked)
    console.log(option)
    let result = null;
    let post = null;
    try{
        result = req.session.user = await User.findByIdAndUpdate(userId, {[option] : {likes : postId}}, {new : true})
        post = await Post.findByIdAndUpdate(postId, {[option] : {likes : userId}}, {new : true})
        res.status(200).send(post);
    }catch{
        res.status(400).send("Error liking the post");
    }
})

module.exports = router