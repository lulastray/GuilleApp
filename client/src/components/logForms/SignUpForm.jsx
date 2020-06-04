import React, {useState} from "react"
import {AuthServices} from "../../service/auth-services"
import {  Form, Button } from 'react-bootstrap'
import {Link} from "react-router-dom"

const SignUp = () => {
    const [user, setUser] = useState({})
    const service = new AuthServices()

    const handleChange = e => {
        const {name, value} = e.target

        const newUser = {
            ...user,
            [name]:value
        }
        setUser(newUser)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const response = await service.signUp(user)

        switch(response.status){
            case 200:
                const userCreated = await response.json()
                //metemos el mensaje para el usuario de usuario creado correctamente
                console.log("user created", userCreated)
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
            <h2>New User</h2>
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
                
                 </Form.Group>
                 <Form.Group controlId="password">
                   <Form.Label>Password</Form.Label>
                   <Form.Control type="password"
                                 name='password'
                                 placeholder="Password"
                                 onChange={handleChange} />
                 </Form.Group>
                 <div className="">
                 <Button variant="primary" 
                         type="submit"
                         onClick={handleSubmit}>
                   Submit
                 </Button>
                 <Form.Text>If you´re alreadey a user, please <Link to="/signin">Log In</Link></Form.Text>

                </div>
             </Form>

         </section>
    )
}

export default SignUp






















