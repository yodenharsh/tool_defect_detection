import Webcam from "react-webcam";
import React, { useState } from "react";
import url from "../url";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const videoConstraints = {
  width: 1600,
  height: 900,
  facingMode: "user",
};

var captureLoop = null;

const WebcamCapture = ({ setResponseData }) => {
  const webcamRef = React.useRef(null);
  const [doCapture, setDoCapture] = useState(false);
  const [firstConnect, setFirstConnect] = useState([true, null]);

  const startCapturing = () => {
    if (firstConnect[0]) {
      getSessionId().then((response) => {
        setFirstConnect([false, response.sessionId]);
        console.log(response.sessionId);
        setDoCapture(true);
        captureLoop = setInterval(() => {
          capture(response.sessionId);
        }, 5000);
      });
    } else {
      setDoCapture(true);
      captureLoop = setInterval(() => {
        capture(firstConnect[1]);
      }, 5000);
    }
  };

  const getSessionId = async () => {
    const response = await fetch(url + "/connect");
    const responseJson = await response.json();
    return await responseJson;
  };

  const stopCapturing = () => {
    setDoCapture(false);
    clearInterval(captureLoop);
  };
  const capture = async (sessionId) => {
    const imageSrc = webcamRef.current.getScreenshot();
    let theForm = new FormData();
    const blob = dataURLtoBlob(imageSrc);
    theForm.append("image", blob);
    const response = await fetch(url + "/im_size", {
      method: "POST",
      body: theForm,
    });
    const responseData = await response.json();
    responseData["sessionId"] = sessionId;
    setResponseData(responseData);
    console.log(responseData);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Webcam
        audio={false}
        height={550}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{ marginBottom: "2rem", marginTop: "-5rem" }}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {!doCapture && (
          <Button variant="success" onClick={startCapturing}>
            Start Service
          </Button>
        )}
        {doCapture && (
          <Button variant="danger" onClick={stopCapturing}>
            Stop service
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
