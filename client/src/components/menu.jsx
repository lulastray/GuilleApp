import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import ImageTask from '../images/ilustracion_tasks.png'
import ImageReward from '../images/helado_ok.png'



const Menu = () => {




    return(
        <Navbar className="menu" fixed="bottom">
            
                    <Nav.Link href="/tasks" className="width-1-3">
                        <img className="txt-center" src={ImageTask} />
                        <span className="color-primary txt-bold txt-uppercase txt-small txt-center">Tasks</span>
                    </Nav.Link>
                    <Nav.Link href="/rewards" className="width-1-5">
                        <img className="txt-center" src={ImageReward} />
                        <span className="color-primary txt-bold txt-uppercase txt-small txt-center" >Rewards</span>
                    </Nav.Link>
        </Navbar>
    )




}

export default Menu