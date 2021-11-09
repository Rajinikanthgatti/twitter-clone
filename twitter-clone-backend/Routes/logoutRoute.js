const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))

router.get("/", (req, res, next) => {
    if(req.session && req.session.user){
        req.session.destroy(() => {
            console.log("Logged out the user");
            return res.redirect("/");
        })
    } else{
        return res.status(403).redirect("/");
    }
    //res.status(200).send("Login Page");
})

module.exports = router