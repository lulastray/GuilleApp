const express = require('express')
const router = express.Router()
const cors = require ('cors')

const Task = require('../models/Tasks')

router.use(cors())

router.post('/new_task', (req, res) => {
    console.log("new task back", req.body)
    const newTask = { name , description, periodicity, time} = req.body
// validar que no venga vacio los campos obligatorios

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
    Task.find()
    .then(allTasks => {
        console.log("all tasks", allTasks)
        return res.json(allTasks)
    })
    .catch(err => res.status(500).json({err: "can´t get all tasks"}))
})

module.exports = router

