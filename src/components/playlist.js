import React, { useState } from "react";

function Playlist({ songs, playlists, setPlaylists }) {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  const toggleSelectSong = (id) => {
    setSelectedSongs((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const createPlaylist = () => {
    if (playlistName.trim() && selectedSongs.length > 0) {
      setPlaylists((prev) => [
        ...prev,
        { id: Date.now(), name: playlistName, songs: selectedSongs },
      ]);
      setPlaylistName("");
      setSelectedSongs([]);
    }
  };

  return (
    <div>
      <h3>Create Playlist</h3>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Playlist Name"
      />
      <h4>Select Songs</h4>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <input
              type="checkbox"
              checked={selectedSongs.includes(song.id)}
              onChange={() => toggleSelectSong(song.id)}
            />
            {song.title}
          </li>
        ))}
      </ul>
      <button onClick={createPlaylist}>Create Playlist</button>
      <h4>Your Playlists</h4>
      <ul>
        {playlists.map((pl) => (
          <li key={pl.id}>{pl.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
