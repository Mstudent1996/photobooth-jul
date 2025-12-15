import { useEffect, useState } from "react";
import styles from "./gallery.module.css";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const photosPerPage = 20;
  const [disabledLikes, setDisabledLikes] = useState({});


  /* for at få galleri fikset skal det hentes fra vores eget slug */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://photobooth-lx7n9.ondigitalocean.app/photos?eventSlug=julefrokost-202"
        );
        const data = await response.json();

        setPhotos(data.data);
      } catch (error) {
        console.error("Fejl ved hentning af billeder:", error);
      }
    }

    fetchData();
  }, []);

  async function handleLike(id) {
    if (disabledLikes[id]) return;

    setDisabledLikes((prev) => ({ ...prev, [id]: true }));

    try {
      await fetch(
        `https://photobooth-lx7n9.ondigitalocean.app/photo/${id}/like`,
        {
          method: "POST",
        }
      );

      // opdater UI
      setPhotos((prev) =>
        prev.map((photo) =>
          photo._id === id ? { ...photo, likes: (photo.likes ?? 0) + 1 } : photo
        )
      );
    } catch (error) {
      console.error("Like fejlede", error);
    }

    // enable igen efter 60 sek
    setTimeout(() => {
      setDisabledLikes((prev) => ({ ...prev, [id]: false }));
    }, 60_000);
  }


  const startIndex = currentPage * photosPerPage;
  const endIndex = startIndex + photosPerPage;
  const visiblePhotos = photos.slice(startIndex, endIndex);

  return (
    <div className={styles.page}>
      <h1>Nissernes Billedbog</h1>

      {/* Tilbage-knap frit placeret */}
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        Tilbage
      </button>

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
      <img
        className={styles.bell}
        src="src/assets/grafisk/bell.gif"
        alt="Bell"
      />

      <div className={styles.gallery}>
        {visiblePhotos.map((photo) => (
          <div key={photo._id} className={styles.card}>
            {/* Billedet */}
            <img
              className={styles.image}
              src={photo.thumbUrl || photo.url}
              alt={photo.originalFilename || "Billede fra nissernes billedbog"}
            />

            {/* Like-knap */}
            <button
              className={styles.likeButton}
              onClick={() => handleLike(photo._id)}
              disabled={disabledLikes[photo._id]}
            >
              <img src="src/assets/grafisk/likeHeartIcon.svg" alt="Like" />
            </button>

            {/* Likes-bar under billedet */}
            <div className={styles.likeBar}>
              <span className={styles.likeText}>{photo.likes || 0} ❤️</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.sideArrows}>
        <img
          className={styles.arrowUp}
          src="src/assets/grafisk/arrowUp.svg"
          alt="Pil op"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
        />
        <img
          className={styles.arrowDown}
          src="src/assets/grafisk/arrowDown.svg"
          alt="Pil ned"
          onClick={() =>
            setCurrentPage((p) =>
              (p + 1) * photosPerPage < photos.length ? p + 1 : p
            )
          }
        />
        <div className={styles.pageIndicator}>
          Side {currentPage + 1} af {Math.ceil(photos.length / photosPerPage)}
        </div>
      </div>
    </div>
  );
}
