import axios from 'axios';
import React, { useRef,useState } from 'react';
import "./FileCC.css";
import '../App.css';
import Navbar from "./Navbar";
import AudioRecorder from "./AudioRecorder";
import A_r from './A_r';
//import A_r from "./A_r";

function FileCC() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const audioRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('audio_file', selectedFile); // Ensure this matches the key expected by Flask

    axios.post('http://127.0.0.1:5000/predict_emotion', formData)
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        alert('Error uploading file');
        console.error('Error:', error);
      });
  };

  const handlePlay = () => {
    if (audioRef.current && selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      audioRef.current.src = objectURL;
      audioRef.current.load(); // Load the audio source
      audioRef.current.play().then(_ => {
        // Audio started playing
      }).catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  };

  const labelStyle = {
    color: 'green'
  };

  return (
    <>
      <Navbar/>
      <div className="center">
      <div className="container">
      
        <input type="file" accept='.wav' onChange={handleFileChange} />
        <button className='play-button' onClick={handlePlay} disabled={!selectedFile}>
          Play
        </button>
        <audio ref={audioRef} controls />
        <button className='detect-button' type="submit" onClick={handleUpload}>Detect</button>
        <div className="emo-result">
            <label>Recognized Emotion:</label>
            <label>	&ensp;</label>
            <label style={labelStyle}>{message}</label>
        </div>
      <A_r/>
      </div>
      </div>
      
    </>
  );
}

export default FileCC;
