import React from "react";
import "./App.css";
import WebcamCapture from "./components/Webcam";
import Header from "./components/TheHeader";
import Footer from "./components/TheFooter";

function App() {
  return (
    <React.Fragment>
      <Header />
      <WebcamCapture />
      <Footer />
    </React.Fragment>
  );
}

export default App;
