import React, { useState } from "react";
import Navbar from "./Navbar";
import AudioPlayer from "./AudioPlayer";

function FileUpload() {
  const [songUploaded, setSongUploaded] = useState('Upload Audio');
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('audio_file', audioFile); // Assuming you have a variable named audioFile containing the selected audio file.

    try {
      const response = await fetch('http://localhost:5000/predict_emotion', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSongUploaded(result.predicted_emotion);
      } else {
        console.error('Failed to get prediction');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setIsLoading(false);
  };

  const textStyle = {
    color: songUploaded === 'Upload Audio' ? 'red' : 'green',
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="center">
          <AudioPlayer onSongUpload={handleSongUploadStatus} />
          <div className="emo-result">
            <label>Recognized Emotion:</label>
            <label>&ensp;</label>
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
