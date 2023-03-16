// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {  useState } from 'react';
import Axios from 'axios';
import {MdLight} from "react-icons/md";
import './App.css';
function Condition() {
  const url="http://127.0.0.1:8000/schedule";
  const [data,setData]=useState({
    tem:0,
    soil:0,
    air:0
  })
  function submit(e){
    e.preventDefaul();
    Axios.post(url, {
    tem: data.temperature,
    soil:data.soilMoisture,
    air: data.airHumidity
    })
  }
  function handle(e){
    const newdata={...data}
    newdata[e.target.name]=e.target.value
    setData(newdata)
    console.log(newdata)
  }
  return (
  <div id="condition">
    <div id="c1">Conditions</div>
    <div id="c2">The last time you lightened was </div>
    <div id="formC"> 
          <label id="labbel">
          <MdLight className='icon'/>
          &#160; Brightness  &#160;  &#60;
            <input onChange={(e)=>handle(e)} value={data.temperature} type="number" name="tem" id="in" />
          </label>
    </div>
    
  </div>
  );
}

export default Condition;