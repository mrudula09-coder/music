import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';

const UploadSongs = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedSongs, setUploadedSongs] = useState([]);
  const { addSong } = useMusic();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const files = [...e.target.files];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const mp3Files = files.filter(file => 
      file.type === 'audio/mp3' || file.type === 'audio/mpeg' || file.name.toLowerCase().endsWith('.mp3')
    );

    mp3Files.forEach(file => {
      const audio = new Audio();
      const url = URL.createObjectURL(file);
      
      audio.addEventListener('loadedmetadata', () => {
        const newSong = {
          _id: Date.now().toString() + Math.random(),
          title: file.name.replace(/\.[^/.]+$/, ""),
          artist: "Local Artist",
          album: "Local Album", 
          genre: "Local",
          duration: Math.floor(audio.duration),
          src: url,
          playCount: 0,
          isLocal: true,
          coverImage: null
        };
        
        addSong(newSong);
        setUploadedSongs(prev => [...prev, newSong]);
      });
      
      audio.src = url;
    });
  };

  return (
    <div className="upload-songs-container">
      <div className="upload-header">
        <h2>Add Your Music</h2>
        <p>Upload your MP3 files to start listening</p>
      </div>

      <div
        className={`upload-dropzone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".mp3,audio/mp3,audio/mpeg"
          onChange={handleChange}
          className="file-input"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="upload-label">
          <div className="upload-icon">🎵</div>
          <div className="upload-text">
            <h3>Drag & drop your MP3 files here</h3>
            <p>or click to browse files</p>
          </div>
        </label>
      </div>

      {uploadedSongs.length > 0 && (
        <div className="uploaded-songs">
          <h3>Recently Added ({uploadedSongs.length})</h3>
          <div className="songs-list">
            {uploadedSongs.map((song) => (
              <div key={song._id} className="song-item">
                <div className="song-info">
                  <div className="song-title">{song.title}</div>
                  <div className="song-details">{song.artist} • {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</div>
                </div>
                <div className="song-status">✅ Added</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSongs;