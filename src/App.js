import './App.css';

import React, { Component } from 'react';
import { ReactDOM } from 'react';

import Login from './pages/login/index';
import Register from './pages/register/index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/index';
import CreateProject from './pages/createProj/index';
import Projectdetails from './pages/projectDetails/index';
import Documentation from './common/documentation';

class App extends Component{
  render(){
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/register" element={<Register/>}></Route>
      <Route exact path="/dashboard" element={<Dashboard/>}></Route>
      <Route exact path="/createproject" element={<CreateProject/>}></Route>
      <Route exact path="/projectdetails" element={<Projectdetails/>}></Route>
      <Route exact path="/documentation" element={<Documentation/>}></Route>
    </Routes>
  </BrowserRouter>
  );
  }
}

export default App