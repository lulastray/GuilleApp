import React, { Component } from 'react'
import TaskServices from '../service/my-services'
import { TaskForm } from './taskForm'
import ImageTask from '../images/ilustracion_tasks.png'


export class TasksList extends Component {

    constructor() {
        super()
        this.state = { tasks: []}
        this.services = new TaskServices()
    }
    

    componentDidMount(){
        this.services.getAllTasks()
            .then(allTasks => {
                console.log(allTasks)
                return this.setState({ tasks : allTasks})
            })
            
    }


    render(){
        return(
            <section>
                <header className="header-task">
                    <figure className="text-center">
                        <img className="img-task" src={ImageTask}/>
                        <h1 className="mt-0">My Tasks</h1>

                    </figure>
                </header>
                <TaskForm></TaskForm>
                <div className="row">
                    <ul>
                        {this.state.tasks.map((theTask, idx) => <li key={idx} {...theTask}>{theTask.name}</li>)}
                    </ul>
                </div>
            </section>
        )
    }
}