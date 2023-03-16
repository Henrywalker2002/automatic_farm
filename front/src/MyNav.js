import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Tabs from './Tabs';
import Lightening from './Lightening/Lightening';
import './App.css';
function MyNav() {
  return (
      <Navbar id= "frame2" >
      <Container>
        <img src= {require('./logoY.png')} alt="strawberry" id="logo" />
        {/* <div id="nav"> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse >
          <Nav className="me-auto" id="nav">
            <Nav.Link href="#home" >Home</Nav.Link>
            <Nav.Link href="#aboutus">About us</Nav.Link>

            
              <NavDropdown title="Services" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/water" id="drop">
                    {/* <Link to ="/watering">Watering</Link> */}
                    Watering
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/lighting" id="drop">
                    Lightening
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" id="drop">Intrusive Detection</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4" id="drop">Reporting</NavDropdown.Item>  
              </NavDropdown> 
              
            

            <Nav.Link href="#home" >Projects</Nav.Link>
            <Nav.Link href="#home" >Contact</Nav.Link>
            
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