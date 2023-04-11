import React from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "http://103.77.173.109:8000/checkAcc";

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: user,
      password: pwd,
    };
    try {
      const response = await axios.post(LOGIN_URL, userData);
      console.log(response.status, response.data);
      localStorage.setItem(
        "token",
        JSON.stringify({
          username: user,
          role: response.data.message,
        })
      );
      // setLoginInfo(user, response.data.message);
      // console.log(loginInfo);
      setUser("");
      setPwd("");
      setSuccess(true);
      // navigate("/water");
    } catch (error) {
      console.log(error);
      errRef.current.focus();
    }
  };
  return (
    <div className="login-page">
      <Grid container>
        <Grid item xs={12} sm={12} lg={6}>
          <Box className="login-box">
            <Avatar
              variant="square"
              sx={{ width: 135, height: 106 }}
              src={require("../logo_YoloFarm.png")}
              className="logo_YoloFarm"
            ></Avatar>
            <h3 className="welcome">Welcome to YoloFarm</h3>
            {!success && <h1 className="login-title">Login</h1>}
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            {success ? (
              <section>
                <h4 className="success-msg">You are logged in!</h4>
                <br />
                <button
                  className="next-btn"
                  onClick={() => {
                    navigate("/water");
                  }}
                >
                  Let go !
                </button>
              </section>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ ml: "15em", mr: "12em" }}>
                  <TextField
                    required
                    // fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    color="success"
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
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
                    color="success"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    // style={{color: "#032D23"}}
                  />
                </Grid>
                <Grid item xs={12} sx={{ ml: "15em", mr: "14em" }}>
                  <Stack direction="row" spacing={2}>
                    <FormControlLabel
                      sx={{ width: "50%" }}
                      // onClick={() => setRemember(!remember)}
                      control={
                        <Checkbox defaultChecked style={{ color: "#229F27" }} />
                      }
                      label="Remember me"
                      className="remember-me"
                    />
                    <Typography
                      variant="body1"
                      component="span"
                      // onClick={() => {
                      //   navigate("/reset-password");
                      // }}
                      className="forgot-pw"
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
                    className="login-btn"
                    color="success"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Box className="img-bg"></Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
