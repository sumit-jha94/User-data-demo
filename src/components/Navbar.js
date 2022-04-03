import React, { useState } from 'react';
// import { Button, Container, Form, FormControl, Nav, NavDropdown} from 'react-bootstrap';

function Navbar() {
  
  const [input, setInput] = useState('');

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  }


  const onButton = (ev) => {
    input(ev.target.value);
  }



  return (
    <div>
     <input type="text" 
     placeholder='Type Query' 
     name="search" 
     onChange={onInputChange} 
     value={input} />

     <button type='button' onClick={onButton}> Search</button>
     </div>
    );
}

export default Navbar;