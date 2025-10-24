import React, { useState } from "react";

function ArtistAuth({ onSuccess, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      const artistData = {
        username,
        email: email || `${username}@artist.com`,
        artistName: artistName || username,
        genre,
        bio,
        role: "artist"
      };
      onSuccess(artistData);
    }
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setArtistName("");
    setGenre("");
    setBio("");
    setIsSignUp(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content artist-auth-modal">
        <div className="modal-header">
          <h2>Artist Portal</h2>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <div className="artist-auth-container">

          <form className="artist-auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter artist username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {isSignUp && (
              <>
                <div className="input-group">
                  <label>Artist Name</label>
                  <input
                    type="text"
                    placeholder="Your stage/artist name"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option value="">Select your primary genre</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="electronic">Electronic</option>
                    <option value="classical">Classical</option>
                    <option value="jazz">Jazz</option>
                    <option value="country">Country</option>
                    <option value="r&b">R&B</option>
                    <option value="indie">Indie</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Bio</label>
                  <textarea
                    placeholder="Tell us about yourself and your music..."
                    rows="3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="input-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button type="submit" className="artist-auth-button">
              {isSignUp ? "Create Artist Account" : "Sign In as Artist"}
            </button>

            <div className="artist-auth-footer">
              {isSignUp ? "Already have an artist account? " : "Don't have an artist account? "}
              <span className="auth-link" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArtistAuth;