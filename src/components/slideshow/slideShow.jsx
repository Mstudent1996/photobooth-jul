import { useEffect, useState } from "react";
import Styles from "./slideShow.module.css";

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
    <div className={Styles.slideshow}>
        <h1>Jeres julemagi</h1>
      <img
        src={src}
      />
    </div>
  );
}
