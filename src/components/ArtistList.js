import React from "react";
function ArtistList({ artists }) {
  return (
    <div>
      <h3>Artists</h3>
      {artists.map(artist => (
        <div key={artist.id}>{artist.name}</div>
      ))}
    </div>
  );
}
export default ArtistList;
