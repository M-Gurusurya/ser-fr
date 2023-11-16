import React, { useRef, useState } from 'react';
import "./AudioPlayer.css";


const AudioPlayer = ({ onSongUpload }) => {
  const audioRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onSongUpload(file ? 'Happy' : 'Upload Audio');
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
  

  return (
    <div className="audio-player-container">
    <input type="file" accept="audio/*" onChange={handleFileChange} id="audio-input" />
    <button className='play-button' onClick={handlePlay} disabled={!selectedFile}>
      Play
    </button>
    <audio ref={audioRef} controls />
  </div>
  );
};

export default AudioPlayer;
