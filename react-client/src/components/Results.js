import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';

const Results = (props) => {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const { age, male, cp, trestbps,chol,fbs,restecg,thalach,exang, epoch, lr } =
    (props.location && props.location.state) || {};
  console.log(age);
  console.log(male);
  console.log(cp);
  console.log(trestbps);
  console.log(chol);
  console.log(fbs);
  console.log(restecg);
  console.log(thalach);
  console.log(exang);
  console.log(epoch);
  console.log(lr);
  const apiUrl = "http://localhost:3000/results";
  //runs once after the first rendering of page
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(apiUrl,{
          params: {
            age: age,
            male: male,
            cp: cp,
            trestbps: trestbps,
            chol: chol,
            fbs:fbs,
            restecg:restecg,
            thalach:thalach,
            exang:exang,
            epoch: epoch,
            lr: lr
          }
        })
        .then((result) => {
          console.log("result.data:", result.data);
          setData(result.data);
          setShowLoading(false);
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      {showLoading === false ? (
        <div>
                      
          {showLoading && (
            <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                          
            </Spinner>
          )}
                                     <h1>Prediction Results</h1>
                      <h2> The chance of heart disease will be:</h2>
                      
          <table className="App-table">
                          
            <thead>
                              
              <tr>
                                  <th>User Test Result</th>
                {/*                   <th>Test 2</th>
                                  <th>Test 3</th> */}
                                
              </tr>
                            
            </thead>
                                         
            <tbody>
                                               
              <tr>
                                  
                <td className="App-td">
                                      
                  {data.row1.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                                    
                </td>
                                  
                {/* <td className="App-td">
                                    
                  {data.row2.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                                    
                </td>
                                  
                <td className="App-td">
                                    
                  {data.row3.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                                    
                </td> */}
                                
              </tr>
                            
            </tbody>
                        
          </table>
          <div>
            <NavLink to="/" activeClassName="active">
              Go Back
            </NavLink>
          </div>
                                   
        </div>
      ) : (
        <div>
                    
          {showLoading && (
            <Spinner animation="border" role="status">
                          
              <span className="sr-only">Waiting for results...</span>
                        
            </Spinner>
          )}
                  
        </div>
      )}
          
    </div>
  );
};
//export default Results;
export default withRouter(Results);
