import React from "react";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Typography,
  Avatar,
  Box,
  Link,
  Stack,
  TextField,
  Button,
} from "@mui/material";
// import { useSnackbar } from "notistack";
import axios from "../utils/axios";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import useToken from '../utils/useToken';

const Login = () => {
  const { setToken, saveToken } = useToken()
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    axios
      .post("/token", loginForm)
      .then(res => {
        saveToken(res.data.access_token);
        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem("loggedInAs", loginForm.username)
        navigate('/home');
        console.log(res.data.access_token)
        console.log("successfully logged in")
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt={5}
        mx={"auto"}
      >
        <Box display="flex" mb={2} justifyContent="center">
          <Typography variant="h4">MPA Login</Typography>
        </Box>
        <form>
          <Stack
            spacing={2}
            mx={48}
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Avatar style={{ backgroundColor: "#8c54a0" }}>
              <LoginOutlinedIcon />
            </Avatar>
            <TextField
              name="username"
              id="username"
              label="User Name"
              fullWidth
              value={loginForm.username}
              placeholder="Enter your user name"
              required
              onChange={handleChange}
            />
            <TextField
              name="password"
              type="password"
              id="password"
              label="Password"
              required
              value={loginForm.password}
              onChange={handleChange}
              placeholder="Enter your password"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#8c54a0" }}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Login
            </Button>
          </Stack>
        </form>

        <Box display="flex" mt={2} justifyContent="center">
          <Typography mr={1}>No Account?</Typography>
          <Typography>
            <Link component={RouterLink} to="/register" color="#5b1c73">
              Register Here
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
