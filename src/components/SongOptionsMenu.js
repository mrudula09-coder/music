import React, { useState, useRef, useEffect } from 'react';
import { useMusic } from '../context/MusicContext';
import './SongOptionsMenu.css';

const SongOptionsMenu = ({ song, onClose }) => {
  const { 
    addToQueueNext, 
    toggleLike, 
    isSongLiked, 
    addToPlaylist, 
    userPlaylists, 
    createPlaylist 
  } = useMusic();
  
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handlePlayNext = () => {
    addToQueueNext(song);
    onClose();
  };

  const handleToggleLike = () => {
    toggleLike(song.id);
    onClose();
  };

  const handleAddToPlaylist = (playlistId) => {
    addToPlaylist(playlistId, song);
    setShowPlaylists(false);
    onClose();
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = createPlaylist(newPlaylistName.trim());
      addToPlaylist(newPlaylist.id, song);
      setNewPlaylistName('');
      setShowPlaylists(false);
      onClose();
    }
  };

  if (showPlaylists) {
    return (
      <div className="song-options-menu" ref={menuRef}>
        <div className="menu-header">
          <button 
            className="back-button"
            onClick={() => setShowPlaylists(false)}
          >
            ← Back
          </button>
          <span>Add to Playlist</span>
        </div>
        
        <div className="playlist-options">
          <div className="create-playlist">
            <input
              type="text"
              placeholder="Create new playlist"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
            />
            <button onClick={handleCreatePlaylist}>Create</button>
          </div>
          
          {userPlaylists.map(playlist => (
            <div 
              key={playlist.id}
              className="playlist-item"
              onClick={() => handleAddToPlaylist(playlist.id)}
            >
              <span>{playlist.name}</span>
              <span className="song-count">{playlist.songs.length} songs</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="song-options-menu" ref={menuRef}>
      <div className="menu-item" onClick={handlePlayNext}>
        <span className="menu-icon">⏭️</span>
        <span>Play next</span>
      </div>
      
      <div className="menu-item" onClick={handleToggleLike}>
        <span className="menu-icon">
          {isSongLiked(song.id) ? '❤️' : '🤍'}
        </span>
        <span>{isSongLiked(song.id) ? 'Remove from liked' : 'Add to liked'}</span>
      </div>
      
      <div className="menu-item" onClick={() => setShowPlaylists(true)}>
        <span className="menu-icon">📁</span>
        <span>Add to playlist</span>
      </div>
    </div>
  );
};

export default SongOptionsMenu;