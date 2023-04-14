import Webcam from "react-webcam";
import React, { useState } from "react";
import url from "../url";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

var captureLoop = null;

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [doCapture, setDoCapture] = useState(false);
  const startCapturing = () => {
    setDoCapture(true);
    captureLoop = setInterval(() => {
      capture();
    }, 1000);
  };

  const stopCapturing = () => {
    setDoCapture(false);
    clearInterval(captureLoop);
  };
  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    let theForm = new FormData();
    const blob = dataURLtoBlob(imageSrc);
    theForm.append("image", blob);
    const response = await fetch(url + "/im_size", {
      method: "POST",
      body: theForm,
    });
    console.log(await response.json());
  };
  const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
  return (
    <>
      <Webcam
        audio={false}
        height={504}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={896}
        videoConstraints={videoConstraints}
      />
      {!doCapture && <button onClick={startCapturing}>Start Service</button>}
      {doCapture && <button onClick={stopCapturing}>Stop service</button>}
    </>
  );
};

export default WebcamCapture;
