import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./adminPanel.module.css";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    startsAt: "",
    endsAt: "",
    isPublic: true,
  });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Adgang nægtet. Du skal være admin for at se denne side.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === "tab1") {
      fetchImages();
    } else if (activeTab === "tab2") {
      fetchEvents();
    }
  }, [activeTab]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://photobooth-lx7n9.ondigitalocean.app/photos?eventSlug=julefrokost-202"
      );
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Kunne ikke hente billeder");
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageId) => {
    if (!window.confirm("Er du sikker på at du vil slette dette billede?")) {
      return;
    }
    try {
      const response = await fetch(
        `https://photobooth-lx7n9.ondigitalocean.app/photo/${imageId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete image");
      setImages(images.filter((img) => img._id !== imageId));
      alert("Billede slettet");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Kunne ikke slette billede");
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://photobooth-lx7n9.ondigitalocean.app/events"
      );
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Kunne ikke hente events");
    } finally {
      setLoading(false);
    }
  };

  const saveEvent = async () => {
    if (!formData.title || !formData.startsAt) {
      alert("Titel og startdato er påkrævet");
      return;
    }

    try {
      if (editingEvent) {
        alert("Redigering af events er ikke tilgængelig via API");
        return;
      }

      const response = await fetch(
        "https://photobooth-lx7n9.ondigitalocean.app/event",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to create event");
      const newEvent = await response.json();
      setEvents([...events, newEvent.data]);
      alert("Event oprettet");
      resetForm();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Kunne ikke gemme event");
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm("Er du sikker på at du vil slette dette event?")) {
      return;
    }
    try {
      const response = await fetch(
        `https://photobooth-lx7n9.ondigitalocean.app/event/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete event");
      setEvents(events.filter((e) => e._id !== eventId));
      alert("Event slettet");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Kunne ikke slette event");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      startsAt: "",
      endsAt: "",
      isPublic: true,
    });
    setEditingEvent(null);
    setShowEventForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Velkommen til Admin Panelet</h1>
        <button>
          <Link to="/">Log ud</Link>
        </button>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "tab1" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Billeder
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "tab2" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Events
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "tab1" && (
          <div className={styles.imagesContainer}>
            {loading && <p>Indlæser billeder...</p>}
            {!loading && images.length === 0 && <p>Ingen billeder fundet</p>}
            {!loading && images.length > 0 && (
              <div className={styles.imageGrid}>
                {images.map((image) => (
                  <div key={image._id} className={styles.imageCard}>
                    <img
                      src={image.thumbUrl || image.url}
                      alt={image.originalFilename || "Billede"}
                      className={styles.imageThumbnail}
                    />
                    <p>{image.originalFilename}</p>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteImage(image._id)}
                    >
                      Slet
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "tab2" && (
          <div className={styles.eventsContainer}>
            <button
              className={styles.createButton}
              onClick={() => {
                setEditingEvent(null);
                setFormData({
                  title: "",
                  slug: "",
                  description: "",
                  startsAt: "",
                  endsAt: "",
                  isPublic: true,
                });
                setShowEventForm(true);
              }}
            >
              Opret Nyt Event
            </button>

            {showEventForm && (
              <div className={styles.eventForm}>
                <h3>{editingEvent ? "Rediger Event" : "Opret Nyt Event"}</h3>
                <input
                  type="text"
                  placeholder="Event titel"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Slug (URL-vennlig navn)"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                />
                <textarea
                  placeholder="Beskrivelse"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <label>
                  Startdato og tid:
                  <input
                    type="datetime-local"
                    value={formData.startsAt}
                    onChange={(e) =>
                      setFormData({ ...formData, startsAt: e.target.value })
                    }
                  />
                </label>
                <label>
                  Slutdato og tid:
                  <input
                    type="datetime-local"
                    value={formData.endsAt}
                    onChange={(e) =>
                      setFormData({ ...formData, endsAt: e.target.value })
                    }
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublic: e.target.checked })
                    }
                  />
                  Offentlig event
                </label>
                <div className={styles.formButtons}>
                  <button className={styles.saveButton} onClick={saveEvent}>
                    Gem
                  </button>
                  <button className={styles.cancelButton} onClick={resetForm}>
                    Annuller
                  </button>
                </div>
              </div>
            )}

            {loading && <p>Indlæser events...</p>}
            {!loading && events.length === 0 && <p>Ingen events fundet</p>}
            {!loading && events.length > 0 && (
              <div className={styles.eventsList}>
                {events.map((event) => (
                  <div key={event._id} className={styles.eventCard}>
                    <div className={styles.eventInfo}>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      <p className={styles.eventDate}>
                        {new Date(event.startsAt).toLocaleString("da-DK")}
                        {event.endsAt &&
                          " - " +
                            new Date(event.endsAt).toLocaleString("da-DK")}
                      </p>
                      <p className={styles.eventStatus}>
                        {event.isPublic ? "Offentlig" : "Privat"}
                      </p>
                    </div>
                    <div className={styles.eventActions}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteEvent(event._id)}
                      >
                        Slet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
