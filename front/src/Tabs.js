import React, {createContext} from 'react';
import Nav from 'react-bootstrap/Nav';
import Title from './Title';
import Infor from "./Infor"
import Setup from './setup';
import Lightening from './Lightening/Lightening'
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import './Nhi.css';

function Tabs() {
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

export default Tabs;