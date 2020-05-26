import axios from 'axios'

export default class TaskService {

    constructor(){ // no me acuerdo la diferencia entre esto y 
        this.service = axios.create ({
            baseURL: 'http://localhost:3000/api/'
        })
    }

    createTask = task => {
        console.log("new task en el service", task)
        return this.service.post('new_task', task)
            .then(createdTask => createdTask) 
            .catch(err => console.log(err))
    }

    getAllTasks = () => {
       
        return this.service.get("all_tasks")
            .then(tasks => tasks.data)
            .catch(err => console.log(err))
    }
}