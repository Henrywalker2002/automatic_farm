import React from 'react'
import './Home.css'
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid"; 
import Button from '@mui/material/Button';
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
        <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
                <Box className= 'home-content'>
                  <p className='home-description'>Yolofarm is a system to help farmers manager their farm, Water and fertilizer the plant, turn up the light when the sun set,... </p>
                  <Button className='go-to-btn' onClick={() => {navigate("/login");}}> Go to YoLoFarm <BsFillArrowRightCircleFill className='arrow-icon'/></Button>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <Box className='blank'></Box>
            </Grid>
        </Grid>
    </div>
  )
}

export default Home