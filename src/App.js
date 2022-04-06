import React from "react";
import Home from "./components/pages/Home";
import Details from "./components/pages/Details";
// import Pagination from "./components/pages/Pagination";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";




function App() {  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<Details />} /> 
        {/* <Route path="/user/:id" element={<Pagination />} />  */}

      </Routes>
    </Router>
    
   
  );
}

export default App;

    
