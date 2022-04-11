import React from "react";
import Home from "./components/pages/Home";
import Details from "./components/pages/Details";
import PaginationPage from "./components/pages/PaginationPage";
// import HomeDummy from "./components/pages/HomeDummy";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import HomeDummy from "./components/pages/HomeDummy";




function App() {  
  return (
    <Router>
      <Routes>
        
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<HomeDummy />} />
        {/* <Route path="/user/:id" element={<Details />} />  */}
        <Route path="/user/:id"  element={<PaginationPage />} /> 
       

      </Routes>
    </Router>
    
   
  );
}

export default App;

    
