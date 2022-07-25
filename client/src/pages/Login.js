import React from "react";
import { useState } from "react";
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

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    axios
      .post("/login", { username: username, password: password })
      .then(navigate("/home"))
      .catch(() => {
        console.log("Invalid username or password");
      });
  };

  return (
    <div>
      <Box
        component="form"
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
              value={username}
              placeholder="Enter your user name"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              name="password"
              type="password"
              id="password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
