import { useEffect, useState } from "react";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://photobooth-lx7n9.ondigitalocean.app/photos"
        );
        const data = await response.json();

        console.log("API RESPONSE:", data);

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
          <div key={photo.id}>
            <img
              src={photo.imageUrl}
              alt={
                photo.title ? photo.title : "Billede fra nissernes billedbog"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
