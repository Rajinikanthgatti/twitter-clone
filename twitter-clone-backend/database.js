var mongoose = require('mongoose');

class Database {
    constructor(){
        this.connect();
    }
    connect() {
        mongoose.connect("mongodb+srv://<UserName>:<Password>@twitterclonecluster.ycsus.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority")
        .then(()=>{
            console.log("Successfully connected to DB")
        }).catch(()=>{
            console.log("Error Connecting to DB")
        })
    }
}
module.exports = new Database();