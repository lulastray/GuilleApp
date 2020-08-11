

export default class TaskService {
    constructor() {
        this.baseUrl = `${process.env.REACT_APP_URL}api`
    }

    createTask = async task => {
        console.log("new task en el service", task)
        return await fetch(`${this.baseUrl}/new_task`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        })
    }

    getAllTasks = async () => {
        return await fetch(`${this.baseUrl}/all_tasks`, {
            method: "GET",
            credentials:"include"
        })
    }

    changeTaskProgress = async (id, stateProgress) => {
        return await fetch(`${this.baseUrl}/change_progress`, {
            method:"POST",
            body: JSON.stringify({id, stateProgress}),
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        })
    }
}