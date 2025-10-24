import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import SongOptionsWrapper from './SongOptionsWrapper';
import UploadSongs from './UploadSongs';

const Songs = () => {
  const { songs, playSong, removeSong, currentSong } = useMusic();
  const [showUpload, setShowUpload] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [filterBy, setFilterBy] = useState('');

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(filterBy.toLowerCase()) ||
    song.artist.toLowerCase().includes(filterBy.toLowerCase()) ||
    song.album.toLowerCase().includes(filterBy.toLowerCase())
  );

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'album':
        return a.album.localeCompare(b.album);
      case 'duration':
        return a.duration - b.duration;
      case 'playCount':
        return (b.playCount || 0) - (a.playCount || 0);
      default:
        return 0;
    }
  });

  const formatDuration = (duration) => {
    if (!duration) return '0:00';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlaySong = (song, index) => {
    playSong(song, sortedSongs, index);
  };

  return (
    <div className="songs-container">
      <div className="songs-header">
        <div className="songs-title">
          <h1>Your Music</h1>
          <p>{songs.length} songs</p>
        </div>
        <div className="songs-actions">
          <button 
            className="upload-btn"
            onClick={() => setShowUpload(true)}
          >
            <i className="fas fa-plus"></i>
            Add Songs
          </button>
        </div>
      </div>

      <div className="songs-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Filter songs..."
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="sort-options">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="duration">Duration</option>
            <option value="playCount">Play Count</option>
          </select>
        </div>
      </div>

      {songs.length === 0 ? (
        <div className="empty-songs">
          <i className="fas fa-music"></i>
          <h3>No songs yet</h3>
          <p>Upload your first MP3 files to get started</p>
          <button 
            className="upload-btn-large"
            onClick={() => setShowUpload(true)}
          >
            <i className="fas fa-upload"></i>
            Upload Songs
          </button>
        </div>
      ) : (
        <div className="songs-table">
          <div className="table-header">
            <div className="col-number">#</div>
            <div className="col-title">Title</div>
            <div className="col-artist">Artist</div>
            <div className="col-album">Album</div>
            <div className="col-duration">
              <i className="far fa-clock"></i>
            </div>
            <div className="col-actions">Actions</div>
          </div>
          <div className="table-body">
            {sortedSongs.map((song, index) => (
              <div 
                key={song._id}
                className={`song-row song-card ${currentSong?._id === song._id ? 'playing' : ''}`}
                onDoubleClick={() => handlePlaySong(song, index)}
              >
                <div className="col-number">
                  {currentSong?._id === song._id ? (
                    <div className="playing-indicator">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  ) : (
                    <span className="track-number">{index + 1}</span>
                  )}
                </div>
                <div className="col-title">
                  <div className="song-info">
                    <img 
                      src={song.albumArt || 'https://via.placeholder.com/40x40?text=♪'} 
                      alt={song.title}
                      className="song-thumbnail"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/40x40?text=♪';
                      }}
                    />
                    <div>
                      <div className="song-title">{song.title}</div>
                    </div>
                  </div>
                </div>
                <div className="col-artist">{song.artist}</div>
                <div className="col-album">{song.album}</div>
                <div className="col-duration">{formatDuration(song.duration)}</div>
                <div className="col-actions">
                  <button
                    className="action-btn play-btn"
                    onClick={() => handlePlaySong(song, index)}
                    title="Play"
                  >
                    <i className="fas fa-play"></i>
                  </button>
                  <SongOptionsWrapper 
                    song={song} 
                    position="table"
                    showQuickActions={true}
                    showThreeDots={true}
                  />
                  <button
                    className="action-btn remove-btn"
                    onClick={() => removeSong(song._id)}
                    title="Remove"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showUpload && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload Songs</h2>
              <button 
                className="modal-close"
                onClick={() => setShowUpload(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <UploadSongs onClose={() => setShowUpload(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Songs;