import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateVitals(props) {
    //
    const patient = props.screen;
    console.log('props.screen',props.screen)
    const [vitals, setVitals] = useState({ _id: '' , pulse: '', pressure:'', weight:'', temperature:'', respiratory:'', patient: '' });
    const [showLoading, setShowLoading] = useState(false);
    // 
    const apiUrl = "http://localhost:3000/api/nursevitals" 
    //
    const saveVitals = (e) => { 
        setShowLoading(true);
        e.preventDefault();
        const data = { username: vitals.username, pulse: vitals.pulse , pressure: vitals.pressure, weight: vitals.weight, temperature: vitals.temperature,
             respiratory: vitals.respiratory, patient: patient };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save vitals:',result.data)
            props.history.push('/showvitals/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setVitals({...vitals, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2>Enter Patient Daily Information {patient} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron className="color-form">
            <Form onSubmit={saveVitals}>

              <Form.Group>
                <Form.Label> Patient Username:</Form.Label>
                <Form.Control as="textarea" rows="1" name="username" id="username" placeholder="" value={vitals.content} onChange={onChange} />
                <Form.Label> Pulse Rate:</Form.Label>
                <Form.Control as="textarea" rows="1" name="pulse" id="pulse" placeholder="Enter in bpm" value={vitals.content} onChange={onChange} />
                <Form.Label> Blood Pressure:</Form.Label>
                <Form.Control as="textarea" rows="1" name="pressure" id="pressure" placeholder="" value={vitals.content} onChange={onChange} />
                <Form.Label> Weight:</Form.Label>
                <Form.Control as="textarea" rows="1" name="weight" id="weight" placeholder="Enter in lbs" value={vitals.content} onChange={onChange} />
                <Form.Label> Temperature:</Form.Label>
                <Form.Control as="textarea" rows="1" name="temperature" id="temperature" placeholder="Enter in C" value={vitals.content} onChange={onChange} />
                <Form.Label> Respiratory Rate:</Form.Label>
                <Form.Control as="textarea" rows="1" name="respiratory" id="respiratory" placeholder="Enter in /min" value={vitals.content} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Save Info
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateVitals);
