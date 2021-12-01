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
        <Form.Label>Age </Form.Label>&nbsp;
          <input type="text" id="age" name="age" onChange={handleInputChange}></input><br></br>
          <Form.Label>Male </Form.Label>&nbsp;
        <input type="checkbox" id="male" name="male" value="1" onChange={handleInputChange}></input><br></br>
        {/* <Form.Label>Have Chest Pain </Form.Label>&nbsp;
        <input type="checkbox" id="chestPain" name="cp" onChange={handleInputChange}></input><br></br> */}
        <Form.Label>Chest pain</Form.Label>
          <Form.Control
            type="number"
            step="any"
            placeholder="Chest pain type"
            name="cp"
            onChange={handleInputChange}
          />
          <Form.Label>Resting Blood Pressure</Form.Label>
          <Form.Control
            type="number"
            step="any"
            placeholder="mmHg"
            name="trestbps"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Label>Cholesterol</Form.Label>
          <Form.Control
            type="number"
            step="any"
            placeholder="mg/dl"
            name="chol"
            onChange={handleInputChange}
          />
        <Form.Label>Fasting blood sugar greater than 120 mg/dl </Form.Label>&nbsp;
        <input type="checkbox" id="fbs" name="fbs" value="1" onChange={handleInputChange}></input><br></br>
        <Form.Label>Rest ecg </Form.Label>&nbsp;
        <input type="checkbox" id="restecg" name="restecg" value="1" onChange={handleInputChange}></input><br></br>
        <Form.Label>Max Heart Rate</Form.Label>
          <Form.Control
            type="number"
            step="any"
            placeholder="bpm"
            name="thalach"
            onChange={handleInputChange}
          />
        <Form.Label>Angina from exercise </Form.Label>&nbsp;
        <input type="checkbox" id="exang" name="exang" value="1" onChange={handleInputChange}></input><br></br>
        <Form.Group controlId="epoch">
          <Form.Label>Epoch</Form.Label>
          <Form.Control
            type="number"
            step="any"
            placeholder="Epoch"
            name="epoch"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="lr">
          <Form.Label>Learning Rate</Form.Label>
          <Form.Control
            type="number"
            step="any"
            placeholder="Learning Rate"
            name="lr"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Predict
        </Button>
      </Form>
   </Jumbotron>
    </div>
 
  );
};
//export default Predict;
export default withRouter(Predict);
