import React, { useState } from "react";
import UploadSongs from "./UploadSongs";
import Songs from "./Songs";
import StaticSongPlayer from "./StaticSongPlayer";
import { staticSongs } from "../data/staticSongs";

function ArtistDashboard({ user, currentView, setCurrentView }) {
  const [uploadedSongs] = useState([]);

  const renderArtistHome = () => (
    <>
      <div className="content-header">
        <h1>Welcome back, {user.artistData?.artistName || user.username}</h1>
        <p className="artist-subtitle">Manage your music, track your performance</p>
      </div>

      {/* Artist Quick Access Cards */}
      <div className="quick-access-grid">
        <div className="quick-card" onClick={() => setCurrentView("static-player")}>
          <div className="quick-image">🎵</div>
          <span>My Songs ({staticSongs.length})</span>
        </div>
        <div className="quick-card" onClick={() => setCurrentView("upload")}>
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
      </div>

      {/* Artist Stats Overview */}
      <div className="artist-stats-section">
        <h2>Your Music Performance</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{staticSongs.length}</div>
            <div className="stat-label">Total Songs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2.4K</div>
            <div className="stat-label">Total Plays</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">89</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">Liked Songs</div>
          </div>
        </div>
      </div>

      {/* Recent Songs Collection */}
      <div className="artist-songs-section">
        <div className="section-header">
          <h2>Your Songs</h2>
          <button 
            className="see-all-btn"
            onClick={() => setCurrentView("static-player")}
          >
            See all
          </button>
        </div>
        <div className="music-grid">
          {staticSongs.slice(0, 6).map((song) => (
            <div key={song.id} className="music-card artist-song-card">
              <div className="music-image">
                <img src={song.image} alt={song.title} />
                <div className="play-overlay">
                  <button className="play-btn">▶</button>
                </div>
              </div>
              <div className="card-content">
                <h3>{song.title}</h3>
                <p>{song.artist} • {song.plays || "156"} plays</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderUpload = () => <UploadSongs />;
  const renderSongs = () => <Songs />;
  const renderStaticPlayer = () => <StaticSongPlayer />;

  return (
    <div className="artist-dashboard">
      {currentView === "artist-home" && renderArtistHome()}
      {currentView === "upload" && renderUpload()}
      {currentView === "songs" && renderSongs()}
      {currentView === "static-player" && renderStaticPlayer()}
    </div>
  );
}

export default ArtistDashboard;