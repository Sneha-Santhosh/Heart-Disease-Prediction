import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateTip(props) {
    //
    const patient = props.screen;
    console.log('props.screen',props.screen)
    const [tip, setTip] = useState({ _id: '' , message: '', patient: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/tip"
    //
    const saveTip = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = { message: tip.message, patient: patient };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save tip:',result.data)
            props.history.push('/showtip/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setTip({...tip, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Create an tip {patient} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron className="color-form">
            <Form onSubmit={saveTip}>

              <Form.Group>
                <Form.Label> Message</Form.Label>
                <Form.Control as="textarea" rows="3" name="message" id="content" placeholder="Enter Message" value={tip.content} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Post Tip
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateTip);
