import React, { useState } from "react";
import axios from "../utils/axios";
import useToken from "../utils/useToken";
import { Typography, Button } from "@mui/material";
import NavBar from "../components/NavBar";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { setToken } = useToken();

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
