import React, {useState, useEffect} from "react"
import TaskServices from '../service/my-services'
import ImageReward from '../images/helado_ok.png'
import  RewardForm  from './RewardForm'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import ModalConfirm from './ModalConfirm'



const RewardList =({userLogged})=> {

    const [rewards, setRewards] = useState([])
    const [currentReward, setCurrentReward] = useState("")

    const [showCreate, setShowCreate] = useState(false)

    const [showConfirm, setShowConfirm] = useState(false)


    const services = new TaskServices()

    const title = "Exchange Reward"
    const messageModalConfirm = "Do you want to exchange this Reward"
    const buttonModalConfirm = "Exchange!"

    const fetchRewards = async () => {
        const response = await services.getAllRewards()
        if (response.status === 200) {
        const allRewards = await response.json()
        setRewards(allRewards)
        }
    }

    const handleDelete = async (e) => {
        const response = await services.removeReward(e.target.id, true)
        if(response.status === 200){
            fetchRewards()
        }
    }

    const handleShowConfirm = e => {
        setCurrentReward(e.target.id)
        setShowConfirm(true)
    }

    const handleCloseConfirm = e => {
        setShowConfirm(false)
    }


    const handleExchangeReward = async () => {
       const id = currentReward
        const response = await services.exchangeReward(id)
        if(response.status === 200){
            handleCloseConfirm()
            fetchRewards()
        }

    }

    useEffect(() => {
        fetchRewards();
      }, [showCreate]);


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
                        
                        return (<div className="width-1-1 flex flex-direction-row justify-between" key={idx}><Form.Check disabled={theReward.exchanged}
                                                                        id={theReward._id}
                                                                        label={theReward.name}
                                                                        
                                                                       
                                                                        className="width-1-3"
                                                                        onChange={handleShowConfirm}
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
                            <RewardForm userLogged={userLogged} setShowCreate={setShowCreate} showCreate={showCreate}></RewardForm>
                        </Col>
                        {/* <Col>
                            <Button className="btn btn_red btn_font">Remove task</Button>
                        </Col> */}
                    </Row> 
                </Container>
            </div>

            <ModalConfirm showConfirm={showConfirm} 
                            setShowConfirm={setShowConfirm} 
                            handleExchangeReward={handleExchangeReward} 
                            title={title} 
                            messageModalConfirm={messageModalConfirm} 
                            buttonModalConfirm={buttonModalConfirm}
                            
            />


        </section>
    )
}

export default RewardList