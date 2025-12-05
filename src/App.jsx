import "./App.css";
import LoginModal from "./components/login/Login";
import { useState } from "react";
import FilterComponent from "./components/filter/filter";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Gallery from "./pages/gallery/gallery";
import Home from "./pages/gallery/Home";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>

      <div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Open Login Modal
        </button>
        <LoginModal show={showModal} onClose={() => setShowModal(false)} />
      </div>

      <Link to="/gallery">Se nissernes billedbog</Link>
    </BrowserRouter>
  );
}
