import React, { useState } from 'react';
import { getSongsByLanguage, getLanguageStats, getSongsByGenre, getGenreStats } from '../data/staticSongs';

const GenreBrowser = ({ selectedGenre, onGenreChange, className = "" }) => {
  const [viewMode, setViewMode] = useState('cards');
  const languageStats = getLanguageStats();
  const genreStats = getGenreStats();

  const genres = [
    {
      id: 'all',
      name: 'All Songs',
      icon: '🎵',
      description: 'Browse all songs',
      color: '#DAA520',
      count: Object.values(languageStats).reduce((a, b) => a + b, 0)
    },
    {
      id: 'bollywood',
      name: 'Bollywood',
      icon: '🇮🇳',
      description: 'Hindi Cinema Music',
      color: '#FF6B6B',
      language: 'Hindi',
      count: genreStats['Bollywood'] || 0
    },
    {
      id: 'tollywood',
      name: 'Tollywood',
      icon: '🎭',
      description: 'Telugu Cinema Music',
      color: '#4ECDC4',
      language: 'Telugu',
      count: genreStats['Tollywood'] || 0
    }
  ];

  const handleGenreClick = (genre) => {
    onGenreChange(genre.language || 'all');
  };

  return (
    <div className={`genre-browser ${className}`}>
      <div className="genre-header">
        <div className="genre-title-section">
          <span className="genre-title">Browse by Genre</span>
        </div>
        <div className="view-controls">
          <button 
            className={`view-toggle ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
            title="Card View"
          >
            ▦
          </button>
          <button 
            className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Card Layout */}
      {viewMode === 'cards' && (
        <div className="genre-grid">
          {genres.map(genre => (
            <div
              key={genre.id}
              className={`genre-card-enhanced ${selectedGenre === (genre.language || 'all') ? 'active' : ''}`}
              style={{ backgroundColor: genre.color }}
              onClick={() => handleGenreClick(genre)}
            >
              <div className="genre-icon-large">{genre.icon}</div>
              <div className="genre-info-enhanced">
                <div className="genre-name-large">{genre.name}</div>
                <div className="genre-count-large">{genre.count} songs</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List Layout */}
      {viewMode === 'list' && (
        <div className="genre-list">
          {genres.map(genre => (
            <div
              key={genre.id}
              className={`genre-list-item ${selectedGenre === (genre.language || 'all') ? 'active' : ''}`}
              onClick={() => handleGenreClick(genre)}
            >
              <div className="list-icon" style={{ backgroundColor: genre.color }}>
                {genre.icon}
              </div>
              <div className="list-content">
                <div className="list-main">
                  <div className="list-name">{genre.name}</div>
                  <div className="list-description">{genre.description}</div>
                </div>
                <div className="list-count">{genre.count} songs</div>
              </div>
              {selectedGenre === (genre.language || 'all') && (
                <div className="active-indicator">♪</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreBrowser;