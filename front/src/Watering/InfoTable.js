import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import {FaTemperatureHigh} from "react-icons/fa";
import {TbWashTemperature5} from "react-icons/tb";
import {WiHumidity} from "react-icons/wi";
import {RiCelsiusFill} from "react-icons/ri";
import '../Nhi.css';

const host = "http://103.77.173.109:8000/"

function InfoTable() {
    const iconStyle = { color: "#0FA958", height: "30px", width: "30px"};
    const [data, setData] = useState(
        {"temperature" : 30, "soilMoisture": 50, "airHumidity": 50}
    );
    
    const [state, setState] = useState('on')

    const [act, setAct] = useState('off')
    const [lastDate, setLastDate] = useState('')
  
    useEffect(() => {
      const intervalId = setInterval(async () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        const res = await fetch(host + "getData", requestOptions);
        const response = await res.json()
        setData(response.message)
        setLastDate(response.message.lastTimeWater)
        if (response.message.isWatering || response.message.isFertilizing) {
            setState('on')
            setAct('off')
        } 
        else {
            setState('off')
            setAct('on')
        }
  
      }, 1000)
      return () => clearInterval(intervalId)
    }, [state, act])

    return (
        <Card className="stat">
          {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
          <Card.Body>
            <Card.Title>Today's statistics</Card.Title>
            <Card.Text>
                The last time you watered was {lastDate}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
                <FaTemperatureHigh style={iconStyle}/> 
                Temperature 
                <Badge bg="success">
                    {data.temperature}
                    <RiCelsiusFill/>
                </Badge> 
            </ListGroup.Item>
            <ListGroup.Item>
                <TbWashTemperature5 style={iconStyle}/> 
                Soil moisture 
                <Badge bg="success">{data.soilMoisture}</Badge> 
            </ListGroup.Item>
            <ListGroup.Item>
                <WiHumidity style={iconStyle}/> 
                Air humidity 
                <Badge bg="success">{data.airHumidity}</Badge> 
            </ListGroup.Item>
          </ListGroup>
        </Card>
    );
}

export default InfoTable;