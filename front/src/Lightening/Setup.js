import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Condition from './Condition';
import Schedule from './Schedule';
import axios from 'axios';
import './App.css';
import Lightening from './Lightening';
import { useNavigate } from 'react-router-dom';

function SetupLight() {
  const navigate = useNavigate()
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
    // var time = parseInt(event.target.time.value)
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
      "timeWater": 1,
      "username": "string"
    });
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'http://103.77.173.109:8000/schedule',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    var res = await axios(config)
    var json = await res.data
    console.log(json)
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
    <Button variant="Back" id="button" onClick={() => navigate('/light')}>Back</Button>{' '}
    <Button variant="Save" id="button" type = "submit">Save</Button>{' '}
    
    </div>
    </form>
  </div>
  );
}

export default SetupLight;