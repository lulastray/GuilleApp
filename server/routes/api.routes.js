const express = require('express')
const router = express.Router()
const Task = require('../models/Tasks')
const Points = require('../models/Points')
const Rewards = require('../models/Rewards')
const { response } = require('express')


router.post('/new_task', (req, res) => {
    
    const newTask = { creatorId, name , description, periodicity, time} = req.body
// validar que no venga vacios los campos obligatorios
    Task.create(newTask)
        .then(createdTask => {
            console.log("task created", createdTask)
            res.status(200).json(createdTask)
        })
        .catch(error => {
            console.log("can´t create a new task", error)
            res.status(500).json({error:"can´t create a new task"})
            
        })

})

router.get("/all_tasks", (req, res) => {
    Task.find({creatorID: req.user._id})
    .then(allTasks => {
        // console.log("all tasks", allTasks)
        return res.json(allTasks)
    })
    .catch(err => res.status(500).json({err: "can´t get all tasks"}))
})

router.post("/change_progress", async (req, res) => {
    const { id, stateProgress} = req.body
    const response = await Task.update({ _id: id}, { stateProgress: stateProgress})
    if (response.ok !== 1 || response.n !== 1){
        return  res.status(500).json({error: "can´t change the task progress, sorry"})
    }

    const responseTask = await Task.findById(id)
    

    const responsePoints = await Points.find({userId: req.user._id})

    if (stateProgress === "completed") {

        const sumPoints = await Points.update({points: responsePoints[0].points += responseTask.value})
        
        return sumPoints.n === 1 && sumPoints.ok === 1 ? res.status(200).json() : res.status(500).json({error: "can´t sume points, sorry"})
} else {
        
        const minusPoints = await Points.update({points: responsePoints[0].points -= responseTask.value})
        return minusPoints.n === 1 && minusPoints.ok === 1 ? res.status(200).json() : res.status(500).json({error: "can´t substract points, sorry"})

    }
})


//RUTAS REWARDS
router.post('/new_reward', async (req, res) => {
    
    const newReward = { creatorId, name, value} = req.body
    console.log(newReward)
// validar que no venga vacios los campos obligatorios
    try {
        const createdReward = await Rewards.create(newReward)
        console.log(createdReward)
        return res.status(200).json(newReward)
    }catch(error) {
        console.log(error)
        return res.status(500).json({error: "can´t creat a new reward"})
    }
    
})

router.get('/all_rewards', async (req, res) => {
    try {
        const allRewards = await Rewards.find({creatorID: req.user._id})
        console.log(allRewards)
        return res.status(200).json(allRewards)

    }catch(error){
        console.log(error)
        return res.status(500).json({error: "can´t find any rewards"})
    }

})

router.post('/remove_reward', async (req, res) => {
    console.log(req.body)
    const {id, deleted} = req.body

    console.log("id", id)
    console.log("deleted", deleted)
    const response = await Rewards.update({_id: id}, {deleted: deleted})
    response.ok === 1 || response.n === 1 ? res.status(200).json() : res.status(500).json({error: "can´t delete this reward, sorry"})
    

})

router.post('/exchange_reward', async (req, res) => {

    const { id } = req.body
    const valueReward = await Rewards.findById(id)
    console.log("value Reward", valueReward.value)
    const responsePoints = await Points.find({userId: req.user._id})

    const substractPoints = responsePoints[0].points - valueReward.value
    
    if (substractPoints >= 0) {
        const exchangePoints = await Points.update({points : substractPoints})
        if(exchangePoints.ok === 1 || exchangePoints.n === 1){
            const responseExchangedReward = await Rewards.update({_id: id}, {exchanged: true})
            if (responseExchangedReward .ok === 1 || responseExchangedReward .n === 1) {
                res.status(200).json()
            }else {
                res.status(500).json({error: "can´t exchange this reward, sorry"})
            }
        }else {
            res.status(500).json({error: "something went wrong with your points, sorry"})
        }
            
    } else {
        return res.status(403).json({error: "You don´t have enough points to exchange this reward, sorry"})

    }
    

} )


module.exports = router

