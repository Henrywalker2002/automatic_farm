import React, {  useState } from 'react';
import Axios from 'axios';
import '../App.css';
function Condition() {
  const url="http://103.77.173.109:8000/schedule";
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

    <div id="formC"> 
          <label id="labbel">
          <img src= {require('./img/tem.png')} alt="strawberry" id="img" />
          &#160; Temperature  &#160;  &#60;
            <input onChange={(e)=>handle(e)} value={data.temperature} type="number" name="tem" id="in" />
          </label>
          <div>
          <label id="labbel">
          <img src= {require('./img/soil.png')} alt="strawberry" id="img" />
          &#160; Soil moisture  &#160;   &#60;
            <input onChange={(e)=>handle(e)} value={data.soilMoisture}  type="number" name="soil" id="in" />
          </label>
          </div>
          <div>
            <label id="labbel">
            <img src= {require('./img/air.png')} alt="strawberry" id="img" />
            &#160; Air humidity     &#160;   &#60;
              <input onChange={(e)=>handle(e)} value={data.airHumidity} type="number" name="air" id="in" />
            </label>
          </div>
    </div>
    
  </div>
  );
}

export default Condition;