import WebcamComponent from "../../components/webcam/webcam";
import FilterComponent from "../../components/filter/filter";
import { Link } from "react-router-dom";


const Home = () => {
    return (
      <section>
        <WebcamComponent>
          {(setSelectedFilter) => (
            <FilterComponent onSelectFilter={setSelectedFilter} />
          )}
        </WebcamComponent>
        
          <Link to="/gallery">Se nissernes billedbog</Link> <br />
          
          <Link to="/slideshow">Slideshow</Link>
         

      </section>
    );
}

export default Home
