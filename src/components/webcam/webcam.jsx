import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import style from "../webcam/webcam.module.css";
import modal from "../webcam/modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function WebcamComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowModal(true);
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <div className={style.container}>
        <Webcam
          className={style.webcam}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
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
    </div>
  );
}
