import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import style from "../webcam/webcam.module.css"

export default function WebcamComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <div className={style.container}>
        <Webcam className={style.webcam}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
        />
        <button className={style.button}
          onClick={capture}
        >
          Take Picture
        </button>
        {capturedImage && (
          <div>
            <h3>Captured Image:</h3>
            <img
              src={capturedImage}
              alt="Captured"
              style={{ maxWidth: "400px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
