import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import {TaskForm} from './components/taskForm.jsx'
import {TasksList} from './components/TaskList'
import  Menu from "./components/menu"
import SignUp from "./components/logForms/SignUpForm"
import LogIn from "./components/logForms/Login"
import AuthServices from "./service/auth-services"
import Inicio from "./components/Inicio"
import RewardList from './components/RewardList'


const App = () => {
  const [userLogged, setUserLogged] = useState(null)
  const service = new AuthServices()

  const isUserLogged = async () => {
    if(!userLogged) {
    
        const response = await service.loggedIn()
        const responseUser = await response.json()
  
        if(response.status === 200) {
            setUserLogged(responseUser)
        }
  
  

    }
  }

    useEffect(() => {
      isUserLogged();
    }, [userLogged]);

  return (
    <main>
      <Menu />
      <Switch>
        <Route path="/" exact render={props => <LogIn {...props} setUserLogged={setUserLogged} />} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/tasks" exact render={props => <TasksList {...props} userLogged={userLogged} />} />
        <Route path="/rewards" exact render={props => <RewardList {...props} userLogged={userLogged} />} />

      </Switch>
    </main>
  );
}

export default App;
