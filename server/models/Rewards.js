const mongoose = require ('mongoose')
const Schema = mongoose.Schema


const rewardSchema = new Schema({
    creatorID: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    value: Number,
    exchanged: {
        type: Boolean,
        default: false
    },
    deleted:{
        type: Boolean,
        default: false
    }
})

const Rewards = mongoose.model('Reward', rewardSchema)
module.exports = Rewards