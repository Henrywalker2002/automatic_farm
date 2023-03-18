import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Chart from './Chart';
import InfoTable from './InfoTable';
import './App.css';
import Tabs from './Tabs';
function Setup() {
  return (
  <div>
    <Tabs/>
    <Container>
      <Row id="contain_setup">
        <Col>
            <Chart/>
        </Col>
        <Col>
          <InfoTable/>
        </Col>
      </Row>
      
    </Container>
    <div id="button_contain">
    <Button variant="Back" id="button">Back</Button>{' '}
    <Button variant="Save" id="button">Save</Button>{' '}
    {/* <Button variant="WaterNow" id="button" type = "" onClick={waterNow}>Water Now</Button>{' '} */}
    </div>
    
  </div>
  );
}

export default Setup;