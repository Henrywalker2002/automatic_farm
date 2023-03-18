import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Condition from './condition';
import Schedule from './schedule';
import axios from 'axios';
import './App.css';
import Tabs from './Tabs';
function Setup() {
  function helper(str) {
    if (str.length === 1) {
      return '0' + str
    }
    return str
  }

  async function waterNow(event) {
    event.preventDefault()
    var data = JSON.stringify({
      "type_": 1,
      "timeWater": 2
    });
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/actionNow',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    var res = await axios(config)
    var json = await res.data
    if (json.result === "success") {
      window.location.reload()
    }
    else {
      alert(json.message)
    }
  }

  async function handleData(event) {
    event.preventDefault()
    var tempCond = parseInt(event.target.tem.value)
    var isEveryday = event.target.isEday.checked
    var soilMoisture = parseInt(event.target.soil.value)
    var humidity = parseInt(event.target.air.value)
    var time = parseInt(event.target.time.value)
    var isFertilize = event.target.fertilize.checked
    var type_ = 1, date = null
    if (isFertilize) {
      type_ = 2
    }
    else {
      type_ = 1
    }
    if (!isEveryday) {
      var day = helper(new Date().getDay().toString())
      var month = helper(new Date().getMonth().toString())
      var year = new Date().getFullYear().toString()
      date = day + '/' + month + '/' + year
    }
    // begin call json
    var data = JSON.stringify({
      "type_": type_,
      "airHumidity": humidity,
      "soilMoisture": soilMoisture,
      "temperature": tempCond,
      "isEveryday": isEveryday,
      "date": date,
      "timeWater": time,
      "username": "string"
    });
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/schedule',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    console.log(typeof(tempCond))
    var res = await axios(config)
    var json = await res.data
    if (json.result === "success") {
      window.location.reload()
    }
  }

  return (

  <div>
    <Tabs/>
    <form id = "setupCond" onSubmit={handleData} >
    <Container>
      <Row id="contain_setup">
        <Col>
            <Condition/>
        </Col>
        <Col>
        <Schedule/>
        </Col>
      </Row>
      
    </Container>

    <div id="button_contain">
    <Button variant="Back" id="button">Back</Button>{' '}
    <Button variant="Save" id="button" type = "submit">Save</Button>{' '}
    
    </div>
    </form>
  </div>
  );
}

export default Setup;