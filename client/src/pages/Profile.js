import React from "react";
import { Typography } from "@mui/material";
import NavBar from "../components/NavBar";

const Profile = () => {

  const profile = localStorage.getItem("loggedInAs");

  return (

    <div> 
      <NavBar />

      <Typography variant="h4" align="center" mt={2} >
        Currently Logged in as User: {profile}
      </Typography>
    </div>
  );
};

export default Profile;
