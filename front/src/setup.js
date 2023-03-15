import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Condition from './condition';
import Schedule from './schedule';
import './App.css';
function Setup() {
  function handleData(event) {
    console.log(event.target.tem.value)
    console.log(event.target.isEday.value)
    alert(event.target.isEday.checked)
  }
  return (

  <div>
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