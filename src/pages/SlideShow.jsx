import Slideshow from "../components/slideshow/slideShow";
import Styles from "../components/slideshow/slideShow.module.css";
import Likecomponent from "../components/likeComponent/likeComponent";

const Home = () => {

    return (
      <section className={Styles.slideshowContainer}>
        <Slideshow />
        <Likecomponent />
      </section>
    );
}

export default Home
