import "./App.css";
import WebcamComponent from "./components/webcam/webcam";
import LoginModal from "./components/login/Login";
import { useState } from "react";

export default function App() {

  const [showModal, setShowModal] = useState(false)

  return (
    <>  
    <WebcamComponent />;
  
  <div>
    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
      Open Login Modal
    </button>
    <LoginModal show={showModal} onClose={() => setShowModal(false)} />
  </div>;
  </>

)
import FilterComponent from "./components/filter/filter";

export default function App() {
  return (
    <>
      <WebcamComponent>
        {(setSelectedFilter) => (
          <FilterComponent onSelectFilter={setSelectedFilter} />
        )}
      </WebcamComponent>
    </>
  );
}
