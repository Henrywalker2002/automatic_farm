import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Chart from './Chart';
import InfoTable from './InfoTable';
import './App.css';
function Setup() {
  return (
  <div>
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
    </div>
    
  </div>
  );
}

export default Setup;