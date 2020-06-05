import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import {TaskForm} from './components/taskForm.jsx'
import {TasksList} from './components/TaskList'
import { Menu } from "./components/menu"
import SignUp from "./components/logForms/SignUpForm"
import SignIn from "./components/logForms/SignInForm"
import {AuthService} from "./service/auth-services"
import Inicio from "./components/Inicio"


const App = () => {
  const [userLogged, setUserLogged] = useState(null)
  const service = new AuthService()

  const isUserLogged = async userObj => {
    const userLogged = await service.loggedIn()
    console.log(userLogged)

    }

    useEffect(() => {
      isUserLogged();
    }, []);

  return (
    <main>
      {/* <Menu /> */}
      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/inicio" exact component={Inicio} userInSession={userLogged} setUserLogged={setUserLogged} />}
      </Switch>
    </main>
  );
}

export default App;
