const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PointSchema = new Schema ({
    points: Number,
    userId:  { type: Schema.Types.ObjectId, ref: 'User' }
})

const Points = mongoose.model('Points', PointSchema)
module.exports = Points