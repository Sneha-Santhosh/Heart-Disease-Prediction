
import ListAlerts from './ListAlerts';
import ListVitals from './ListVitals';
import CreateTip from './CreateTip';
import CreateVitals from './CreateNurseVitals';
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


  const [listAl, setListAl] = useState('');

  const [listVi, setListVi] = useState('');



  const [tip, setTip] = useState('');

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
    setTip('n')
    setVitals('n')
    
    setListVi('n')
    
  }

  const listVitals = () => {
    console.log('in createArticle')
    setListAl('n')
    setTip('n')
    setVitals('n')
    
    setListVi('y')
    
  }


  const createTip = () => {
    console.log('in createArticle')
    setTip('y')
    
    setVitals('n')
    setListAl('n')
    setListVi('n')
    
  }


  const createVitals = () =>{
    setTip('n')
    setVitals('y')
    setListAl('n')
    setListVi('n')
    
  }



  //
  return (
    <div className="App">
      <div>
            <p>Welcome {screen}</p>
            <p> {data}</p>
            
            <button onClick={createTip}>Post a Tip</button>
            <button onClick={listAlerts}>Alert History</button>
            
            <button onClick={createVitals}>Enter Patient Info</button>
            <button onClick={listVitals}>Info History</button>
            
            <button onClick={deleteCookie}>Log out</button>
          </div>            
      {tip !== 'y'
      
        ? <div>

          </div>            
        : <CreateTip screen={screen} setScreen={setScreen} />
        
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

{listVi !=='y'
      ? <div>

    </div>  
      
     : <ListVitals screen={screen} setScreen={setScreen} />
      }



    </div>

    
  );
}

//
export default View;