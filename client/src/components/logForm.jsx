import React, {Component} from "react"
import {AuthServices} from "../service/auth-services"
import {  Form, Button } from 'react-bootstrap'

export class SignIn extends Component {
    constructor(){
        super()
        this.state= {
            user: {
                username: "",
                email:"",
                contraseña:"",
            }
        }

        this.service = new AuthServices()
    }

    handleChange = e => {
        console.log(this.state.user)
        console.log(e.target.value)
        const {name ,value} = e.target
        return this.setState({
            user: {
                ...this.state.user,
                [name]: value
              }
        })
    }

    handleSubmit = e => {
        console.log(this.state.user)
        e.preventDefault()
        const {username, email, password} = this.state.user
        this.service.signup(username, email,password)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }
    

    render(){
        return(
            <section className="container">
                <Form>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text"
                                    name='username'
                                    placeholder="Enter username" 
                                    onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" 
                                    name='email'
                                    placeholder="Enter email" 
                                    onChange={this.handleChange} />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password"
                                    name='password'
                                    placeholder="Password"
                                    onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" 
                            type="submit"
                            onClick={this.handleSubmit}>
                      Submit
                    </Button>
                </Form>
            </section>
        )
    }
}