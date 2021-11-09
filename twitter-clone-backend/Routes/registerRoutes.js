const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const {check, validationResult} = require("express-validator");
const User = require("../Schemas/UserSchema")
const bcrypt = require("bcrypt")

app.use(bodyParser.urlencoded({extended: false}))

router.get("/", (req, res, next) => {
    console.log("Registration entered")
    res.status(200).write("Registration");
    return res.end();
})

router.post("/", 
    check("firstName", "First Name is requires").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("userName", "User Name is required").not().isEmpty(),
    check("email", "Please Enter a Valid email address").isEmail(),
    check("password", "Please enter a valida password with a minimum length of 5 characters").isLength({ min: 5 })
    ,async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            let firstName = req.body.firstName.trim();
            let lastName = req.body.lastName.trim();
            let userName = req.body.userName.trim();
            let email = req.body.email.trim();
            let password = req.body.password;
            let profilePic = req.body.profilePic;
            const payload = req.body;
            console.log(req.body);
            const user = await User.findOne({
                $or:[
                    {userName : userName},
                    {email: email}
                ]
            })
            if(user == null){
                console.log(user)
               let nuser = new User({
                    firstName,
                    lastName,
                    userName,
                    email,
                    password
                })
                nuser.password = await bcrypt.hash(nuser.password, 10);
                User.create(nuser, ()=>{
                    req.session.user = nuser;
                    console.log(req.session)
                })
            } else{
                if(email == user.email){
                    return res.status(403).json({error : "Email Id already used"})
                } else if (userName == user.userName){
                    return res.status(403).json({error : "User name is already taken"})
                }
            }
            return res.status(201).send({msg: "User registered successfully"});
            //res.status(200).write("Registration");
            //return res.end();
        } catch(err){
            console.log(err);
            return res.status(500).send("Server Error, please try again after sometime!!")
        }
    })
module.exports = router