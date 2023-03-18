import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import Chart from './Chart';
import InfoTable from './InfoTable';
import '../App.css';
import Title from './Title';
import Tabs from './Watering';
// import { Tabs } from '@material-ui/core';
function Info() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  async function waterNow(event) {
    event.preventDefault()
    var time = parseInt(event.target.water.value)
    var data = JSON.stringify({
      "type_": 1,
      "timeWater": time
    });
    // handleClose()
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
      // window.location.reload()
      handleClose()
    }
    else {
      alert(json.message)
    }
    
  }
  return (
  <div>
    <Tabs/>
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
    <Button variant="Save" id="button">Save</Button>{' '}
    <Button variant="WaterNow" id="button" type = ""  onClick={handleClickOpen}>Water Now</Button>{' '}
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
           How long do you want to set?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <input  type="number" name="water" id="in" />
          {/* onChange={(e)=>handle(e)} value={data.brightness} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           Close
          </Button>
          <Button onClick={waterNow} color="primary" autoFocus>
           Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  </div>
  );
}

export default Info;