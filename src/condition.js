// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
<<<<<<< HEAD
import React, {  useState } from 'react';
import Axios from 'axios';
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
=======
import React from 'react';
import './App.css';
function Condition() {
>>>>>>> 11a717ce5038f3164e7081fa87eb0f6fbd9d86bc
  return (
  <div id="condition">
    <div id="c1">Conditions</div>
    <div id="c2">The last time you watered was </div>
    <div id="formC"> 
<<<<<<< HEAD
        <form onSubmit={(e)=>submit(e)}>
      <label id="labbel">
      <img src= {require('./tem.png')} alt="strawberry" id="img" />
      &#160; Temperature  &#160;  &#62;
        <input onChange={(e)=>handle(e)} value={data.temperature} type="number" name="tem" id="in" />
=======
        <form>
      <label id="labbel">
      <img src= {require('./tem.png')} alt="strawberry" id="img" />
      &#160; Temperature  &#160;  &#62;
        <input type="number" name="name" id="in" />
>>>>>>> 11a717ce5038f3164e7081fa87eb0f6fbd9d86bc
      </label>
      <div>
      <label id="labbel">
      <img src= {require('./soil.png')} alt="strawberry" id="img" />
      &#160; Soil moisture  &#160;   &#60;
<<<<<<< HEAD
        <input onChange={(e)=>handle(e)} value={data.soilMoisture}  type="number" name="soil" id="in" />
=======
        <input type="number" name="name" id="in" />
>>>>>>> 11a717ce5038f3164e7081fa87eb0f6fbd9d86bc
      </label>
      </div>
      <div>
      <label id="labbel">
      <img src= {require('./air.png')} alt="strawberry" id="img" />
      &#160; Air humidity     &#160;   &#62;
<<<<<<< HEAD
        <input onChange={(e)=>handle(e)} value={data.airHumidity} type="number" name="air" id="in" />
=======
        <input type="number" name="name" id="in" />
>>>>>>> 11a717ce5038f3164e7081fa87eb0f6fbd9d86bc
      </label>
      </div>
    </form>
    </div>
    
  </div>
  );
}

export default Condition;