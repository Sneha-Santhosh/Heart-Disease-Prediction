import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import List from './components/List';
import EditUser from './components/EditUser';
import EditVitals from './components/EditVitals';

import CreateUser from './components/CreateUser';
import ShowUser from './components/ShowUser';
import ShowVitals from './components/ShowVital';


import Home from './components/Home';
import Login from './components/Login';

import Predict from './components/Predict';
import Results from './components/Results';
//
function App() {

  return (
    <Router>
      <Navbar className="color-nav" expand="lg">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="mr-auto">
          
            <Nav.Link href="/login">Patient Home</Nav.Link>
            
            <Nav.Link href="/create">Patient Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < EditUser />} path="/edit/:id" />
          <Route render ={()=> < CreateUser />} path="/create" />
          <Route render ={()=> < ShowUser />} path="/show/:id" />
          <Route render ={()=> < ShowVitals />} path="/showvitals/:id" />
          <Route render ={()=> < EditVitals />} path="/editvitals/:id" />
          <Route render ={()=> < Predict />} path="/predict" />
          <Route render ={()=> < Results />} path="/results" />

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
