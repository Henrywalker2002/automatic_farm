import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Infor from "./Infor"
import Setup from './setup';
import Lightening from './Lightening/Lightening'
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import './Nhi.css';

function Tabs() {
  return (
    <Router>
    <Nav className = "nav">
      <Nav.Item>
        <Link to ="/infor">Information</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to ="/setup">Set up</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to ="/lighting">Lightening</Link>
      </Nav.Item>
    </Nav>
    <Routes>
        <Route exact path='/infor' element={<Infor/>} />
        <Route exact path='/setup' element={< Setup/>} />
        <Route exact path='/setup' element={< Setup/>} />
    </Routes>
    </Router>

  );
}

export default Tabs;