import Webcam from "react-webcam";
import React, { useState } from "react";
import url from "../url";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



const videoConstraints = {
  width: 1600,
  height: 900,
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
  // return (
  //   <>
  //     <Webcam
  //       audio={false}
  //       height={504}
  //       ref={webcamRef}
  //       screenshotFormat="image/jpeg"
  //       width={896}
  //       videoConstraints={videoConstraints}
  //     />
  //     {/* {!doCapture && <Button variant="success" onClick={startCapturing}>Start Service</Button>}
  //     {doCapture && <Button variant="danger" onClick={stopCapturing}>Stop service</Button>} */}

  //     <div style={{ display: 'block' }}>
  //     {!doCapture && <Button variant="success" onClick={startCapturing}>Start Service</Button>}
  //     {doCapture && <Button variant="danger" onClick={stopCapturing}>Stop service</Button>}
  //     </div>
  //   </>
  // );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={800}
        videoConstraints={videoConstraints}
        style={{ marginBottom: '4rem' }}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!doCapture && <Button variant="success" onClick={startCapturing}>Start Service</Button>}
        {doCapture && <Button variant="danger" onClick={stopCapturing}>Stop service</Button>}
      </div>
    </div>
  );
};

export default WebcamCapture;
