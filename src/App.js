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
      background: "var(--bg-dark)",
      color: "var(--text-white)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
    }}>
      <h1 style={{ fontSize: "72px", margin: 0, opacity: 0.3 }}>404</h1>
      <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>This property doesn't exist</p>
      <a href="/" style={{ color: "var(--primary-light)", marginTop: "24px", fontSize: "14px" }}>Return Home</a>
    </div>
  );
}

export default App;
