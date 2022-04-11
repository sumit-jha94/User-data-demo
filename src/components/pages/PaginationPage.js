import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const PaginationPage = (props) => {
  const { id: userid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    fetch(
      `https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 
    

  return (

    <div className="row justify-content-center">
      <div className="col-auto">
   
    <table className="table table-striped">
     
       <h2 className="  text-center text-danger text-uppercase">Full Details of data</h2>
      
       <tbody className=" table-hover ">
       {data &&
          data.map(
            ({id,first_name, last_name, email, web, age, company_name, city, state,  zip 
            }) =>
              userid == id ? (
                <p key={id}>


                  <tr className="table-primary">
                    <th >First Name:</th>
                    <td>{first_name}</td>
                  </tr>
                  

                  <tr className="table-success " >
                    <th >Last Name:</th>
                    <td >{last_name}</td>
                  </tr>

                  <tr className="table-warning" >
                    <th>Email Id:</th>
                    <td>{email}</td>
                  </tr>

                  <tr className="table-danger" >
                    <th>Website:</th>
                    <td>{web}</td>
                  </tr>

                  <tr className="table-info" >
                    <th>Age:</th>
                    <td>{age}</td>
                  </tr>

                  <tr className="bg-warning" >
                    <th>Company Name:</th>
                    <td>{company_name}</td>
                  </tr>

                  <tr className="bg-danger" >
                    <th>City:</th>
                    <td>{city}</td>
                  </tr>

                  <tr className="bg-info" >
                    <th>State:</th>
                    <td>{state}</td>
                  </tr>

                  <tr className="table-warning" >
                    <th>Zip Code:</th>
                    <td>{zip}</td>
                  </tr>
                </p>
              ) : null
          )}
       </tbody>
    </table>
    </div>
    </div>
   
  );
  
};

export default PaginationPage;
