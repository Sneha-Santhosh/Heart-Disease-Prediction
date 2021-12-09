import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from "axios";
import { withRouter } from 'react-router-dom';

const apiUrl = "http://localhost:3000/runwithparams";

const Predict = (props) => {
  const [state, setState] = useState({
    age: 0,
    male: 0,
    cp: 0,
    trestbps: 0,
    chol:0,
    fbs: 0,
    restecg:0,
    thalach: 0,
    exang: 0,
    epoch: 100,
    lr: 0.06,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();

    props.history.push({
      pathname: "/results",
      state,
    });


  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <h1>Please provide the information for testing</h1>
      <Jumbotron classname='color-form'>
      <Form className="register-form" onSubmit={handleOnSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Age: </Form.Label>&nbsp;
            <input type="text" id="age" name="age" onChange={handleInputChange} /><br></br>
          <Form.Label>Male: </Form.Label>&nbsp;
            <input type="checkbox" id="male" name="male" value="1" onChange={handleInputChange} /><br></br>
          <Form.Label>Have Chest Pain: </Form.Label>&nbsp;
            <input type="number" id="chestPain" name="cp" onChange={handleInputChange} /><br></br>
          <Form.Label>Resting Blood Pressure: </Form.Label>
            <input type="number" id="bloodPressure" name="bloodPressure" onChange={handleInputChange} /><br></br>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cholesterol: </Form.Label>&nbsp;
            <input type="number" id="cholesterol" name="cholesterol" onChange={handleInputChange} /><br></br>
          <Form.Label>Fasting blood sugar greater than 120 mg/dl: </Form.Label>&nbsp;
            <input type="checkbox" id="fbs" name="fbs" value="1" onChange={handleInputChange} /><br></br>
          <Form.Label>Rest ecg: </Form.Label>&nbsp;
            <input type="checkbox" id="restecg" name="restecg" value="1" onChange={handleInputChange} /><br></br>
          <Form.Label>Max Heart Rate: </Form.Label>&nbsp;
            <input type="number" id="thalach" name="thalach" onChange={handleInputChange} /><br></br>
          <Form.Label>Angina from exercise: </Form.Label>&nbsp;
            <input type="checkbox" id="exang" name="exang" value="1" onChange={handleInputChange} /><br></br>
        </Form.Group>
        <Form.Group controlId="epoch">
          <Form.Label>Epoch: </Form.Label>
            <input type="number" id="epoch" name="epoch" onChange={handleInputChange} /><br></br>
        </Form.Group>
        <Form.Group controlId="lr">
          <Form.Label>Learning Rate: </Form.Label>
            <input text="number" id="lr" name="lr" onChange={handleInputChange} /><br></br>
        </Form.Group>
        <Button variant="primary" type="submit">Predict</Button>
      </Form>
   </Jumbotron>
    </div>
 
  );
};
//export default Predict;
export default withRouter(Predict);