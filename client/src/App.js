import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import {TaskForm} from './components/taskForm.jsx'
import {TasksList} from './components/TaskList'
import { Menu } from "./components/menu"
import SignUp from "./components/logForms/SignUpForm"
import SignIn from "./components/logForms/SignInForm"



function App() {
  return (
    <main>
      {/* <Menu /> */}
      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </main>
  );
}

export default App;
