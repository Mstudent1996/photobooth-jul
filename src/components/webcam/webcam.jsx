import { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import style from "../webcam/webcam.module.css";
import modal from "../webcam/modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function WebcamComponent({ children }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = (filterSrc) => {
    setSelectedFilter((prevFilter) =>
      prevFilter === filterSrc ? null : filterSrc
    );
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowModal(true);
  }, []);

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const video = webcamRef.current?.video;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    // Bruger webcam og laver canvas så vi kan tegne filter oven på vores billed når det bliver taget
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (selectedFilter) {
      const img = new Image();
      img.src = selectedFilter;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/jpeg"));
      };
    } else {
      setTimeout(() => {
        setCapturedImage(canvas.toDataURL("image/jpeg"));
      }, 0);

    }
  }, [selectedFilter]);

  return (
    <div>
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
            Take Picture
          </button>
        </div>

        {showModal && (
          <div className={modal.overlay} onClick={closeModal}>
            <div className={modal.content} onClick={(e) => e.stopPropagation()}>
              <img src={capturedImage} alt="Captured" className={modal.image} />
              <button className={modal.closeButton} onClick={closeModal}>
                <FontAwesomeIcon icon={faTrash} /> I kulsækken
              </button>
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

      {children(handleFilterClick)}

      {capturedImage && (
        <div>
          <h3>Dit billed:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ maxWidth: "400px" }}
          />
        </div>
      )}
    </div>
  );
}
