import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [queue, setQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off'); // 'off', 'one', 'all'
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [likedSongs, setLikedSongs] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([
    { id: 1, name: 'My Playlist #1', songs: [] },
    { id: 2, name: 'Favorites', songs: [] },
    { id: 3, name: 'Workout Mix', songs: [] }
  ]);
  const [toasts, setToasts] = useState([]);
  
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      setIsBuffering(false);
    };
    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlayThrough = () => setIsBuffering(false);
    const handleLoadedData = () => setIsLoading(false);
    const handleError = (e) => {
      console.error('Audio error:', e);
      setIsLoading(false);
      setIsBuffering(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
    };
  }, [repeat]);

  // Load saved songs and preferences from localStorage
  useEffect(() => {
    const savedSongs = localStorage.getItem('localSongs');
    if (savedSongs) {
      try {
        setSongs(JSON.parse(savedSongs));
      } catch (error) {
        console.error('Error loading saved songs:', error);
      }
    }

    // Load user preferences
    const savedVolume = localStorage.getItem('musicPlayerVolume');
    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      audioRef.current.volume = vol;
    }

    const savedShuffle = localStorage.getItem('musicPlayerShuffle');
    if (savedShuffle) {
      setShuffle(savedShuffle === 'true');
    }

    const savedRepeat = localStorage.getItem('musicPlayerRepeat');
    if (savedRepeat) {
      setRepeat(savedRepeat);
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('musicPlayerVolume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('musicPlayerShuffle', shuffle.toString());
  }, [shuffle]);

  useEffect(() => {
    localStorage.setItem('musicPlayerRepeat', repeat);
  }, [repeat]);

  // Save songs to localStorage whenever songs change
  useEffect(() => {
    if (songs.length > 0) {
      localStorage.setItem('localSongs', JSON.stringify(songs));
    }
  }, [songs]);

  // Test audio capabilities
  const testAudio = () => {
    console.log('🧪 Testing audio capabilities...');
    console.log('🔊 Audio context state:', window.AudioContext ? 'Available' : 'Not available');
    console.log('🎵 HTML5 Audio support:', window.Audio ? 'Available' : 'Not available');
    
    // Test if we can create an audio element
    try {
      const testAudioElement = new Audio();
      console.log('✅ Audio element created successfully');
      console.log('🔍 Audio element properties:', {
        canPlayType_mp3: testAudioElement.canPlayType('audio/mpeg'),
        volume: testAudioElement.volume,
        muted: testAudioElement.muted,
        readyState: testAudioElement.readyState
      });
    } catch (error) {
      console.error('❌ Failed to create audio element:', error);
    }
  };

  const playSong = async (song, songList = [], index = 0) => {
    console.log('🎵 PlaySong called with:', song.title, 'Source:', song.src);
    console.log('🔍 Full song object:', JSON.stringify(song, null, 2));
    console.log('🌐 Current location:', window.location.href);
    console.log('📁 Attempting to load audio from:', song.src);
    
    const songId = song._id || song.id;
    const currentSongId = currentSong?._id || currentSong?.id;
    
    if (currentSongId === songId) {
      console.log('🔄 Same song, toggling play/pause');
      togglePlayPause();
      return;
    }

    try {
      console.log('⏸️ Pausing current audio');
      // Pause current audio first
      audioRef.current.pause();
      setIsPlaying(false);
      
      // Small delay to ensure audio is properly paused
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('🎼 Setting new song:', song.title);
      setCurrentSong(song);
      setPlaylist(songList);
      setCurrentIndex(index);
      
      console.log('🔄 Setting audio source...');
      audioRef.current.src = song.src;
      console.log('🎯 Audio source set to:', audioRef.current.src);
      
      // Test if the audio can load
      console.log('🔍 Testing audio load...');
      audioRef.current.load(); // Force reload
      
      // Reset audio time and wait for it to be ready
      audioRef.current.currentTime = 0;
      console.log('▶️ Attempting to play audio...');
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('✅ Audio started playing successfully');
          setIsPlaying(true);
        }).catch(error => {
          console.error('❌ Play promise rejected:', error);
          console.error('🔍 Error name:', error.name);
          console.error('🔍 Error message:', error.message);
        });
      }
      
      // Add to recently played
      setRecentlyPlayed(prev => {
        const filtered = prev.filter(s => (s._id || s.id) !== songId);
        return [song, ...filtered].slice(0, 20);
      });
      
      // Update play count
      setSongs(prev => prev.map(s => 
        (s._id || s.id) === songId ? { ...s, playCount: (s.playCount || 0) + 1 } : s
      ));
    } catch (error) {
      console.error('❌ Playback error:', error);
      console.error('🔍 Audio source was:', audioRef.current?.src);
      console.error('🔍 Song object:', song);
      setIsLoading(false);
      setIsBuffering(false);
      setIsPlaying(false);
      
      // Log user-friendly error message
      if (error.name === 'AbortError') {
        console.log('Playback switched to new song');
      } else if (error.name === 'NotSupportedError') {
        console.error('Audio format not supported');
      } else if (error.name === 'NotAllowedError') {
        console.error('Audio playback blocked. Please enable autoplay.');
      } else {
        console.error('Failed to play audio. Please try again.');
      }
    }
  };

  const togglePlayPause = async () => {
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Playback toggle failed:', error);
      setIsPlaying(false);
    }
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playSong(nextSong, playlist, currentIndex);
    } else if (shuffle) {
      // Shuffle mode: play random song
      const availableSongs = playlist.filter((_, index) => index !== currentIndex);
      if (availableSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        const randomSong = availableSongs[randomIndex];
        const songIndex = playlist.findIndex(song => (song._id || song.id) === (randomSong._id || randomSong.id));
        playSong(randomSong, playlist, songIndex);
      }
    } else if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      playSong(playlist[nextIndex], playlist, nextIndex);
    } else if (repeat === 'all') {
      // Repeat all: go to first song
      playSong(playlist[0], playlist, 0);
    }
  };

  const playPrevious = () => {
    if (currentTime > 3) {
      // If more than 3 seconds played, restart current song
      seekTo(0);
    } else if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      playSong(playlist[prevIndex], playlist, prevIndex);
    } else if (repeat === 'all') {
      // Repeat all: go to last song
      const lastIndex = playlist.length - 1;
      playSong(playlist[lastIndex], playlist, lastIndex);
    }
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const setVolumeLevel = (newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    audioRef.current.volume = clampedVolume;
    if (clampedVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      audioRef.current.volume = previousVolume;
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeat(modes[nextIndex]);
  };

  const skipToTime = (time) => {
    seekTo(time);
  };

  // Play Next functionality
  const addToQueueNext = (song) => {
    // Add song to the front of the queue
    setQueue(prev => [song, ...prev]);
    showToast(`"${song.title}" added to play next!`);
  };

  // Like/Unlike functionality
  const toggleLike = (song) => {
    const songId = song._id || song.id;
    setLikedSongs(prev => {
      const isLiked = prev.some(s => (s._id || s.id) === songId);
      if (isLiked) {
        // Unlike - remove from liked songs
        showToast(`Removed "${song.title}" from liked songs`);
        return prev.filter(s => (s._id || s.id) !== songId);
      } else {
        // Like - add to liked songs
        showToast(`Added "${song.title}" to liked songs ❤️`);
        return [...prev, { ...song, likedAt: new Date() }];
      }
    });
  };

  // Check if song is liked
  const isSongLiked = (song) => {
    const songId = song._id || song.id;
    return likedSongs.some(s => (s._id || s.id) === songId);
  };

  // Add to playlist functionality
  const addToPlaylist = (playlistId, song) => {
    setUserPlaylists(prev => {
      return prev.map(playlist => {
        if (playlist.id === playlistId) {
          const songExists = playlist.songs.some(s => (s._id || s.id) === (song._id || song.id));
          if (!songExists) {
            showToast(`Added "${song.title}" to "${playlist.name}"`);
            return {
              ...playlist,
              songs: [...playlist.songs, { ...song, addedAt: new Date() }]
            };
          } else {
            showToast(`"${song.title}" is already in "${playlist.name}"`, 'info');
          }
        }
        return playlist;
      });
    });
  };

  // Remove from playlist
  const removeFromPlaylist = (song, playlistId) => {
    const songId = song._id || song.id;
    setUserPlaylists(prev => {
      return prev.map(playlist => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter(s => (s._id || s.id) !== songId)
          };
        }
        return playlist;
      });
    });
  };

  // Create new playlist
  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name: name,
      songs: [],
      createdAt: new Date()
    };
    setUserPlaylists(prev => [...prev, newPlaylist]);
    showToast(`Playlist "${name}" created successfully!`);
    return newPlaylist;
  };

  // Toast notification functions
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const addToQueue = (song) => {
    setQueue(prev => [...prev, song]);
  };

  const addSong = (newSong) => {
    setSongs(prev => {
      const exists = prev.find(s => s.title === newSong.title && s.artist === newSong.artist);
      if (exists) {
        return prev;
      }
      return [...prev, newSong];
    });
    return newSong;
  };

  const removeSong = (songId) => {
    setSongs(prev => prev.filter(song => (song._id || song.id) !== songId));
    const currentSongId = currentSong?._id || currentSong?.id;
    if (currentSongId === songId) {
      audioRef.current.pause();
      setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const value = {
    songs,
    setSongs,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    playlist,
    currentIndex,
    recentlyPlayed,
    queue,
    isLoading,
    isBuffering,
    shuffle,
    repeat,
    isMuted,
    likedSongs,
    userPlaylists,
    toasts,
    playSong,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setVolumeLevel,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    skipToTime,
    addToQueue,
    addToQueueNext,
    toggleLike,
    isSongLiked,
    addToPlaylist,
    removeFromPlaylist,
    createPlaylist,
    showToast,
    removeToast,
    addSong,
    removeSong,
    formatTime,
    testAudio
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};