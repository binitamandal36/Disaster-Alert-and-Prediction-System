import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DisasterList from "./components/DisasterList";
import Navbar from "./components/Navbar";
import Alerts from "./components/Alerts";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disasters" element={<DisasterList />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
