import React, {useState, useEffect} from "react"
import TaskServices from '../service/my-services'
import ImageReward from '../images/helado_ok.png'
import  RewardForm  from './RewardForm'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'




const RewardList =({userLogged})=> {

    const [rewards, setRewards] = useState([])
    const [isExchange, setIsChange] = useState(false)

    const [showModal, setShowModal] = useState(false)


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

    const handleDelete = async (e) => {
        console.log("e.target", e.target)
        console.log("voy a borrar", e.target.id)
        const response = await services.removeReward(e.target.id, true)
        if(response.status === 200){
            fetchRewards()
            console.log("he cambiado el estado a borrado")
        }
    }

    useEffect(() => {
        console.log("entro en useEffect")
        fetchRewards();
      }, [showModal]);


    return(
        <section>
            {/* imagen cabecera task */}
            <header className="bk-blue pd-bottom-large width-1-1">

                <figure className="text-center mb-0">
                    <img className="width-1-4" src={ImageReward}/>
                    <h1 className="mt-0 mb-0 color-secondary">My Rewards</h1>
                </figure>

            </header>

            <div className="background_titles">
                <h3 className="body_titles ml-4 pd-small">To exchange:</h3>
            </div>

            <div className="width-1-1 pd-medium">
                <Form className="width-1-1 flex flex-column">
                    
                    {rewards && rewards.filter(rewards => !rewards.deleted).map((theReward, idx) => {         
                        console.log(theReward)
                        return (<div className="width-1-1 flex flex-direction-row justify-between"><Form.Check disabled={theReward.exchanged}
                                                                        id={theReward._id}
                                                                        label={theReward.name}
                                                                        key={idx}
                                                                        
                                                                        className="width-1-3"
                    ></Form.Check>
                        <div className="width-1-3">
                            <p>Value:{theReward.value}</p>
                        </div>
                        <div className="width-1-5 txt-right">
                            <p><Trash id={theReward._id} color="royalblue" size={20} onClick={handleDelete} /></p>
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
                            <RewardForm userLogged={userLogged} setShowModal={setShowModal} showModal={showModal}></RewardForm>
                        </Col>
                        {/* <Col>
                            <Button className="btn btn_red btn_font">Remove task</Button>
                        </Col> */}
                    </Row> 
                </Container>
            </div>



        </section>
    )
}

export default RewardList