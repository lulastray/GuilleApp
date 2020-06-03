import axios from 'axios'

export class AuthServices {
    constructor() {
        this.baseUrl = `${process.env.REACT_APP_URL}auth`
    }

    signup = async user => {
        console.log("vengo de registrarme", user)

        return await fetch(`${this.baseUrl}/signup`, {
            method: "POST", 
            body: JSON.stringify(user), 
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        })
        
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