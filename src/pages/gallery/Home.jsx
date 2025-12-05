import { Link } from "react-router-dom";
import FrontpageComp from "../../components/frontpage/FrontpageComp";


const Home = () => {

    return (
      <section>
        <FrontpageComp />
        
          <Link to="/gallery">Se nissernes billedbog</Link> <br />
          
          <Link to="/slideshow">Slideshow</Link>
         

      </section>
    );
}

export default Home
