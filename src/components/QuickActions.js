import React from 'react';
import { useMusic } from '../context/MusicContext';

const QuickActions = ({ song, showLabels = false, className = "" }) => {
  const { addToQueueNext, toggleLike, isSongLiked } = useMusic();

  const handlePlayNext = (e) => {
    e.stopPropagation();
    addToQueueNext(song);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    toggleLike(song.id);
  };

  return (
    <div className={`quick-actions ${className}`}>
      <button 
        className="quick-action-btn"
        onClick={handlePlayNext}
        title="Play next"
      >
        ⏭️
      </button>
      
      <button 
        className={`quick-action-btn ${isSongLiked(song.id) ? 'liked' : ''}`}
        onClick={handleToggleLike}
        title={isSongLiked(song.id) ? 'Remove from liked' : 'Add to liked'}
      >
        {isSongLiked(song.id) ? '❤️' : '🤍'}
      </button>
      
      {showLabels && (
        <div className="quick-actions-labels">
          <span>Play Next</span>
          <span>Like</span>
        </div>
      )}
    </div>
  );
};

export default QuickActions;