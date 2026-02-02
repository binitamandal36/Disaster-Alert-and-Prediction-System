import React from "react";
import {Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DisasterList from "./components/DisasterList";
import Navbar from "./components/Navbar";
import Prediction from "./components/Prediction";
import Alerts from "./components/Alerts";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disasters" element={<DisasterList />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
