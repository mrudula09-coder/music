import { useEffect } from 'react';
import { useMusic } from '../context/MusicContext';

export const useKeyboardShortcuts = () => {
  const { 
    togglePlayPause, 
    playNext, 
    playPrevious, 
    currentTime, 
    duration, 
    seekTo, 
    volume, 
    setVolumeLevel,
    toggleMute
  } = useMusic();

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't handle shortcuts if user is typing in an input field
      if (
        event.target.tagName === 'INPUT' || 
        event.target.tagName === 'TEXTAREA' ||
        event.target.contentEditable === 'true'
      ) {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          togglePlayPause();
          break;
        
        case 'ArrowRight':
          if (event.ctrlKey || event.metaKey) {
            // Ctrl/Cmd + Right Arrow: Next track
            event.preventDefault();
            playNext();
          } else {
            // Right Arrow: Skip forward 5 seconds
            event.preventDefault();
            const newTime = Math.min(currentTime + 5, duration);
            seekTo(newTime);
          }
          break;
        
        case 'ArrowLeft':
          if (event.ctrlKey || event.metaKey) {
            // Ctrl/Cmd + Left Arrow: Previous track
            event.preventDefault();
            playPrevious();
          } else {
            // Left Arrow: Skip backward 5 seconds
            event.preventDefault();
            const newTime = Math.max(currentTime - 5, 0);
            seekTo(newTime);
          }
          break;
        
        case 'ArrowUp':
          // Up Arrow: Volume up
          event.preventDefault();
          const newVolumeUp = Math.min(volume + 0.1, 1);
          setVolumeLevel(newVolumeUp);
          break;
        
        case 'ArrowDown':
          // Down Arrow: Volume down
          event.preventDefault();
          const newVolumeDown = Math.max(volume - 0.1, 0);
          setVolumeLevel(newVolumeDown);
          break;
        
        case 'KeyM':
          // M: Mute/Unmute
          event.preventDefault();
          toggleMute();
          break;
        
        default:
          break;
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [
    togglePlayPause, 
    playNext, 
    playPrevious, 
    currentTime, 
    duration, 
    seekTo, 
    volume, 
    setVolumeLevel,
    toggleMute
  ]);
};