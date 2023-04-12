import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Title from './Title';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import MyNav from '../MyNav';

function Lightening() {
  if (localStorage.getItem("token") === null) {
    window.location.replace('/login')
  }
    return (
      <div>
        <MyNav />
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