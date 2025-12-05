import WebcamComponent from "../../components/webcam/webcam";
import FilterComponent from "../../components/filter/filter";

const Home = () => {
    return (
      <section>
        <p>Alle components ligger her</p>
        <WebcamComponent>
          {(setSelectedFilter) => (
            <FilterComponent onSelectFilter={setSelectedFilter} />
          )}
        </WebcamComponent>
      </section>
    );
}

export default Home
