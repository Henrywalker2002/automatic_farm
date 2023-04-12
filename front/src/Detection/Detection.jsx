import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MyNav from '../MyNav';
import Title from './Title';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import './dec.css';
const host = "http://103.77.173.109:8000/"

function Detection() {

    if (localStorage.getItem("token") === null) {
        window.location.replace('/login')
    }

    const [state, setState] = useState('off')
    const [open, setOpen] = useState(false)
  
    useEffect(() => {
      const intervalId = setInterval(async () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        const res = await fetch(host + "getData", requestOptions);
        const response = await res.json()
        if (response.message.isDetectOn) {
            setState('off')
        } 
        else {
            setState('on')
        }
  
      }, 1000)
      return () => clearInterval(intervalId)
    }, [state])

    const [detect, setDetect] = useState([])

    async function getDetect() { 
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        let res = await fetch("http://103.77.173.109:8000/detection", requestOptions)
        let json = await res.json()
        setDetect(json.message)
        console.log(detect)
    }

    useEffect(() => {
        getDetect()
    }, [])

    var table = detect.map(e => {
        var date = new Date(e.time)
        return <p>{("Date: "+date.toLocaleDateString() + "     "+  "Time: "+date.toLocaleTimeString())}</p>
    })

    async function handle() {
        var flag;
        if (state =='on') {
            flag = true 
        }
        else {
            flag = false
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "flag": flag
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var res = await fetch("http://103.77.173.109:8000/controlDetection", requestOptions)
        var json = await res.json()
        if (json.result === "success") {
            setOpen(true)
        }

    }

    function handleClose(){
        setOpen(false)
    }
    return (
        <div>
            <MyNav/>
            <Title />
            <Container>
                <div id ="table">
                        {table} 
                </div>
            <Button variant="WaterNow" id="button_turn" type = ""  onClick={handle}>Turn {state}</Button>{' '}
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Success
                </DialogTitle>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Detection