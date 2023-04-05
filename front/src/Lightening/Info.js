import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Chart from '../Watering/Chart';
import InfoTable from './InfoTable';
import Lightening from './Lightening';
import axios from 'axios';
import './App.css';
import React from 'react';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';

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
          <Lightening/>
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
          <Button variant="WaterNow" id="button" type = "" onClick={handleClickOpen}>Lightening Now</Button>{' '}
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