import React from "react";
import {Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DisasterList from "./components/DisasterList";
import Navbar from "./components/Navbar";
import Prediction from "./components/Prediction";
import Alerts from "./components/Alerts";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disasters" element={<DisasterList />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </>
  );
}

export default App;
