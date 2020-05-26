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
                {/* imagen cabecera task */}
                <header className="header-task">

                    <figure className="text-center mb-0">
                        <img className="img-task" src={ImageTask}/>
                        <h1 className="mt-0 mb-0">My Tasks</h1>
                    </figure>

                </header>

                <div className="background_titles">
                    <h3 className="body_titles ml-4">morning</h3>
                </div>

                <div className="row ml-4">
                    <form>
                        {this.state.tasks.map((theTask, idx) => <li key={idx} {...theTask}>{theTask.name}</li>)}
                    </form>
                </div>

                <div className="background_titles">
                    <h3 className="body_titles ml-4">afternoon</h3>
                </div>

                {/* botón de añadir una tarea */}
                <div className="ml-4">
                    <TaskForm></TaskForm>
                </div>


            </section>
        )
    }
}