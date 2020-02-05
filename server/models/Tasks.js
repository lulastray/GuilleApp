const mongoose = require('mongoose')
const Schema = mongoose.Schema


const taskSchema = new Schema ({
    name : String,
    description : String,
    periodicity: {
        type: String,
        enum: ["daily", "weekend"]
    },
    time : {
        type : String,
        enum:["morning", "afternoon"]
    },
    value : Number
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task