import "./App.css";
import WebcamComponent from "./components/webcam/webcam";
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
