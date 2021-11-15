const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChartSchema = new Schema({
    chartName:{
        type: String,
        trim: true
    },
    isGroupChart: {
        type: Boolean,
        default: false
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    latestMessaes: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    }
}, { timestamps: true })

var Chart = mongoose.model("Chart", ChartSchema);
module.exports = Chart;