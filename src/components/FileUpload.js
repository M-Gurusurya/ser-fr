import React, { useState } from "react";
import '../App.css';
import Navbar from "./Navbar";
import AudioPlayer from "./AudioPlayer";

function FileUpload() {
  const [songUploaded, setSongUploaded] = useState('Upload Audio');
  const handleSongUploadStatus = (status) => {
    setSongUploaded(status);
  };
 

  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
  };

  const textStyle = {
    color: songUploaded === 'Upload Audio'? 'red' : 'green',
  };

  return (
    <>
    <Navbar/>
    <div className="container">
        <div className="center">
          <AudioPlayer onSongUpload={handleSongUploadStatus}/>
          <div className="emo-result">
            <label>Recognized Emotion:</label>
            <label>	&ensp;</label>
            <label style={textStyle}>{songUploaded}</label>
          </div>
          <div className="loading-button-container">
            <button className={`loading-button ${isLoading ? 'spinning' : ''}`} onClick={handleButtonClick}>
              Detect
          </button>
        </div>
        </div>
    </div>
    </>
  );
}

export default FileUpload;

//<button className="detection-btn">Detect Emotion</button>
