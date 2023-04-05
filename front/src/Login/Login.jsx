import React from 'react'
import './Login.css'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; 
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";

function Login() {
  return (
    <div className="login-page">
        <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
                <Box className= 'login-box'>
                      <Avatar
                        variant ="square"
                        sx={{ width: 135, height: 106 }}
                        src={require('../logo_YoloFarm.png')}
                        className='logo_YoloFarm'
                      ></Avatar>
                      <h3 className='welcome'>Welcome back to YoloFarm</h3>
                      <h1 className='login-title'>Login</h1>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ml: "15em", mr: "12em" }}>
                          <TextField
                            required
                            // fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            color='success'
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "15em", mr: "12em" }}>
                          <TextField
                            required
                            // fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            color='success'
                            // style={{color: "#032D23"}}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "15em", mr: "14em" }}>
                          <Stack direction="row" spacing={2}>
                            <FormControlLabel
                              sx={{ width: "50%" }}
                              // onClick={() => setRemember(!remember)}
                              control={<Checkbox defaultChecked style={{color: "#229F27"}}/>}
                              label="Remember me"
                              className='remember-me'
                            />
                            <Typography
                              variant="body1"
                              component="span"
                              // onClick={() => {
                              //   navigate("/reset-password");
                              // }}
                              className='forgot-pw'
                            >
                              Forgot password?
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "15em", mr: "15em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth="true"
                            size="large"
                            className='login-btn'
                            color='success'
                          >
                            Login
                          </Button>
                        </Grid>
                      </Grid>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <Box className= 'img-bg'></Box>
            </Grid>
        </Grid>
    </div>
  )
}

export default Login