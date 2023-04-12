import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import './report.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { format } from 'date-fns'
import MyNav from '../MyNav';

function Report() {
    if (localStorage.getItem("token") === null) {
        window.location.replace('/login')
    }
    const [data, setData] = useState([])
    const [temp, setTemp] = useState('')
    const [light, setLight] = useState('')
    const [soil, setSoil] = useState('')
    const [air, setAir] = useState('')
    const [startDate, setStartDate] = useState('2023-01-01')
    const [EndDate, setEndDate] = useState('2024-01-01')

    async function getData() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        const res = await fetch("http://103.77.173.109:8000/getAllData", requestOptions)
        const json = await res.json()
        if (json.result === "success") {
          setData(json.message)
        }
    }
    
      useEffect(() => {
        getData()
      }, [])

      var chartData = data.filter(e => 
        e.time >= startDate && e.time <= EndDate
      )
    
      var chart = (
        <ResponsiveContainer>
            <LineChart
            data={chartData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
        
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
        
            <Line type="monotone" dataKey= {temp} stroke="#1CFC25 " activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey= {soil} stroke="#75E37A" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey= {air} stroke="#229F27" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey= {light} stroke="#FFD233" activeDot={{ r: 8 }} />
            
            </LineChart>
        </ResponsiveContainer>
        )

        function handleT() {
            let t = document.getElementById('temperature').checked
            let l = document.getElementById('light').checked
            let a = document.getElementById('air').checked
            let s = document.getElementById('soil').checked
            var te = document.getElementsByClassName('box')[0]
            var t2 = document.getElementsByClassName('box')[1]
            var t3 = document.getElementsByClassName('box')[2]
            var t4 = document.getElementsByClassName('box')[3]
            
            if (t) {
                te.style = "background-color : #229F27; color : white "
            }
            else {
                te.style = "background-color : white; color : black "
            }

            if (l) {
                t2.style = "background-color : #229F27; color : white "
            }
            else {
                t2.style = "background-color : white; color : black "
            }

            if (s) {
                t4.style = "background-color : #229F27; color : white "
            }
            else {
                t4.style = "background-color : white; color : black "
            }

            if (a) {
                t3.style = "background-color : #229F27; color : white "
            }
            else {
                t3.style = "background-color : white; color : black "
            }

            if (t) setTemp("temperature") 
            else setTemp('')
            if (l) setLight("brightness") 
            else setLight('')
            if (a) setAir("airHumidity") 
            else setAir('')
            if (s) setSoil("soilMoisture") 
            else setSoil('')
        }

        var btnlst = (
            <div>
                <div className = "box">
                    <p> Temperature </p>
                    <input type='checkbox' id = "temperature" onChange={handleT}/>
                </div>
                <div className = "box">
                    <p> Brightness </p>
                    <input type='checkbox' id = "light" onChange={handleT}/>
                </div>
                <div className = "box">
                    <p> Soid Moisture </p>
                    <input type='checkbox' id = "air" onChange={handleT}/>
                </div>
                <div className = "box">
                    <p> Air Humidity </p>
                    <input type='checkbox' id = "soil" onChange={handleT}/>
                </div>
            </div>
        )
    function handleDate(e) {
        var date = format(e.target.valueAsDate, 'yyyy-MM-dd')
        return date
    }

    return (
        <div>
            <MyNav />
            <div class = "title">
                <img src =  {require("./img/reporticon.png")} alt = "reporticon" id = "reporticon"/>
                <p id = "title">REPORT</p>
            </div>

            <Container>
                <Row className='row1'>
                    <Col >
                        <div id='select-day'>
                            <input type='date' onChange={(e) => setStartDate(handleDate(e))}/>
                            <img src= {require('./img/arrowicon.png')} alt='arrow' id = "arrow"/>
                            <input type='date' onChange={(e) => setEndDate(handleDate(e))}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs = {3} className='col1'>
                       {btnlst} 
                    </Col>
                    <Col className='reportContainer'>
                        {chart}
                    </Col>
                </Row>
            </Container>

        </div>
    ) 
}

export default Report;