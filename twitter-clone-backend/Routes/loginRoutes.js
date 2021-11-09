const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const {check, validationResult} = require("express-validator");
const User = require("../Schemas/UserSchema")
const bcrypt = require("bcrypt")

app.use(bodyParser.urlencoded({extended: false}))

router.get("/", (req, res, next) => {
    console.log("Login entered")
    res.status(200).send("Login Page");
})

router.post("/",
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Please enter a password").exists()
    ,async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: [{ msg: "Invalid username or password" }] })
        }
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                $or:[
                    {userName : email},
                    {email : email}
                ]
            })
            if (!user) {
                res.status(400).json({ error: [{ msg: "Invalid user name or password" }] });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                res.status(400).json({ error: [{ msg: "Invalid user name or password" }] });
            }
            console.log(user);
            req.session.user = user;
            console.log(req.session.user)
            res.redirect("/");
        } catch (error) {
            console.log({ error })
        }
    return res.status(200);
})

module.exports = router