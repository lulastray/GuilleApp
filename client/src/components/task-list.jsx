import React, { Component } from 'react'
import TaskServices from '../service/my-services'
import { TaskForm } from './taskForm'
import ImageTask from '../images/ilustracion_tasks.png'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'


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
                    <h3 className="body_titles ml-4">To do:</h3>
                </div>

                <div className="row ml-4">
                    <Form>
                        
                        {this.state.tasks.map((theTask, idx) => <Form.Check {...theTask}
                                                                          
                                                                            id={idx}
                                                                            label={theTask.name}
                                                                />)}


                        
                    </Form>
                </div>

            
                {/* botón de añadir una tarea */}
                <div className="mt-5">
                    <Container fluid>
                        <Row>
                            <Col>
                                <TaskForm></TaskForm>
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