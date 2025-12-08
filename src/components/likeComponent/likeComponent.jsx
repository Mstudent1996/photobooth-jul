import { useState, useEffect } from "react";
import Styles from "./likeComponent.module.css";
import LikeHeart from "../../assets/grafisk/likeHeartIcon.svg";


export default function Top3Slideshow() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "https://photobooth-lx7n9.ondigitalocean.app/photos?includePending=true"
                );
                const data = await response.json();
                const top3 = (data.data || [])
                    .slice()
                    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                    .slice(0, 3);
                setSlides(top3);
            } catch (error) {
                console.error("Fejl ved hentning af slideshow:", error);
            }
        }
        fetchData();
    }, []);

    if (slides.length === 0) return <p>Henter billeder...</p>;

    return (
        <div className={Styles.slideshowTop3}>
            <h1>Vores top 3</h1>
            <div className={Styles.slideWrap}>
                {slides.map((s, i) => (
                    <div key={s.id ?? i} className={Styles.slideItem}>
                        
                        <div className={Styles.imageWrapper}>
                            <img src={s.url} className={Styles.slideImage} />
                        </div>

                        <div className={Styles.likes}>
                            <img src={LikeHeart} /> {s.likes || 0}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
