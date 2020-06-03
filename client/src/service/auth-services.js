import axios from 'axios'

export default  class AuthServices {
    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}auth`,
            withCredentials: true
        })
    }

    signup = (username, email,password) => {
        return this.services.post("/signup", {username, email, password})
            .then(response => {
                console.log(response.data)
                response.data
            })
            .catch(err => console.log(err))
    }

    login = (username, password) => {
        return this.services.post("/login", {username, password})
            .then(response => {
                console.log(response.data)
                response.data
            })
    }
}