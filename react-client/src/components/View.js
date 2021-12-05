import Predict from './Predict'
import ListVitals from './ListVitals';
import CreateVitals from './CreateVitals';
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


  const [listVi, setListVi] = useState('');

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
  
  



  const listVitals = () => {
    console.log('in createArticle')
    setVitals('n')
    setPredict('n')
  }



  const createVitals = () =>{
    setVitals('y')
    setPredict('n')
  }

  const createPredict = () =>{ 
    setVitals('n')
    setPredict('y')
  }

  //
  return (
    <div className="App">
      <div>
            <p>Welcome {screen}</p>
            <p> {data}</p>
            
            <button onClick={createVitals}>Enter Daily Info</button>
            <button onClick={listVitals}>Info History</button>
            <br></br>
            <button onClick={createPredict}>Predict Heart Disease</button> 
            <br></br>
            <button onClick={deleteCookie}>Log out</button>
          </div>            
      {vitals !=='y'
      ? <div>

    </div>  
      
     : <CreateVitals screen={screen} setScreen={setScreen} />
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