import React, { useState } from 'react';
import SongOptionsMenu from './SongOptionsMenu';
import QuickActions from './QuickActions';
import './SongOptionsMenu.css';

const SongOptionsWrapper = ({ 
  song, 
  showQuickActions = true, 
  showThreeDots = true,
  position = "card", // "card", "table", "list"
  className = ""
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  if (position === "table") {
    // Table row layout - horizontal actions
    return (
      <div className={`song-options-wrapper table-layout ${className}`}>
        {showQuickActions && (
          <QuickActions song={song} className="table-quick-actions" />
        )}
        {showThreeDots && (
          <div className="song-options-container">
            <button 
              className="song-options-button"
              onClick={handleMenuToggle}
              title="More options"
            >
              ⋯
            </button>
            {isMenuOpen && (
              <SongOptionsMenu 
                song={song} 
                onClose={handleMenuClose}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  // Card/list layout - overlay actions
  return (
    <div className={`song-options-wrapper card-layout ${className}`}>
      <div className="overlay-actions">
        {showQuickActions && (
          <QuickActions song={song} className="overlay-quick-actions" />
        )}
        {showThreeDots && (
          <div className="song-options-container">
            <button 
              className="song-options-button"
              onClick={handleMenuToggle}
              title="More options"
            >
              ⋯
            </button>
            {isMenuOpen && (
              <SongOptionsMenu 
                song={song} 
                onClose={handleMenuClose}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongOptionsWrapper;