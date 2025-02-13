import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ProductPage from "./Pages/ProductPage";
import Contact from "./Pages/Contact";
import Pricing from "./Pages/Pricing";
import Programme from "./Pages/Programme";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/main" element={<ProductPage/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/pricing" element={<Pricing/>}/>
      <Route path="/programs" element={<Programme/>}/>
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
