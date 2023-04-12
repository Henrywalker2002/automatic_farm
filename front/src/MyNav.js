import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import "./App.css";
import { useNavigate } from "react-router-dom";
import  { redirect } from 'react-router-dom'


function MyNav() {
  const navigate = useNavigate();
  // account menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // loginInfo

  const loginInfo = JSON.parse(localStorage.getItem('token'));
  return (
    <Navbar id="frame2">
      <Container>
        <img src={require("./logo_YoloFarm.png")} alt="strawberry" id="logo" />
        {/* <div id="nav"> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto" id="nav">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/water">Watering</Nav.Link>
            <Nav.Link href="/light">Lightening</Nav.Link>
            <Nav.Link href="/detection">Intrusive Detection</Nav.Link>
            <Nav.Link href="/report">Reporting</Nav.Link>
          </Nav>
          <nav>
            {/* <NavDropdown title="Username" id="username">
                <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
            </NavDropdown>  */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, backgroundColor: '#229F27' }}>{loginInfo.username[0]}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                 <h2 style={{alignItems :'center'}}>{loginInfo.username}</h2>
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{alignItems: 'center'}}>
                {/* {loginInfo.role} */}
                {loginInfo.role}
              </MenuItem>
              <Divider />
              {/* <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem> */}
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" sx={{color: "#229F27"}} />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={() => {localStorage.removeItem('token'); navigate('/')}}>
                <ListItemIcon>
                  <Logout fontSize="small" sx={{color: "#229F27"}} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </nav>
        </Navbar.Collapse>
        {/* </div> */}
      </Container>
    </Navbar>
  );
}

export default MyNav;