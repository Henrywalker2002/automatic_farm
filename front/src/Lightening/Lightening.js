import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Info from "./Info"
import Setup from './Setup';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

function Lightening() {
    return (

      <Nav className = "nav">
        <Nav.Item>
          <Link to ="/lightinfor">Information</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to ="/lightsetup">Set up</Link>
        </Nav.Item>
        <Routes>
          <Route path = '/lighting/infor' element = {<Info />} />
        </Routes>
      </Nav>

  
    );
  }
  
  export default Lightening;