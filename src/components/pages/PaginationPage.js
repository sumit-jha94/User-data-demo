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
    <table border="2" cellpadding="30" responsive="md">
      <td>
        <h2>Details Of ID</h2>
        {data &&
          data.map(
            ({
              id,
              first_name,
              last_name,
              email,
              web,
              age,
              company_name,
              city,
              state,
              zip
            }) =>
              userid == id ? (
                <p key={id}>
                  <p> First Name: {first_name}</p>
                  <p> Last Name: {last_name}</p>
                  <p> Email Id: {email}</p>
                  <p> Website: {web}</p>
                  <p> Age: {age}</p>
                  <p> Company Name: {company_name}</p>
                  <p> City: {city}</p>
                  <p> State: {state}</p>
                  <p> Zip Code: {zip}</p>
                </p>
              ) : null
          )}
      </td>
    </table>
    
  );
  <nav>
      <ul>
        <li>1</li>
        <li>1</li>

      </ul>
    </nav>
};

export default PaginationPage;
