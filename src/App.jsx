import "./App.css";
import WebcamComponent from "./components/webcam/webcam";
import LoginModal from "./components/login/Login";
import { useState } from "react";
import FilterComponent from "./components/filter/filter";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Gallery from "./pages/gallery/gallery";
import Home from "./pages/gallery/Home";

export default function App() {
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<LoginModal />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/home" element={<Home />} />
  </Routes>
  </BrowserRouter>

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <WebcamComponent>
        {(setSelectedFilter) => (
          <FilterComponent onSelectFilter={setSelectedFilter} />
        )}
      </WebcamComponent>

  <div>
    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
      Open Login Modal
    </button>
    <LoginModal show={showModal} onClose={() => setShowModal(false)} />
  </div>;
    </>
  );
}
