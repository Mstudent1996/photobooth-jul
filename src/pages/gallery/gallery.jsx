import { useEffect, useState } from "react";
import "./gallery.module.css";


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

  return (
    <div>
      <h1>Nissernes Billedbog</h1>

      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo._id} data-likes={photo.likes || 0}>
            <img
              src={photo.thumbUrl || photo.url}
              alt={photo.originalFilename || "Billede fra nissernes billedbog"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}