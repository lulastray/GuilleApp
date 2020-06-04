import React, {useState} from "react"
import {Form, Button} from "react-bootstrap"
import { AuthServices } from "../../service/auth-services"
import {Link} from "react-router-dom"


const SignIn = () => {

    const [user, setUser] = useState({})
    const service = new AuthServices()

    const handleChange = e => {
        const { name, value } = e.target
        const registerUser = {
            ...user,
            [name]: value
        }
        setUser(registerUser)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const response = await service.logIn(user)

        switch(response.status){
            case 200:
                const loggeddUser = await response.json()
                console.log("you are logged in", loggeddUser)
                return
            case 401:
                const json = await response.json()
                console.log("mensaje error del back",json.message)
                return
            case 500:
                console.log("sorry, something went wrong")
                return
        }
        setUser({})
    }

    return(
        <section className="container">
        <Form>
            <Form.Group controlId="username">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" 
                            name='username'
                            placeholder="username" 
                            onChange={handleChange} />
           
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
            <Form.Text>If you´re not a user, please <Link to="/signup">Register</Link></Form.Text>

        </Form>
        
    </section>
    )


}

export default SignIn