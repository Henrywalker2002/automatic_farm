<<<<<<< HEAD
import React, {  useState } from 'react';
import Axios from 'axios';
import './App.css';
function Condition() {
  const url="http://127.0.0.1:8000/schedule";
  const [data,setData]=useState({
    isEday:false,
    time:0
  })
  function submit(e){
    e.preventDefaul();
    Axios.post(url, {
    isEday: data.isEveryday,
    time:data.timeWater
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
  <div id="schedule">
    <div id="c1">Schedule</div>
    <div id="c2">The last time you watered was </div>
    <div id="formC"> 
<<<<<<< HEAD
        <form onSubmit={(e)=>submit(e)}>
      <label id="labbel">
      <img src= {require('./day.png')} alt="strawberry" id="img" />
      &#160; Everyday:  &#160; &#160;
      <input onChange={(e)=>handle(e)} value={data.isEveryday} type="checkbox" id="topping" name="isEday"  />
      {/* value="Paneer" */}
=======
        <form>
      <label id="labbel">
      <img src= {require('./day.png')} alt="strawberry" id="img" />
      &#160; Everyday:  &#160; &#160;
      <input type="checkbox" id="topping" name="topping" value="Paneer" />
>>>>>>> 11a717ce5038f3164e7081fa87eb0f6fbd9d86bc
      </label>
      
      <div>
      <label id="labbel">
      <img src= {require('./time.png')} alt="strawberry" id="img" />
      &#160; Set time:  &#160;  
<<<<<<< HEAD
        <input onChange={(e)=>handle(e)} value={data.timeWater} type="number" name="time" id="in" />
=======
        <input type="number" name="name" id="in" />
>>>>>>> 11a717ce5038f3164e7081fa87eb0f6fbd9d86bc
      </label>
      </div>
      <div>
      <label id="labbel">
      <img src= {require('./fer.png')} alt="strawberry" id="img" />
      &#160; Fertilizer:     &#160;   &#160;
      <input type="checkbox" id="topping" name="topping" value="Paneer" />
      </label>
      </div>
    </form>
    </div>
    
  </div>
  );
}

export default Condition;