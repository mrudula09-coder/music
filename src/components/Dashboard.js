import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Songs from "./Songs";
import StaticSongPlayer from "./StaticSongPlayer";
import ArtistDashboard from "./ArtistDashboard";
import SongOptionsWrapper from "./SongOptionsWrapper";
import AudioTest from "./AudioTest";
import ArtistAuth from "./ArtistAuth";
import QueueDisplay from "./QueueDisplay";
import { staticSongs } from "../data/staticSongs";
import { useMusic } from "../context/MusicContext";

function Dashboard({ user, onLogout, onUserUpdate, theme, toggleTheme, onThemeChange, currentTheme }) {
  const [currentView, setCurrentView] = useState(user.role === "artist" ? "artist-home" : "home");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [showArtistAuth, setShowArtistAuth] = useState(false);
  
  // Use MusicContext for audio management
  const { playSong, currentSong, isPlaying, togglePlayPause, testAudio } = useMusic();

  // Your actual songs from public/audio
  const mySongs = staticSongs.slice(0, 6); // Show first 6 songs on dashboard

  const handlePlaySong = (song) => {
    // Add to recently played (avoid duplicates and limit to 10)
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [{ ...song, playedAt: new Date() }, ...filtered].slice(0, 10);
    });

    // Use MusicContext playSong function
    playSong(song);
  };

  const handleArtistAuthSuccess = (artistData) => {
    // Update user data with artist information
    onUserUpdate({
      ...user,
      ...artistData,
      role: "artist"
    });
    
    // Close auth modal
    setShowArtistAuth(false);
    
    // Switch to artist home view
    setCurrentView("artist-home");
  };

  const handleShowArtistAuth = () => {
    setShowArtistAuth(true);
  };

  const renderHome = () => (
    <div className="main-content">
      <div className="content-header">
        <div className="header-left">
          <h1 style={{color: 'red', fontSize: '30px'}}>🚨 CHANGES WORK! Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}</h1>
          <div className="user-role-badge">
            <span className="role-icon">{user.role === 'artist' ? '🎤' : '🎧'}</span>
            <span className="role-text">
              {user.role === 'artist' ? 'Artist Dashboard' : 'Music Lover'}
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => testAudio()}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              marginRight: '10px'
            }}
          >
            Quick Test
          </button>
          <button 
            onClick={() => setCurrentView('audio-test')}
            style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            🔧 Debug Audio
          </button>
          {/* Force refresh */}
        </div>
      </div>

      {/* Quick Access Cards - Different for Artists and Users */}
      <div className="quick-access">
        {user.role === 'artist' ? (
          // Artist Quick Access
          <>
            <div className="quick-card" onClick={() => setCurrentView("static-player")}>
              <div className="quick-image">🎵</div>
              <span>My Songs ({staticSongs.length})</span>
            </div>
            <div className="quick-card" onClick={() => setCurrentView("songs")}>
              <div className="quick-image">📤</div>
              <span>Upload Songs</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">📊</div>
              <span>Analytics</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">💿</div>
              <span>My Albums</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">👥</div>
              <span>Followers</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">⚙️</div>
              <span>Artist Settings</span>
            </div>
          </>
        ) : (
          // Regular User Quick Access
          <>
            <div className="quick-card">
              <div className="quick-image">❤️</div>
              <span>Liked Songs</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">📡</div>
              <span>Discover Weekly</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">⭐</div>
              <span>Your Top Songs 2024</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">🎶</div>
              <span>My Playlists</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">🎙️</div>
              <span>Podcasts</span>
            </div>
            <div className="quick-card">
              <div className="quick-image">🔥</div>
              <span>Trending</span>
            </div>
          </>
        )}
      </div>

      {/* Content Sections - Different for Artists and Users */}
      {user.role === 'artist' ? (
        <>
          {/* Artist: My Songs Collection */}
          <section className="content-section">
            <div className="section-header">
              <h2>My Songs Collection</h2>
              <div className="section-info">
                <span>{staticSongs.length} songs</span>
              </div>
              <button className="show-all" onClick={() => setCurrentView("static-player")}>
                Show all ({staticSongs.length})
              </button>
            </div>
            <div className="card-grid">
              {mySongs.map((song) => (
                <div 
                  key={song.id} 
                  className="music-card song-card" 
                  data-language={song.language}
                  onClick={() => handlePlaySong(song)}
                >
                  <div className="card-image">
                    <img 
                      src={song.cover} 
                      alt={song.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=🎵';
                      }}
                    />
                    <button className="play-btn" onClick={(e) => {e.stopPropagation(); handlePlaySong(song);}}>
                      {currentSong?.id === song.id && isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                    <SongOptionsWrapper 
                      song={song} 
                      position="card"
                      showQuickActions={true}
                      showThreeDots={true}
                    />
                  </div>
                  <div className="card-content">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>


        </>
      ) : (
        // Regular User Content: Music Library
        <>
          {/* Recently Played Section */}
          {recentlyPlayed.length > 0 && (
            <section className="content-section">
              <div className="section-header">
                <h2>Recently Played</h2>
                <button className="show-all" onClick={() => setRecentlyPlayed([])}>Clear</button>
              </div>
              <div className="recently-played-grid">
                {recentlyPlayed.slice(0, 6).map((song) => (
                  <div key={`recent-${song.id}`} className="recent-song-card song-card" onClick={() => handlePlaySong(song)}>
                    <img 
                      src={song.image} 
                      alt={song.title}
                      className="recent-song-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/60x60?text=🎵';
                      }}
                    />
                    <div className="recent-song-info">
                      <h4>{song.title}</h4>
                      <p>{song.artist}</p>
                      <span className="play-time">
                        {song.playedAt ? new Date(song.playedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </span>
                    </div>
                    <div className="recent-play-btn">
                      {currentSong?.id === song.id && isPlaying ? '⏸️' : '▶️'}
                    </div>
                    <SongOptionsWrapper 
                      song={song} 
                      position="card"
                      showQuickActions={true}
                      showThreeDots={true}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Play Next Queue */}
          <QueueDisplay />

          {/* All Songs Collection */}
          <section className="content-section">
            <div className="section-header">
              <h2>All Songs</h2>
              <div className="section-info">
                <span>{staticSongs.length} songs</span>
              </div>
              <button className="show-all" onClick={() => setCurrentView("search")}>
                Explore ({staticSongs.length})
              </button>
            </div>
            <div className="card-grid">
              {mySongs.map((song) => (
                <div key={song.id} className="music-card" onClick={() => handlePlaySong(song)}>
                  <div className="card-image">
                    <img 
                      src={song.image} 
                      alt={song.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/180x180?text=🎵';
                      }}
                    />
                    <div className="play-overlay">
                      <button className="play-button">
                        {currentSong?.id === song.id && isPlaying ? '⏸️' : '▶️'}
                      </button>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Browse by Genre */}
          <section className="content-section">
            <div className="section-header">
              <h2>Browse by Genre</h2>
              <button className="show-all" onClick={() => setCurrentView("search")}>Explore</button>
            </div>
            <div className="card-grid">
              <div className="music-card">
                <div className="card-image genre-card" style={{background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)'}}>
                  <div className="genre-content">
                    <h3>Bollywood</h3>
                    <span>{staticSongs.filter(s => s.genre === 'Bollywood').length} songs</span>
                  </div>
                </div>
              </div>
              <div className="music-card">
                <div className="card-image genre-card" style={{background: 'linear-gradient(135deg, #4ecdc4, #44a08d)'}}>
                  <div className="genre-content">
                    <h3>Tollywood</h3>
                    <span>{staticSongs.filter(s => s.genre === 'Tollywood').length} songs</span>
                  </div>
                </div>
              </div>
              <div className="music-card">
                <div className="card-image genre-card" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                  <div className="genre-content">
                    <h3>Popular</h3>
                    <span>Top hits</span>
                  </div>
                </div>
              </div>
              <div className="music-card">
                <div className="card-image genre-card" style={{background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)'}}>
                  <div className="genre-content">
                    <h3>All Songs</h3>
                    <span>{staticSongs.length} tracks</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );

  const renderSearch = () => (
    <div className="main-content">
      <div className="content-header">
        <h1>Search</h1>
      </div>
      <div className="browse-categories">
        <div className="category-card" style={{backgroundColor: '#8400e7'}}>
          <h3>Podcasts</h3>
        </div>
        <div className="category-card" style={{backgroundColor: '#e8115b'}}>
          <h3>Made For You</h3>
        </div>
        <div className="category-card" style={{backgroundColor: '#1e3264'}}>
          <h3>New Releases</h3>
        </div>
        <div className="category-card" style={{backgroundColor: '#0d73ec'}}>
          <h3>Discover</h3>
        </div>
        <div className="category-card" style={{backgroundColor: '#8d67ab'}}>
          <h3>Live Events</h3>
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="main-content">
      <div className="content-header">
        <h1>Your Library</h1>
      </div>
      <div className="library-content">
        <p>Your playlists and saved music will appear here.</p>
      </div>
    </div>
  );

  return (
    <div className="spotify-app">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        user={user} 
        onShowArtistAuth={handleShowArtistAuth}
      />
      
      <div className="main-view">
        <Navbar 
          user={user}
          currentView={currentView}
          setCurrentView={setCurrentView}
          onLogout={onLogout}
          onUserUpdate={onUserUpdate}
          theme={theme}
          toggleTheme={toggleTheme}
          onThemeChange={onThemeChange}
          currentTheme={currentTheme}
        />
        
        <div className="main-content-wrapper">
          {user.role === "artist" ? (
            <ArtistDashboard 
              user={user} 
              currentView={currentView} 
              setCurrentView={setCurrentView}
            />
          ) : (
            <>
              {currentView === "home" && renderHome()}
              {currentView === "search" && renderSearch()}
              {currentView === "library" && renderLibrary()}
              {currentView === "audio-test" && <AudioTest />}
            </>
          )}
        </div>
        
        {/* Mini Player for Dashboard */}
        {currentSong && currentView === "home" && (
          <div className="mini-player">
            <div className="mini-player-info">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title}
                className="mini-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/50x50?text=🎵';
                }}
              />
              <div className="mini-details">
                <div className="mini-title">{currentSong.title}</div>
                <div className="mini-artist">{currentSong.artist}</div>
              </div>
            </div>
            <div className="mini-controls">
              <button className="mini-play-btn" onClick={() => handlePlaySong(currentSong)}>
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button className="mini-close-btn" onClick={togglePlayPause}>
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Artist Authentication Modal */}
      {showArtistAuth && (
        <ArtistAuth 
          onSuccess={handleArtistAuthSuccess}
          onClose={() => setShowArtistAuth(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;