import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Info from "./Info"
import Setup from './Setup';
import Title from './Title';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

function Lightening() {
    return (
      <div>
        <Title/>
        <Nav className = "nav">
        <Nav.Item>
          <Link to ="/light/infor">Information</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to ="/light/setup">Set up</Link>
        </Nav.Item>
      </Nav>
      </div>
      

  
    );
  }
  
  export default Lightening;