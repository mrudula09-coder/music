import React, { useState, useEffect, useRef } from 'react';
import { useMusic } from '../context/MusicContext';

const MusicPlayer = () => {
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const playlistMenuRef = useRef(null);
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    isBuffering,
    shuffle,
    repeat,
    isMuted,
    playlists,
    playSong,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setVolumeLevel,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    formatTime,
    addToQueueNext,
    addToPlaylist,
    createPlaylist
  } = useMusic();

  // Always show the player bar, even if no song is playing
  const displaySong = currentSong || {
    title: "No song playing",
    artist: "Select a song to start",
    albumArt: null
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;
    seekTo(time);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setVolumeLevel(percent);
  };

  const handlePlayNext = () => {
    if (currentSong) {
      addToQueueNext(currentSong);
    }
  };

  const handleAddToPlaylist = (playlistId) => {
    if (currentSong && playlistId) {
      addToPlaylist(playlistId, currentSong);
      setShowPlaylistMenu(false);
    }
  };

  const handleCreateNewPlaylist = () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName && playlistName.trim()) {
      const newPlaylist = createPlaylist(playlistName.trim());
      if (currentSong && newPlaylist) {
        addToPlaylist(newPlaylist.id, currentSong);
      }
      setShowPlaylistMenu(false);
    }
  };

  // Close playlist menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (playlistMenuRef.current && !playlistMenuRef.current.contains(event.target)) {
        setShowPlaylistMenu(false);
      }
    };

    if (showPlaylistMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPlaylistMenu]);

  return (
    <div className="spotify-music-player">
      <div className="player-left">
        {currentSong && (
          <>
            <div className="song-image">
              <img 
                src={displaySong.albumArt || displaySong.image || 'https://via.placeholder.com/56x56?text=♪'} 
                alt={displaySong.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/56x56?text=♪';
                }}
              />
            </div>
            <div className="song-details">
              <div className="song-title">{displaySong.title}</div>
              <div className="song-artist">{displaySong.artist}</div>
            </div>
          </>
        )}
      </div>

      <div className="player-center">
        <div className="player-controls-top">
          <button 
            className={`control-btn shuffle-btn ${shuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
              <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
            </svg>
          </button>
          <button className="control-btn prev-btn" onClick={playPrevious}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.588a.7.7 0 0 1-1.05.606L4 8.149V13.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"/>
            </svg>
          </button>
          <button className="play-pause-main" onClick={togglePlayPause} disabled={isLoading}>
            {isLoading || isBuffering ? (
              <div className="loading-spinner">⟳</div>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                {isPlaying ? (
                  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 9 14H7a1.5 1.5 0 0 1-1.5-1.5v-9z"/>
                ) : (
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                )}
              </svg>
            )}
          </button>
          <button className="control-btn next-btn" onClick={playNext}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.588a.7.7 0 0 0 1.05.607L12 8.149V13.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"/>
            </svg>
          </button>
          <button 
            className={`control-btn repeat-btn ${repeat !== 'off' ? 'active' : ''}`}
            onClick={toggleRepeat}
            title={`Repeat: ${repeat}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
            </svg>
          </button>
        </div>
        
        <div className="progress-section">
          <span className="time current-time">{formatTime(currentTime || 0)}</span>
          <div className="progress-track" onClick={handleSeek}>
            <div 
              className="progress-bar"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="time total-time">{formatTime(duration || 0)}</span>
        </div>
      </div>

      <div className="player-right">
        {/* Song Actions - positioned like in the second image */}
        {currentSong && (
          <>
            <button 
              className={`control-btn shuffle-btn-small ${shuffle ? 'active' : ''}`}
              onClick={toggleShuffle}
              title="Shuffle"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
              </svg>
            </button>
            
            <button 
              className="control-btn play-next-btn"
              onClick={handlePlayNext}
              title="Play Next"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.588a.7.7 0 0 0 1.05.607L12 8.149V13.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"/>
              </svg>
            </button>

            <button 
              className="control-btn queue-btn"
              title="Queue List"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            
            <div className="playlist-dropdown" ref={playlistMenuRef}>
              <button 
                className="control-btn playlist-btn"
                onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
                title="Add to Playlist"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </button>
              
              {showPlaylistMenu && (
                <div className="playlist-menu">
                  <div className="playlist-menu-header">Add to Playlist</div>
                  <button className="playlist-menu-item" onClick={handleCreateNewPlaylist}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Create New Playlist
                  </button>
                  {playlists.map(playlist => (
                    <button 
                      key={playlist.id} 
                      className="playlist-menu-item"
                      onClick={() => handleAddToPlaylist(playlist.id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3a5 5 0 0 0-4.546 2.914A.5.5 0 0 0 1 7h4.9A.5.5 0 0 1 6.5 7.5v1A.5.5 0 0 1 6 9H1a.5.5 0 0 0-.454.586A5 5 0 0 0 5 13a5 5 0 0 0 4.546-2.914A.5.5 0 0 0 9 9h-4.9a.5.5 0 0 1-.6-.5v-1A.5.5 0 0 1 4 7h5a.5.5 0 0 0 .454-.586A5 5 0 0 0 5 3z"/>
                      </svg>
                      {playlist.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        
        <div className="volume-section">
          <button className="control-btn volume-btn" onClick={toggleMute}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              {isMuted || volume === 0 ? (
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
              ) : volume < 0.3 ? (
                <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4z"/>
              ) : volume < 0.7 ? (
                <path d="M8 3a.5.5 0 0 0-.812-.39L4.825 4.5H2.5A.5.5 0 0 0 2 5v6a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 8 13V3zM5.312 5.39 7 4.04v7.92L5.312 10.61A.5.5 0 0 0 5 10.5H3v-5h2a.5.5 0 0 0 .312-.11zM10.025 8a2.5 2.5 0 0 1-.599 1.626l-.707-.707A1.5 1.5 0 0 0 9.025 8c0-.368-.138-.71-.306-.919l.707-.707A2.5 2.5 0 0 1 10.025 8z"/>
              ) : (
                <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707zM10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706zM10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.638-.244-1.247-.69-1.693l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4z"/>
              )}
            </svg>
          </button>
          <div className="volume-track" onClick={handleVolumeChange}>
            <div 
              className="volume-bar"
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <button className="control-btn fullscreen-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
