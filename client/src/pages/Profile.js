import React, { useState } from "react";
import axios from "../utils/axios";
import useToken from "../utils/useToken";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { setToken } = useToken();

  const getData = () => {
    axios({
      method: "GET",
      url: "/profile",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res)
        res.access_token && setToken(res.access_token);
        setProfileData(res);
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
      <p>To get your profile details: </p>
      <button onClick={getData}>Click me</button>
      {profileData && (
        <div>
          <p>Name: {profileData.name}</p>
          <p>About me: {profileData.about}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
