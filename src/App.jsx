import './App.css'
import LoginModal from "./components/login/Login";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Gallery from "./pages/gallery/gallery";
import Home from "./pages/gallery/Home";
import SlideShow from "./pages/slideShow";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/slideshow" element={<SlideShow />} />
      </Routes>
    </BrowserRouter>
  );
}
