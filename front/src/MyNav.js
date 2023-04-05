import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Tabs from './Watering/Watering';
import Lightening from './Lightening/Lightening';
import './App.css';
function MyNav() {
  return (
      <Navbar id= "frame2" >
      <Container>
        <img src= {require('./logo_YoloFarm.png')} alt="strawberry" id="logo" />
        {/* <div id="nav"> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse >
          <Nav className="me-auto" id="nav">
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="/water">Watering</Nav.Link>
            <Nav.Link href="/light" >Lightening</Nav.Link>
            <Nav.Link href="/detection" >Intrusive Detection</Nav.Link>
            <Nav.Link href="/report" >Reporting</Nav.Link>
            
          </Nav>
          <nav>
          <NavDropdown title="Username" id="username">
                <NavDropdown.Item href="#action/3.1">Watering</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Lightening</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Intrusive Detection</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Reporting</NavDropdown.Item>
            </NavDropdown> 
          </nav>
          
        </Navbar.Collapse>
        {/* </div> */}
        
      </Container>
    </Navbar>
  );
}

export default MyNav;