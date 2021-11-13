const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const {check, validationResult} = require("express-validator");
const User = require("../Schemas/UserSchema")
const Post = require("../Schemas/PostSchema")
const bcrypt = require("bcrypt")

app.use(bodyParser.urlencoded({extended: false}))

//Searching in users
router.get("/users", async (req, res, next) => {
    try{
        const query = req.query.query;
        console.log(query)
        const result = await User.find({
            $or:[
                {firstName : { $regex : query, $options: "i"}},
                {lastName : { $regex : query, $options: "i"}},
                {userName : { $regex : query, $options: "i"}}
            ]
        })
        console.log(result)
        return res.status(200).send(result);
    }catch(error){
        return res.status(200).send({error : error});
    }
})

//Searching in posts
router.get("/posts", async (req, res, next) => {
    try{
        const query = req.query.query;
        console.log(query)
        const result = await Post.find({
            $or:[
                {content : { $regex : query, $options: "i"}}
            ]
        })
        console.log(result)
        return res.status(200).send(result);
    }catch(error){
        return res.status(200).send({error : error});
    }
})

router.get("/", (req, res, next) => {
    var payload = createPayLoad(req.session.user);
    //console.log(payload)
    return res.status(200).send("Search");
})
router.get("/:selectedTab", (req, res, next) => {
    var payload = createPayLoad();
    payload.selectedTab = req.params.selectedTab
    res.status(200).write("SearchTab");
})
function createPayLoad(userLoggedIn){
    return{
        userLoggedIn : userLoggedIn,
        userLoggedInJs : JSON.stringify(userLoggedIn)
    };
}
module.exports = router