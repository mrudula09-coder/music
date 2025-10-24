import React, { useState, useEffect } from 'react';
import { getAllSongs, searchSongs, getSongsByLanguage, getAvailableLanguages } from '../data/staticSongs';
import { useMusic } from '../context/MusicContext';
import SongOptionsWrapper from './SongOptionsWrapper';
import GenreBrowser from './GenreBrowser';

const StaticSongPlayer = () => {
  const [songs] = useState(getAllSongs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  
  // Use MusicContext instead of local audio state
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration, 
    playSong, 
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    formatTime 
  } = useMusic();

  useEffect(() => {
    // Update song list based on search and genre filter
    let songsToFilter = selectedGenre === 'all' 
      ? songs 
      : getSongsByLanguage(selectedGenre);
      
    if (searchQuery.trim() === '') {
      setFilteredSongs(songsToFilter);
    } else {
      // Search within the genre-filtered songs
      const searched = songsToFilter.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(searched);
    }
  }, [searchQuery, selectedGenre, songs]);

  const handlePlaySong = (song) => {
    const songIndex = filteredSongs.findIndex(s => s.id === song.id);
    playSong(song, filteredSongs, songIndex);
  };

  const playNextSong = () => {
    playNext();
  };

  const playPreviousSong = () => {
    playPrevious();
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;
    seekTo(time);
  };

  return (
    <div className="static-music-player">
      {/* Header Section */}
      <div className="player-header">
        <h1>🎵 My Music Collection</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Browse by Genre */}
      <GenreBrowser 
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        className="player-genre-browser"
      />

      {/* Song List */}
      <div className="song-list">
        <div className="list-header">
          <span className="col-number">#</span>
          <span className="col-title">Title</span>
          <span className="col-artist">Artist</span>
          <span className="col-album">Album</span>
          <span className="col-duration">Duration</span>
          <span className="col-actions">Actions</span>
        </div>
        
        {filteredSongs.map((song, index) => (
          <div
            key={song.id}
            className={`song-item song-card ${currentSong?.id === song.id ? 'active' : ''}`}
            data-language={song.language}
            onClick={() => handlePlaySong(song)}
          >
            <span className="col-number">
              {currentSong?.id === song.id && isPlaying ? '🎵' : index + 1}
            </span>
            <span className="col-title">
              <div className="title-info">
                {song.cover && <img src={song.cover} alt={song.title} className="song-cover" />}
                <span>{song.title}</span>
              </div>
            </span>
            <span className="col-artist">{song.artist}</span>
            <span className="col-album">{song.album}</span>
            <span className="col-duration">{song.duration}</span>
            <span className="col-actions">
              <SongOptionsWrapper 
                song={song} 
                position="table"
                showQuickActions={true}
                showThreeDots={true}
                className="song-options-always-visible"
              />
            </span>
          </div>
        ))}
      </div>

      {/* Player Controls */}
      {currentSong && (
        <div className="player-controls">
          <div className="now-playing">
            <div className="song-info">
              {currentSong.cover && (
                <img src={currentSong.cover} alt={currentSong.title} className="current-cover" />
              )}
              <div className="song-details">
                <div className="current-title">{currentSong.title}</div>
                <div className="current-artist">{currentSong.artist}</div>
              </div>
            </div>
          </div>

          <div className="controls-center">
            <div className="control-buttons">
              <button onClick={playPreviousSong} className="control-btn">⏮️</button>
              <button onClick={togglePlayPause} className="play-pause-btn">
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button onClick={playNextSong} className="control-btn">⏭️</button>
            </div>
            
            <div className="progress-container">
              <span className="time">{formatTime(currentTime)}</span>
              <div className="progress-bar" onClick={handleSeek}>
                <div 
                  className="progress-fill"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="time">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticSongPlayer;