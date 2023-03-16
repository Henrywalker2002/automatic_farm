import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Chart from '../Chart';
import InfoTable from './InfoTable';
import axios from 'axios';
import './App.css';

function Info() {
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

    return (
        <div>
          <Container>
            <Row id="contain_setup">
              <Col>
                  <InfoTable/>
              </Col>
              <Col>
                    <Chart/>
              </Col>
            </Row>
            
          </Container>
          <div id="button_contain">
          <Button variant="Back" id="button">Back</Button>{' '}
          <Button variant="WaterNow" id="button" type = "" onClick={waterNow}>Lightening Now</Button>{' '}
          </div>
          
        </div>
    );
}

export default Info;