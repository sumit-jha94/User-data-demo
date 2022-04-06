import React from 'react';

const TableData = (data, userid) => {
  return (
    <table border="2" cellpadding="30" responsive="md">

       <td> 
           <h2>Details Of ID</h2> 
           {data &&
            data.map(({ id, first_name, last_name, email, web, age,company_name, city, state, zip }) => ( 
                userid == id ?
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
                : null
                ))}
                </td> 
               
          
                </table>
  )
}

export default TableData