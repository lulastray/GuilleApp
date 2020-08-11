const mongoose = require('mongoose')
const Schema = mongoose.Schema


const taskSchema = new Schema ({
    creatorID: { type: Schema.Types.ObjectId, ref: 'User' },
    name : String,
    description : String,
    periodicity: {
        type: String,
        enum: ["daily", "weekly"]
    },
    stateProgress: {
        type: String,
        enum: ["inProgress", "completed", "deleted"],
        default: "inProgress"
    },
    value : Number
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task
