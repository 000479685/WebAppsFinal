const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,        
        unique : true        
    },
    expense:
    {
        type: String,
        required: true,        
    },
    date:
    {
        type: String,
        required: true
    },
    reason:
    {
        type: String,
        required: true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: "TrackerUser",
        required: true
    }
},{timestamps:true})

const TrackerModel = mongoose.model('IntroWebAppsFinalTracker', TrackerSchema);

module.exports = TrackerModel;