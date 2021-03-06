import React, {useState} from "react"
import TaskServices from '../service/my-services'
import { Modal, Form, Button } from 'react-bootstrap'




const RewardForm = ({userLogged, setShowCreate, showCreate}) => {

    const [reward, setReward] = useState({})
    const services = new TaskServices()



    const handleShow = (e) => setShowCreate(true)
    const handleClose = () => setShowCreate(false)
    

    const handleChange = e => {
        const {name, value} = e.target
        const newReward = {
            ...reward,
            [name]: value
        }
        setReward(newReward)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const newReward= { ...reward, creatorID: userLogged._id}
        const response = await services.createReward(newReward)

        switch(response.status){
            case 200:
                const rewardCreated = await response.json()
                //metemos el mensaje para el usuario de usuario creado correctamente
                console.log("reward created", rewardCreated)

                break
            case 400:
                 const json = await response.json()
                 console.log(json.message)
                 break
             default:
                 console.log("something went wrong")
                 break
        } 
        setReward({})
        handleClose()
    }

    return (
        <section>
            <Button className="btn btn_yellow btn_font" size="lg" onClick={handleShow}>New Reward</Button>
            
            <Modal show={showCreate} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Reward</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" id="name" name="name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Value</Form.Label>
                            <Form.Control onChange={handleChange} className="form-control" type="text" id="value" name="value" />
                        </Form.Group>
                        <button className="btn btn-success" onClick={handleSubmit}>Guardar</button>
                    
                    </Form>

                </Modal.Body>

            
            </Modal>
       
        </section>
    )

}

export default RewardForm