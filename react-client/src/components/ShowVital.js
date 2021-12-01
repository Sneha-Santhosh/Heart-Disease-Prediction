import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowVital(props) {
  console.log('props.match.params',props.match.params.id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/vitals/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from vitals',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editVital = (id) => {
    props.history.push({
      pathname: '/editvitals/' + id
    });
  };

  const deleteVital = (id) => {
    setShowLoading(true);
    const vital = { pulse: data.pulse, pressure: data.pressure };
    //
    axios.delete(apiUrl, vital)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/listvitals')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        
        <p>Pulse Rate: {data.pulse}</p>
        <p>Blood Pressure: {data.pressure}</p>
        <p>Weight: {data.weight}</p>
        <p>Temperature: {data.temp}</p>
        <p>Respiratory Rate: {data.temp}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editVital(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteVital(data._id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowVital);
