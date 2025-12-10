import { useEffect, useState } from "react";
import styles from "./gallery.module.css";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://photobooth-lx7n9.ondigitalocean.app/photos?includePending=true"
        );
        const data = await response.json();

        setPhotos(data.data);
      } catch (error) {
        console.error("Fejl ved hentning af billeder:", error);
      }
    }

    fetchData();
  }, []);

  function handleLike(id) {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo._id === id ? { ...photo, likes: (photo.likes || 0) + 1 } : photo
      )
    );
  }

  return (
    <div className={styles.page}>
      <h1>Nissernes Billedbog</h1>

      <img
        className={styles.gingerbread}
        src="src/assets/grafisk/gingerbread.gif"
        alt="Gingerbread man"
      />
      <img
        className={styles.stocking}
        src="src/assets/grafisk/stocking.gif"
        alt="Stocking"
      />
      <img className={styles.bell} src="src/assets/grafisk/bell.gif" alt="Bell" />

      <div className={styles.gallery}>
        <div className={styles.backLabel}>Tilbage</div>

        {photos.map((photo) => (
          <div key={photo._id} className={styles.card}>
            <img
              className={styles.image}
              src={photo.thumbUrl || photo.url}
              alt={photo.originalFilename || "Billede fra nissernes billedbog"}
            />

            <button
              className={styles.likeButton}
              onClick={() => handleLike(photo._id)}
            >
              <img src="/assets/heart.png" alt="Like" />
            </button>

            <span className={styles.likeCount}>{photo.likes || 0}</span>
          </div>

          
        ))}
      </div>
          <div className={styles.arrows}>
              <img className={styles.arrowUp} src="src/assets/grafisk/arrowUp.svg" alt="Pil op" />
              <img className={styles.arrowDown} src="src/assets/grafisk/arrowDown.svg" alt="Pil ned" />
          </div>
    </div>
  );
}
