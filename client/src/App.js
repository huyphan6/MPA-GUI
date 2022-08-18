import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "./utils/axios";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import useToken from "./utils/useToken";
import Header from "./pages/Header";

function App() {
  const { token, setToken, saveToken, removeToken } = useToken();
  const loggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      <div className="App">
        {/* <Header token={removeToken} /> */}
        <div className="Content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={loggedIn ? <Home/> : <Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
