import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskForm} from './components/taskForm.jsx'
import {TasksList} from './components/task-list'
import { Menu } from "./components/menu"
import SignIn from "./components/logForm"



function App() {
  return (
    <div>
      <SignIn />
      {/* <Menu></Menu>
      <TasksList></TasksList> */}
    </div>
  );
}

export default App;
