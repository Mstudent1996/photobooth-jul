import "./App.css";
import LoginModal from "./components/login/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
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
    </BrowserRouter>
  );
}
