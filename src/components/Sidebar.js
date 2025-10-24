import React, { useState } from "react";

function Sidebar({ currentView, setCurrentView, user, onShowArtistAuth }) {
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic menu items based on user role
  const menuItems = user?.role === 'artist' ? [
    { id: "artist-home", label: "Artist Home", icon: "🏠" },
    { id: "upload", label: "Upload Songs", icon: "�" },
    { id: "static-player", label: "My Songs", icon: "🎵" },
    { id: "songs", label: "Manage Songs", icon: "⚙️" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "library", label: "Library", icon: "📚" }
  ] : [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "library", label: "Your Library", icon: "📚" },
    { id: "podcasts", label: "Podcasts", icon: "🎙️" },
    { id: "karaoke", label: "Karaoke", icon: "🎤" }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "event",
      artist: "Arijit Singh",
      message: "New concert announced in Mumbai - Dec 15, 2024",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "event",
      artist: "Atif Aslam",
      message: "Live performance at Delhi - Jan 20, 2025",
      time: "1 day ago",
      read: false
    },
    {
      id: 3,
      type: "release",
      artist: "Sid Sriram",
      message: "Released new single 'Magical Moments'",
      time: "3 days ago",
      read: true
    }
  ];

  const playlists = [
    "Liked Songs",
    "My Playlist #1",
    "Chill Vibes",
    "Workout Mix",
    "Road Trip Songs"
  ];

  const handleNotificationClick = (notification) => {
    if (notification.type === "event") {
      setCurrentView("events");
    }
    setShowNotifications(false);
  };



  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="spotify-sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span>Spotify</span>
        </div>

        {/* Main Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${currentView === item.id ? "active" : ""}`}
                  onClick={() => setCurrentView(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Feature Buttons Section */}
        <div className="sidebar-features">
          {/* Event Notifications */}
          <div className="feature-section">
            <button 
              className="sidebar-feature-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <div className="feature-icon">🔔</div>
              <span>Events</span>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="sidebar-dropdown">
                <div className="dropdown-header">
                  <h4>Artist Events</h4>
                  <button 
                    className="close-dropdown"
                    onClick={() => setShowNotifications(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="dropdown-content">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`sidebar-notification-item ${!notification.read ? 'unread' : ''}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="notification-icon-small">
                        {notification.type === "event" ? "🎤" : "🎵"}
                      </div>
                      <div className="notification-details">
                        <div className="notification-artist">{notification.artist}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                      {!notification.read && <div className="unread-dot"></div>}
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button onClick={() => setCurrentView("events")}>
                    View All Events
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Artist Portal */}
          <button 
            className="sidebar-feature-btn"
            onClick={() => onShowArtistAuth()}
          >
            <div className="feature-icon">👨‍🎤</div>
            <span>Artist Portal</span>
          </button>
        </div>

        {/* Create Playlist Button */}
        <div className="create-playlist">
          <button className="create-btn">
            <div className="create-icon">+</div>
            <span>Create Playlist</span>
          </button>
          <button className="create-btn">
            <div className="create-icon">❤️</div>
            <span>Liked Songs</span>
          </button>
        </div>

        {/* Playlist List */}
        <div className="playlist-section">
          <div className="playlist-list">
            {playlists.map((playlist, index) => (
              <button key={index} className="playlist-item">
                {playlist}
              </button>
            ))}
          </div>
        </div>
      </div>


    </>
  );
}

export default Sidebar;