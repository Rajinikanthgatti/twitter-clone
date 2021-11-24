const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const middleware = require("../../middleware")
const {check, validationResult} = require("express-validator");
const Chart = require("../../Schemas/ChartSchema")

app.use(bodyParser.urlencoded({extended: false}))

//Add charts to the DB
router.post("/", async (req, res, next) => {
    if(!req.body.users){
        return res.status(400).send("User details are not provided");
    }
    var users = JSON.parse(req.body.users)
    if(users.length == 0){
        return res.status(400).send("User details are not provided");
    }
    var chartData = {
        users: users,
        isGroupChart: true
    };
    try {
        await Chart.create(chartData)
    } catch (error) {
        return res.status(500).send("Error in the chart room");
    }
})

//get charts data
router.get("/", async (req, res, next) => {
    try {
        const result = await Chart.find({users : { $elemMatch : { $eq : req.session.user._id}}})
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({err : error})
    }
})

module.exports = router