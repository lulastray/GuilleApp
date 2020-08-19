import React, { Component } from 'react'
import TaskServices from '../service/my-services'
import { TaskForm } from './taskForm'
import ImageTask from '../images/ilustracion_tasks.png'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'


export class TasksList extends Component {

    constructor(props) {
        super(props)
        this.state = { tasks: []}
        this.services = new TaskServices()

        this.handleStateProgress = this.handleStateProgress.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    

    componentDidMount(){
        this.fetchTasks()
            
    }

    async fetchTasks () {
        const response = await this.services.getAllTasks()
        if(response.status === 200) {
            const allTasks = await response.json()
            this.setState({ tasks : allTasks})
        }
    }

    async handleStateProgress(e) {
      
        const stateProgress = e.target.checked ? "completed" : "inProgress"
    
        const response = await this.services.changeTaskProgress(e.target.id, stateProgress)
        if (response.status === 200){
            this.fetchTasks()
        }
    }

    async handleDelete(e){
        console.log("voy a borrar", e.target.id)
        const response = await this.services.changeTaskProgress(e.target.id, "deleted")
        if(response.status === 200){
            this.fetchTasks()
            console.log("he cambiado el estado a borrado")
        }
    }
    

    render(){
        return(
            <section>
                {/* imagen cabecera task */}
                <header className="bk-green">

                    <figure className="text-center mb-0">
                        <img className="width-4-5" src={ImageTask}/>
                        <h1 className="mt-0 mb-0">My Tasks</h1>
                    </figure>

                </header>

                <div className="background_titles">
                    <h3 className="body_titles ml-4">To do:</h3>
                </div>

                <div className="width-1-1 pd-medium">
                    <Form className="width-1-1 flex flex-column">
                        
                        {this.state.tasks.filter(task=> task.stateProgress !== "deleted").map((theTask, idx) => {         
                            console.log(theTask.stateProgress)
                            return (<div className="width-1-1 flex flex-direction-row justify-between" key={idx}><Form.Check checked={theTask.stateProgress === "completed"}
                                                                            id={theTask._id}
                                                                            label={theTask.name}
                                                                            
                                                                            onChange={this.handleStateProgress}
                                                                            className="width-1-3"
                        />
                            <div className="width-1-3">
                                <p>Value:<span className="color-success">{theTask.value}</span></p>
                            </div>
                            <div className="width-1-5 txt-right">
                                <p><Trash id={theTask._id} onClick={this.handleDelete}color="royalblue" size={20} /></p>
                            </div>
                        </div>)
                        })
                        }


                        
                    </Form>
                </div>

            
                {/* botón de añadir una tarea */}
                <div className="mt-5">
                    <Container fluid>
                        <Row>
                            <Col>
                                <TaskForm userLogged={this.props.userLogged}></TaskForm>
                            </Col>
                            <Col>
                                <Button className="btn btn_red btn_font">Remove task</Button>
                            </Col>
                        </Row> 
                    </Container>
                </div>



            </section>
        )
    }
}