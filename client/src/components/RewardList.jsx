import React, {useState, useEffect} from "react"
import TaskServices from '../service/my-services'
import ImageReward from '../images/helado_ok.png'
import  RewardForm  from './RewardForm'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'




const RewardList = props => {

    const [rewards, setRewards] = useState([])
    const [isExchange, setIsChange] = useState(false)

    const services = new TaskServices()


    const fetchRewards = async () => {
        console.log("ento a llamar a todas mis rewards en el front")
        const response = await services.getAllRewards()
        if (response.status === 200) {
        const allRewards = await response.json()
        console.log(allRewards)
        setRewards(allRewards)
        }
    }

    useEffect(() => {
        console.log("entro en useEffect")
        fetchRewards();
      }, []);


    return(
        <section>
            {/* imagen cabecera task */}
            <header className="bk-blue pd-bottom-large">

                <figure className="text-center mb-0">
                    <img className="width-1-4" src={ImageReward}/>
                    <h1 className="mt-0 mb-0 color-secondary">My Rewards</h1>
                </figure>

            </header>

            <div className="background_titles">
                <h3 className="body_titles ml-4 pd-small">To exchange:</h3>
            </div>

            <div className="row ml-4">
                <Form>
                    
                    {rewards && rewards.map((theReward, idx) => {         
                        console.log(theReward)
                        return (<div><Form.Check disabled={theReward.exchanged}
                                                                        id={theReward._id}
                                                                        label={theReward.name}
                                                                        key={idx}
                                                                        
                                                                        className="d-inLine"
                    />
                    <span className="txt-right">{theReward.value}</span>
                    <span className="txt-right"><Trash id={theReward._id} color="royalblue" size={20} /></span></div>)
                    })
                    }


                    
                </Form>
            </div>

        
            {/* botón de añadir una tarea */}
            <div className="mt-5">
                <Container fluid>
                    <Row>
                        <Col>
                            <RewardForm userLogged={props.userLogged}></RewardForm>
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

export default RewardList