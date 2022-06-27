import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home";
import Product from "./pages/product";
import Admin from "./pages/admin";
import LoginComponent from "./component/LoginComponent";
import RegisterComponent from "./component/RegisterComponent";
import './style.css';
import AdminLoginComponent from "./component/AdminLoginComponent";
import Footer from "./component/FooterComponent"

function App() {

  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<LoginComponent/>} />
        <Route path="/admin-login" element={<AdminLoginComponent/>} />
        <Route path="/register" element={<RegisterComponent/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

