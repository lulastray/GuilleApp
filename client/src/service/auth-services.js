
export default class AuthServices {
    constructor() {
        this.baseUrl = `${process.env.REACT_APP_URL}auth`
    }

    signUp = async user => {
        console.log("vengo de registrarme", user)

        return await fetch(`${this.baseUrl}/signup`, {
            method: "POST", 
            body: JSON.stringify(user), 
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        })
        
    }

    logIn = async user => {
        console.log("vengo a loguearme", user)
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
        console.log("loggedin en el service")
        return await fetch(`${this.baseUrl}/loggedin`, { credentials: "include"})
    }
}