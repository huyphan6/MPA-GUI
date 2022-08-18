import React, { useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "../utils/axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useToken from '../utils/useToken';

const NavBar = () => {
  const navigate = useNavigate();
  const { removeToken } = useToken()
  
  const logOut = () => {
    axios
      .post("/logout")
      .then(res => {
        removeToken()
        localStorage.removeItem("isLoggedIn")
        navigate('/login');
        console.log("successfully removed token and logged out")
      })
  }
  

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button color='inherit' onClick={() => navigate("/profile")}> Profile </Button>
          <Button color='inherit' onClick={() => logOut()}> Log Out </Button>

        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
