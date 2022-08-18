import React from "react";
import axios from "../utils/axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useToken from '../utils/useToken';
import { Button } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const { removeToken } = useToken();

  const logOut = () => {
    axios
      .post("/logout")
    //   .then(res => {
    //     removeToken()
    //     localStorage.removeItem("isLoggedIn")
    //     // navigate('/login');
    //     console.log("successfully removed token and logged out")
    //   })
  }

  return(
    <div>
        <Button color='inherit' onClick={logOut()}> Log Out </Button>
    </div>
    )
};

export default Header;
