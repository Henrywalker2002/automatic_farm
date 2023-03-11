// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import './App.css';
function Condition() {
  return (
  <div id="condition">
    <div id="c1">Conditions</div>
    <div id="c2">The last time you watered was </div>
    <div id="formC"> 
        <form>
      <label id="labbel">
      <img src= {require('./tem.png')} alt="strawberry" id="img" />
      &#160; Temperature  &#160;  &#62;
        <input type="number" name="name" id="in" />
      </label>
      <div>
      <label id="labbel">
      <img src= {require('./soil.png')} alt="strawberry" id="img" />
      &#160; Soil moisture  &#160;   &#60;
        <input type="number" name="name" id="in" />
      </label>
      </div>
      <div>
      <label id="labbel">
      <img src= {require('./air.png')} alt="strawberry" id="img" />
      &#160; Air humidity     &#160;   &#62;
        <input type="number" name="name" id="in" />
      </label>
      </div>
    </form>
    </div>
    
  </div>
  );
}

export default Condition;