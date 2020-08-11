import React, {useState} from "react"
import { Redirect } from 'react-router-dom'
import {Form, Button} from "react-bootstrap"
import AuthServices from "../../service/auth-services"
import {Link} from "react-router-dom"


const LogIn = ({setUserLogged}) => {

    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)
    const service = new AuthServices()

    const handleChange = e => {
        const { name, value } = e.target
        const authenticatedUser = {
            ...user,
            [name]: value
        }
        setUser(authenticatedUser)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const response = await service.logIn(user)

        switch(response.status){
            case 200:
                const loggedUser = await response.json()
                setSuccess(true)
                setUserLogged(loggedUser)
                console.log("you are logged in", loggedUser)
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
    <section className="v-align bk-comp content">
        <article className="card bk-secondary">
        <h2 className="color-primary txt-center mg-botomm-large">Login</h2>
        {success ? <Redirect to='/tasks' /> : 
        
        <form className="flex flex-column">
            <div className="mg-bottom-medium">
                <label for="email" className="color-primary width-1-1">Email address</label>
                <input type="text" 
                        name='email'
                        className="width-1-1"
                        onChange={handleChange}
                            />
            </div>
            <div className="mg-bottom-large">
                <label for="password" className="color-primary width-1-1">Password</label>
                <input type="text" 
                        name='password'
                        className="width-1-1"
                        onChange={handleChange}
                           />
            </div>
       
            <Button className="bk-sea color-secondary width-1-2 mg-auto mg-bottom-medium"
                    type="submit"
                    onClick={handleSubmit}>
              Submit
            </Button>
            <p className="color-primary mg-top-medium">If you´re not a user, please <Link to="/signup" className="color-sea">Register</Link></p>

        </form>
        }
        </article>
    </section>
    )


}

export default LogIn