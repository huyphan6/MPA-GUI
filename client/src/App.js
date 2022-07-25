import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import axios from './utils/axios';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="Content">
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
                  
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
