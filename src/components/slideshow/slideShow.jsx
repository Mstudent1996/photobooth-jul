import { useEffect, useState } from "react";
import Styles from "./slideShow.module.css";
import gingerbread from "../../assets/grafisk/gingerbread.gif";
import reindeer from "../../assets/grafisk/reindeer.gif";
import tree from "../../assets/grafisk/tree.gif";
import bell from "../../assets/grafisk/bell.gif";
import gift from "../../assets/grafisk/gift.gif";
import reindeer2 from "../../assets/img2.png";

export default function Slideshow() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://photobooth-lx7n9.ondigitalocean.app/photos?includePending=true"
        );
        const data = await response.json();

        setSlides(data.data || []);
        setIndex(0);
      } catch (error) {
        console.error("Fejl ved hentning af slideshow:", error);
      }
    }

    fetchData();
  }, []);

  // Automatisk skift
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides]);

  if (slides.length === 0) return <p>Henter billeder...</p>;

  const current = slides[index];
  const src = current.url;

  return (
    <div>

        <div className={Styles.slideshow}>
          <h1>Jeres julemagi</h1>
          <img src={src}/>
        </div>

        <img className={Styles.gingerbread} src={gingerbread} />
        <img className={Styles.reindeer} src={reindeer} />
        <img className={Styles.tree} src={tree} />
        <img className={Styles.tree2} src={tree} />
        <img className={Styles.bell} src={bell} />
        <img className={Styles.gift} src={gift} />  
        <img className={Styles.reindeer2} src={reindeer2} />  
    </div>
  );
}
