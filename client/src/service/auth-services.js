import axios from 'axios'

export class AuthServices {
    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}auth`,
            withCredentials: true
        })
    }

    signup = (username, email,password) => {
        console.log("vengo de registrarme", username, email,password)
        console.log("service", this.service)

        return this.service.post("/signup", {username, email, password})
            .then(response => {
                console.log(response.data)
                return response.data
            })
            .catch(err => console.log(err))
    }

    login = (username, password) => {
        return this.services.post("/login", {username, password})
            .then(response => {
                console.log(response.data)
                return response.data
            })
    }

    logout = () => {
        return this.services.post("/logout")
            .then(response => response.data)
    }

    loggedin = () => {
            return this.service.get('/loggedin')
            .then(response => response.data)
    }
    
}