import React, { useState } from "react";
import ArtistAuth from "./ArtistAuth";
import ThemeCustomizer from "./ThemeCustomizer";

function Navbar({ user, currentView, setCurrentView, onLogout, onUserUpdate, theme, toggleTheme, onThemeChange, currentTheme }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showArtistAuth, setShowArtistAuth] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView("search");
      console.log("Searching for:", searchQuery);
    }
  };

  const handleArtistAuthSuccess = (artistData) => {
    // Update user role to artist
    const updatedUser = {
      ...user,
      role: "artist",
      artistData: artistData
    };
    onUserUpdate(updatedUser);
    setShowArtistAuth(false);
  };

  return (
    <>
      <div className="spotify-topbar">
        {/* Search Bar */}
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.25 1.5a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5zM.5 7.25a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0z M10.28 10.28l4.72 4.72-1.06 1.06-4.72-4.72z"/>
              </svg>
              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>
        </div>

        {/* User Profile */}
        <div className="user-profile">
          {/* Artist Authentication Button - Only show if not already an artist */}
          {user.role !== "artist" && (
            <button 
              className="artist-auth-btn"
              onClick={() => setShowArtistAuth(true)}
              title="Join as Artist"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM5 8.5a3.5 3.5 0 1 1 7 0v.5H5v-.5zM1.5 14a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1H2a.5.5 0 0 1-.5-.5z"/>
              </svg>
              Artist Portal
            </button>
          )}

          {/* Artist Badge - Show if user is an artist */}
          {user.role === "artist" && (
            <div className="artist-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l2.5 5h5.5l-4.5 3.5 1.5 5.5L8 12l-4.5 3L5 9.5 0.5 6h5.5L8 1z"/>
              </svg>
              Artist
            </div>
          )}

          {/* Theme Customizer Button */}
          <button 
            className="theme-customizer-btn"
            onClick={() => setShowThemeCustomizer(true)}
            title="Customize Colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
              <path d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              <circle cx="8" cy="8" r="2"/>
            </svg>
          </button>
          
          <button className="notifications-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12.5H13.745l-1.635-3.357a.75.75 0 0 1-.11-.373V5.5a4 4 0 0 0-4-4zM7 14.25a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
            </svg>
          </button>

          <div className="user-menu">
            <button className="user-btn" onClick={onLogout}>
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.username}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M14 6l-6 6-6-6z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Artist Authentication Modal */}
      {showArtistAuth && (
        <ArtistAuth 
          onClose={() => setShowArtistAuth(false)}
          onSuccess={handleArtistAuthSuccess}
        />
      )}

      {/* Theme Customizer Modal */}
      {showThemeCustomizer && (
        <ThemeCustomizer
          onClose={() => setShowThemeCustomizer(false)}
          currentTheme={currentTheme || 'default'}
          onThemeChange={(themeId, colors) => {
            if (onThemeChange) {
              onThemeChange(themeId, colors);
            }
          }}
        />
      )}
    </>
  );
}

export default Navbar;