//import CreateArticle from './CreateArticle';
import CreateAlert from './CreateAlert';
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
  //const [article, setArticle] = useState('');

  const [alert, setAlert] = useState('');
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
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  // const listArticles = (username) => {

  //   console.log('in lisArticles: ',username)
  //   //setArticle('n')

  // }
  // //
  // const createArticle = () => {
  //   console.log('in createArticle')
  //   setArticle('y')

  // }

  const createAlert = () => {
    console.log('in createArticle')
    setAlert('y')

  }

  //
  return (
    <div className="App">
        <iframe width="560" height="315" src=
        "https://www.youtube.com/embed/oKHs_-6oR6s" title="YouTube video player" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture" allowfullscreen></iframe>

    </div>
  );
}

//
export default View;