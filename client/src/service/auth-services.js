
export default class AuthServices {
    constructor() {
        this.baseUrl = `${process.env.REACT_APP_URL}auth`
    }

    signUp = async user => {

        return await fetch(`${this.baseUrl}/signup`, {
            method: "POST", 
            body: JSON.stringify(user), 
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        })
        
    }

    logIn = async user => {
        return await fetch(`${this.baseUrl}/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        })
    }

    logOut = () => {
        return this.services.post("/logout")
            .then(response => response.data)
    }

    loggedIn = async () => {
        return await fetch(`${this.baseUrl}/loggedin`, { credentials: "include"})
    }
}