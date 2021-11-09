const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("Login entered")
    return res.status(200);
})

module.exports = router