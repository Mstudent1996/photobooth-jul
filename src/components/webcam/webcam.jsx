import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import style from "../webcam/webcam.module.css";
import modal from "../webcam/modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import gingerbread from "../../assets/grafisk/gingerbread.gif";

// godkend foto efter upload
async function approvePhoto(photoId) {
  try {
    const res = await fetch(
      `https://photobooth-lx7n9.ondigitalocean.app/photo/${photoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isApproved: true,
        }),
      }
    );

    const data = await res.json();
    console.log("Photo approved:", data);
    return res.ok;
  } catch (err) {
    console.error("Failed to approve:", err);
    return false;
  }
}


// uploader billedet til API
async function uploadToApi(imageBase64) {
  try {
    const response = await fetch(imageBase64);
    const blob = await response.blob();
    const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", file);
    // Brug de værdier, der passer til dit event:
    formData.append("eventSlug", "skolefest-2025");
    formData.append("eventId", "69314c5c548558f23cf863bb");

    const res = await fetch(
      "https://photobooth-lx7n9.ondigitalocean.app/photo",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log("Upload success:", data);

    // hvis upload lykkes og vi har et id → approve
    const photoId = data?.data?._id;
    if (photoId) {
      const approved = await approvePhoto(photoId);
      return approved;
    }

    return false;
  } catch (error) {
    console.error("Fejl ved upload:", error);
    return false;
  }
}

export default function WebcamComponent({ selectedFilter }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFilterClick = (filterSrc) => {
    setSelectedFilter((prevFilter) =>
      prevFilter === filterSrc ? null : filterSrc
    );
  };

  const closeModal = () => setShowModal(false);

  /* Vi bruger CTX fordi vi skal have vores filter tegnet ovenpå vores "canvas aka vores billed"  */
  const capture = useCallback(async () => {
    const video = webcamRef.current?.video;
    if (!video) {
      const imageSrc = webcamRef.current?.getScreenshot();
      setCapturedImage(imageSrc);
      setShowModal(true);
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");

    // SPEJL KUN VIDEOEN
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    // video spejlvendt
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    ctx.restore();

    if (selectedFilter) {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = selectedFilter;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve();
        };
        img.onerror = reject;
      }).catch((err) => {
        console.warn("Kunne ikke loade filter-billede:", err);
      });
    }

    const dataUrl = canvas.toDataURL("image/jpeg");
    setCapturedImage(dataUrl);
    setShowModal(true);
  }, [selectedFilter]);

  // slet billede efter bekræftelse
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Er du sikker på, at billedet skal i kulsækken?"
    );
    if (confirmed) {
      setCapturedImage(null);
      closeModal();
    }
  };

  // upload + auto-approve + toast
  const handleUpload = async () => {
    const success = await uploadToApi(capturedImage);
    closeModal();

    if (success) {
      setSuccessMessage("Billedet blev tilføjet til Nissernes billedbog!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setSuccessMessage("Noget gik galt med upload/godkendelse.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className={style.layout}>
      <div className={style.filtersContainer}>
        {typeof children === "function" ? children(handleFilterClick) : null}
      </div>

      <div className={style.container}>
        <div className={style.webcamWrapper}>
          <Webcam
            className={style.webcam}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
            mirrored={true}
          />

          <button className={style.button} onClick={capture}>
            <img src={gingerbread} />
          </button>
        </div>

        {showModal && (
          <div className={modal.overlay} onClick={closeModal}>
            <div className={modal.content} onClick={(e) => e.stopPropagation()}>
              <img src={capturedImage} alt="Captured" className={modal.image} />

              <div className={modal.buttonRow}>
                <button className={modal.closeButton} onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} /> I kulsækken
                </button>

                <button className={modal.closeButton} onClick={handleUpload}>
                  Til Nissernes billedbog
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedFilter && (
          <img
            src={selectedFilter}
            alt="Filter overlay"
            className={style.overlay}
          />
        )}
      </div>

      {successMessage && <div className={modal.toast}>{successMessage}</div>}
    </div>
  );
}
