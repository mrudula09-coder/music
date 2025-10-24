import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';

const QueueDisplay = ({ className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { queue, currentSong } = useMusic();

  // Show queue only if there are items or a current song
  if (queue.length === 0 && !currentSong) {
    return null;
  }

  return (
    <div className={`queue-display ${className}`}>
      <div className="queue-header">
        <button 
          className="queue-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="queue-icon">▶️</div>
          <span>Up Next</span>
          <span className="queue-count">{queue.length}</span>
          <div className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}>
            ▼
          </div>
        </button>
      </div>

      {isExpanded && (
        <div className="queue-content">
          {/* Currently Playing */}
          {currentSong && (
            <div className="queue-section">
              <h4>Now Playing</h4>
              <div className="queue-item current-song">
                <div className="song-artwork">
                  <img 
                    src={currentSong.cover || currentSong.image} 
                    alt={currentSong.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/40x40?text=🎵';
                    }}
                  />
                </div>
                <div className="song-details">
                  <div className="song-title">{currentSong.title}</div>
                  <div className="song-artist">{currentSong.artist}</div>
                </div>
                <div className="playing-indicator">🎵</div>
              </div>
            </div>
          )}

          {/* Queue */}
          {queue.length > 0 && (
            <div className="queue-section">
              <h4>Next in Queue ({queue.length})</h4>
              <div className="queue-list">
                {queue.map((song, index) => (
                  <div key={`${song.id}-${index}`} className="queue-item">
                    <div className="song-number">{index + 1}</div>
                    <div className="song-artwork">
                      <img 
                        src={song.cover || song.image} 
                        alt={song.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40x40?text=🎵';
                        }}
                      />
                    </div>
                    <div className="song-details">
                      <div className="song-title">{song.title}</div>
                      <div className="song-artist">{song.artist}</div>
                    </div>
                    <div className="song-duration">{song.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {queue.length === 0 && currentSong && (
            <div className="empty-queue">
              <p>No songs in queue</p>
              <p className="empty-hint">Use "Play Next" on any song to add it here!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueueDisplay;