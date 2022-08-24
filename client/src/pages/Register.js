import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Typography,
  Avatar,
  Box,
  Link,
  Stack,
  TextField,
  Button,
  Input
} from "@mui/material";
import axios from "../utils/axios";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const axiosSubmit = (event) => {
    axios
      .post("/register", {firstName: firstName, lastName: lastName, email: email, username: username, password: password })
      .then(
        navigate("/login")
        )
      .catch(() => {
        console.log("Invalid input");
      });
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
          <Typography variant="h4">MPA Resigtration</Typography>
        </Box>
        <form>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            direction="column"
            mx={48}
          >
            <TextField
              name="firstName"
              id="firstName"
              label="First Name"
              fullWidth
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
            <TextField
              name="lastName"
              id="lastName"
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
            <TextField
              name="email"
              id="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <TextField
              name="username"
              id="username"
              label="User Name"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your user name"
              required
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
                axiosSubmit();
              }}
            >
              Enter
            </Button>
          </Stack>
        </form>

        <Box display="flex" mt={2} justifyContent="center">
          <Typography mr={1}>Already Have An Account?</Typography>
          <Typography>
            <Link component={RouterLink} to="/login" color="#5b1c73">
              Login Here
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
