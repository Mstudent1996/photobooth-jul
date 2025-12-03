import "./App.css";
import WebcamComponent from "./components/webcam/webcam";
import FilterComponent from "./components/filter/filter";

function App() {
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

export default App;
