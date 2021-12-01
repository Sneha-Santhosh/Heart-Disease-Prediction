import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditVitals(props) {
  console.log('edituser props:',props.match.params)
  const [vitals, setVitals] = useState({ _id: '' , pulse: '', pressure:'', weight:'', 
  temperature:'', respiratory:'', patient: '' });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/vitals/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setVitals(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateVital = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { pulse: vitals.pulse , pressure: vitals.pressure, weight: vitals.weight, temperature: vitals.temperature,
        respiratory: vitals.respiratory};
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        props.history.push('/showvitals/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setVitals({...vitals, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateVital}>
            <Form.Group>
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
            Update Info
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditVitals);
