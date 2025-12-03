import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import style from "./webcam.module.css";

export default function WebcamComponent({ children }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);


  const handleFilterClick = (filterSrc) => {
    setSelectedFilter((prevFilter) =>
      prevFilter === filterSrc ? null : filterSrc
    );
  };


  const capture = useCallback(() => {
    const video = webcamRef.current.video;
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
      setCapturedImage(canvas.toDataURL("image/jpeg"));
    }
  }, [selectedFilter]);

  return (
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

        {selectedFilter && (
          <img
            src={selectedFilter}
            alt="Filter overlay"
            className={style.overlay}
          />
        )}
      </div>

      <button className={style.button} onClick={capture}>
        Tag billed
      </button>

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
