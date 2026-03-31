import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HouseDetails from "./pages/HouseDetails";
import AddHouse from "./pages/AddHouse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddHouse />} />
        <Route path="/house/:id" element={<HouseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;