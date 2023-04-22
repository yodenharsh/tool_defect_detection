import React from "react";
import { useState } from "react";
import "./App.css";
import WebcamCapture from "./components/Webcam";
import Header from "./components/TheHeader";
import Footer from "./components/TheFooter";
import ViewResponse from "./components/ViewResponse";

function App() {
  const [responseData, setResponseData] = useState(null);

  return (
    <React.Fragment>
      <Header />
      <WebcamCapture setResponseData={setResponseData} />
      <ViewResponse responseData={responseData} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
