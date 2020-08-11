const express = require('express')
const router = express.Router()
const Task = require('../models/Tasks')
const Points = require('../models/Points')


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
    console.log("entro en change_progress",response)
    if (stateProgress === "completed") {
        console.log("entro en stateProgress es completed para sumar los puntos")
        const responsePoints = await Points.findById({userId: req.user._id})
        console.log("valor task", Task.value)
        console.log("responsePoints", responsePoints)
        
    }
    // { n: 1, nModified: 1, ok: 1 }
    return response.n === 1 && response.ok === 1 ? res.status(200).json() : res.status(500).json({error: "can´t change the task progress, sorry"})
})


module.exports = router

