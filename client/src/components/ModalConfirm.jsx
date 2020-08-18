import React, {useState} from "react"
import TaskServices from '../service/my-services'
import { Modal, Form, Button } from 'react-bootstrap'


const ModalConfirm = ({showConfirm,setShowConfirm,handleExchangeReward,title,messageModalConfirm,buttonModalConfirm}) =>{

    // const handleShow = e => {
    //     setShowConfirm(true)
    // }

    const handleClose = e => {
        setShowConfirm(false)
    }

    return (
        <>
          <Modal
            show={showConfirm}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             {messageModalConfirm}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleExchangeReward}>{buttonModalConfirm}</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalConfirm