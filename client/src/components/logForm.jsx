import React, {useState, useEffect} from "react"
import {AuthServices} from "../service/auth-services"
import {  Form, Button } from 'react-bootstrap'

const SignIn = () => {
    const [user, setUser] = useState({})
    const service = new AuthServices()

    const handleChange = e => {

        const {name, value} = e.target

        const newUser = {
            ...user,
            [name]: value
        }
        setUser(newUser)
    }

    const handleSubmit = async e => {

        e.preventDefault()

        console.log(service)

        const response = await service.signup(user)

        switch(response.status) {
            case 200:
                const createdUser = await response.json()
                console.log(createdUser)
                return
            case 400:
                const json = await response.json()
                console.log(json.message)
                return
            case 403:
                console.log("Ha petado")
                return
            default:
                console.log("Ha petado sin control")
                return
        }

        setUser({})
    }

    return(
        <section className="container">
            <Form>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text"
                                name='username'
                                placeholder="Enter username" 
                                onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" 
                                name='email'
                                placeholder="Enter email" 
                                onChange={handleChange} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"
                                name='password'
                                placeholder="Password"
                                onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" 
                        type="submit"
                        onClick={handleSubmit}>
                  Submit
                </Button>
            </Form>
        </section>
    )
}

export default SignIn


