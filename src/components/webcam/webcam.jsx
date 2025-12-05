import { useRef, useCallback, useState } from "react";
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

    //  video spejlvendt
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

              <div className={modal.buttonRow}>
                <button className={modal.closeButton} onClick={closeModal}>
                  <FontAwesomeIcon icon={faTrash} /> I kulsækken
                </button>

                <button className={modal.closeButton} onClick={closeModal}>
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

      {children(handleFilterClick)}

    </div>
  );
}
