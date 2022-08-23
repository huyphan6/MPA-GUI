import React, { useState } from "react";
import axios from "../utils/axios";
import useToken from "../utils/useToken";
import { Typography, Button, Stack, Table } from "@mui/material";

const Users = () => {
  const [userData, setUserData] = useState(null);
  const { setToken } = useToken();

  const getUserData = () => {
    axios({
      method: "GET",
      url: "/getUsers",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(userData);
        const res = response.data;
        console.log(res);
        res.access_token && setToken(res.access_token);
        setUserData(res);
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
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4">Show Authorized Users: </Typography>
      <Button variant="contained" color="primary" onClick={getUserData}>
        Click me
      </Button>
      {userData && (
        <div>
          {/* <Typography> {JSON.stringify(userData)} </Typography>  */}

          {userData.map((data, index) => {
            return (

              <div key={data}>
                <Typography variant="h6"> {index + ': ' + data} </Typography>
              </div> 

            );
          })}
        </div>
      )}
    </Stack>
  );
};

export default Users;
