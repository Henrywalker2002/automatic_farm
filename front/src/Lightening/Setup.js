import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Condition from './Condition';
import Schedule from './Schedule';
import axios from 'axios';
import './App.css';
import Lightening from './Lightening';

function SetupLight() {
  function helper(str) {
    if (str.length === 1) {
      return '0' + str
    }
    return str
  }

  async function handleData(event) {
    event.preventDefault()
    var isEveryday = event.target.isEday.checked
    var brightness = parseInt(event.target.brightness.value)
    var time = parseInt(event.target.time.value)
    var type_ = 3, date = null
    if (!isEveryday) {
      var day = helper(new Date().getDay().toString())
      var month = helper(new Date().getMonth().toString())
      var year = new Date().getFullYear().toString()
      date = day + '/' + month + '/' + year
    }
    // begin call json
    var data = JSON.stringify({
      "type_": type_,
      "brightness": brightness,
      // "soilMoisture": soilMoisture,
      // "temperature": tempCond,
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
    <Lightening/>
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

export default SetupLight;