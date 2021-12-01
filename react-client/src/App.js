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
import CreateNurse from './components/CreateNurse';
import ShowNurse from './components/ShowNurse';
import ShowUser from './components/ShowUser';
import ShowAlert from './components/ShowAlert';
import ShowTip from './components/ShowTip';
import ShowVitals from './components/ShowVital';

import Videos from './components/Videos';

import Home from './components/Home';
import Login from './components/Login';
import NurseLogin from './components/NurseLogin';

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
            <Nav.Link href="/nurselogin">Nurse Home</Nav.Link>
            
            <Nav.Link href="/create">Patient Sign Up</Nav.Link>
            <Nav.Link href="/createnurse">Nurse Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < NurseLogin />} path="/nurselogin" />
          <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < EditUser />} path="/edit/:id" />
          <Route render ={()=> < CreateUser />} path="/create" />
          <Route render ={()=> < CreateNurse />} path="/createnurse" />
          <Route render ={()=> < ShowUser />} path="/show/:id" />
          <Route render ={()=> < ShowNurse />} path="/shownurse/:id" />
          <Route render ={()=> < ShowAlert />} path="/showalert/:id" />
          <Route render ={()=> < ShowTip />} path="/showtip/:id" />
          <Route render ={()=> < ShowVitals />} path="/showvitals/:id" />
          <Route render ={()=> < EditVitals />} path="/editvitals/:id" />
          <Route render ={()=> < Videos />} path="/videos" />
          <Route render ={()=> < Predict />} path="/predict" />
          <Route render ={()=> < Results />} path="/results" />

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
