import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Info from "./Info"
import Setup from './Setup';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

function Lightening() {
    return (
      <Router>
      <Nav className = "nav">
        <Nav.Item>
          <Link to ="/Lightening/infor">Information</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to ="/Lightening/setup">Set up</Link>
        </Nav.Item>
      </Nav>
      <Routes>
          <Route exact path='/Lightening/infor' element={<Info/>} />
          <Route exact path='/Lightening/setup' element={<Setup/>} />
      </Routes>
      </Router>
  
    );
  }
  
  export default Lightening;