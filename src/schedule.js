import React from 'react';
import './App.css';
function Condition() {
  return (
  <div id="schedule">
    <div id="c1">Schedule</div>
    <div id="c2">The last time you watered was </div>
    <div id="formC"> 
        <form>
      <label id="labbel">
      <img src= {require('./day.png')} alt="strawberry" id="img" />
      &#160; Everyday:  &#160; &#160;
      <input type="checkbox" id="topping" name="topping" value="Paneer" />
      </label>
      
      <div>
      <label id="labbel">
      <img src= {require('./time.png')} alt="strawberry" id="img" />
      &#160; Set time:  &#160;  
        <input type="number" name="name" id="in" />
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