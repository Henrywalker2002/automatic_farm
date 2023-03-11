import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './Nhi.css';

function Tabs() {
  return (
    <Nav
      className = "nav"
    >
      <Nav.Item>
        <Nav.Link href="/info">Information</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/setup">Set up</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Tabs;