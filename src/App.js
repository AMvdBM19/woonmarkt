import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HouseDetails from "./pages/HouseDetails";
import AddHouse from "./pages/AddHouse";
import EditHouse from "./pages/EditHouse";
import Listings from "./pages/Listings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/add" element={<AddHouse />} />
        <Route path="/house/:id" element={<HouseDetails />} />
        <Route path="/edit/:id" element={<EditHouse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#1e1b4b",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <h1>404</h1>
      <p>Page not found</p>
      <a href="/" style={{ color: "#8b5cf6", marginTop: "20px" }}>Go Home</a>
    </div>
  );
}

export default App;
