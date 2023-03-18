import React, {createContext} from 'react';
import Nav from 'react-bootstrap/Nav';
import Title from './Title';
import Infor from "./Info"
import Setup from './Setup';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import '../Nhi.css';

function Watering() {
  return (
    <div>
      <Title/>

      <Nav className = "nav">
        <Nav.Item>
          <Link to ="/water/infor">Information</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to ="/water/setup">Set up</Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Watering;