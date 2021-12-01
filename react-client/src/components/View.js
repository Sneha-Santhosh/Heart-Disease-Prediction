import Predict from './Predict'
import ListAlerts from './ListAlerts';
import ListTips from './ListTips';
import ListVitals from './ListVitals';
import CreateAlert from './CreateAlert';
import CreateVitals from './CreateVitals';
import Videos from './Videos';
import React, { useState } from 'react';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [predict, setPredict] = useState('');

  const [listAl, setListAl] = useState('');

  const [listVi, setListVi] = useState('');

  const [listTip, setListTip] = useState('');

  const [video, setVideo] = useState('');

  const [alert, setAlert] = useState('');

  const [vitals, setVitals] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  
  

  const listAlerts = () => {
    console.log('in createArticle')
    setListAl('y')
    setListTip('n')
    setAlert('n')
    setVitals('n')
    setVideo('n')
    setListVi('n')
    setPredict('n')
  }

  const listTips = () => {
    console.log('in createArticle')
    setListAl('n')
    setListTip('y')
    setAlert('n')
    setVitals('n')
    setVideo('n')
    setListVi('n')
    setPredict('n')
  }

  const listVitals = () => {
    console.log('in createArticle')
    setListAl('n')
    setListTip('n')
    setAlert('n')
    setVitals('n')
    setVideo('n')
    setListVi('y')
    setPredict('n')
  }


  const createAlert = () => {
    console.log('in createArticle')
    setAlert('y')
    setListTip('n')
    setVideo('n')
    setVitals('n')
    setListAl('n')
    setListVi('n')
    setPredict('n')
  }

  const showVideo = () => {
    setVideo('y')
    setListTip('n')
    setAlert('n')
    setVitals('n')
    setListAl('n')
    setListVi('n')
    setPredict('n')
  }

  const createVitals = () =>{
    setVideo('n')
    setListTip('n')
    setAlert('n')
    setVitals('y')
    setListAl('n')
    setListVi('n')
    setPredict('n')
  }

  const createPredict = () =>{
    setVideo('n')
    setListTip('n')
    setAlert('n')
    setVitals('n')
    setListAl('n')
    setListVi('n')
    setPredict('y')
  }

  //
  return (
    <div className="App">
      <div>
            <p>Welcome {screen}</p>
            <p> {data}</p>
            
            <button onClick={createAlert}>Send An Alert</button>
            
            <button onClick={listAlerts}>Alert History</button>
            <br></br>
            <button onClick={showVideo}>Motivational Video</button>

            <button onClick={listTips}>Health Tips</button>
            <br></br>
            <button onClick={createVitals}>Enter Daily Info</button>
            <button onClick={listVitals}>Info History</button>
            <br></br>
            <button onClick={createPredict}>Predict Heart Disease</button> 
            <br></br>
            <button onClick={deleteCookie}>Log out</button>
          </div>            
      {alert !== 'y'
      
        ? <div>

          </div>            
        : <CreateAlert screen={screen} setScreen={setScreen} />
        
      }
      {video !=='y'
      ? <div>

    </div>  
      
     : <Videos screen={screen} setScreen={setScreen} />
      }
      {vitals !=='y'
      ? <div>

    </div>  
      
     : <CreateVitals screen={screen} setScreen={setScreen} />
      }


  {listAl !=='y'
      ? <div>

    </div>  
      
     : <ListAlerts screen={screen} setScreen={setScreen} />
      }

{listTip !=='y'
      ? <div>

    </div>  
      
     : <ListTips screen={screen} setScreen={setScreen} />
      }

{listVi !=='y'
      ? <div>

    </div>  
      
     : <ListVitals screen={screen} setScreen={setScreen} />
      }

{predict !=='y'
      ? <div>

    </div>  
      
     : <Predict screen={screen} setScreen={setScreen} />
      }

    </div>

    
  );
}

//
export default View;