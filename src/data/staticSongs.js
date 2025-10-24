// Static Songs Database
// Your MP3 files from public/audio folder

export const staticSongs = [
  // Hindi Songs
  {
    id: 1,
    title: "Bijuria",
    artist: "Sunny Sanskari Ki Tulsi Kumari",
    album: "Bollywood Hits",
    duration: "3:45",
    src: "/audio/Bijuria Sunny Sanskari Ki Tulsi Kumari 128 Kbps.mp3",
    cover: "https://via.placeholder.com/300x300?text=🎵",
    genre: "Bollywood",
    language: "Hindi",
    year: 2024
  },
  {
    id: 2,
    title: "Nain Matakka",
    artist: "Baby John",
    album: "Latest Hits",
    duration: "4:12",
    src: "/audio/Nain Matakka Baby John 128 Kbps.mp3",
    cover: "https://via.placeholder.com/300x300?text=🎵",
    genre: "Bollywood",
    language: "Hindi",
    year: 2024
  },
  {
    id: 3,
    title: "Panwadi",
    artist: "Sunny Sanskari Ki Tulsi Kumari",
    album: "Bollywood Hits",
    duration: "3:30",
    src: "/audio/Panwadi Sunny Sanskari Ki Tulsi Kumari 128 Kbps.mp3",
    cover: "https://via.placeholder.com/300x300?text=🎵",
    genre: "Bollywood",
    language: "Hindi",
    year: 2024
  },
  {
    id: 4,
    title: "Ratta Maar",
    artist: "Student Of The Year",
    album: "Movie Soundtrack",
    duration: "4:20",
    src: "/audio/Ratta Maar Student Of The Year 128 Kbps.mp3",
    cover: "https://via.placeholder.com/300x300?text=🎵",
    genre: "Bollywood",
    language: "Hindi",
    year: 2024
  },
  // Telugu Songs
  {
    id: 5,
    title: "Nadhive",
    artist: "Various Artists",
    album: "Telugu Collection",
    duration: "3:55",
    src: "/audio/[iSongs.info] 02 - Nadhive.mp3",
    cover: "https://via.placeholder.com/300x300?text=🎵",
    genre: "Tollywood",
    language: "Telugu",
    year: 2024
  },
  {
    id: 6,
    title: "Hello Ani",
    artist: "Various Artists",
    album: "Telugu Collection",
    duration: "4:05",
    src: "/audio/[iSongs.info] 03 - Hello Ani.mp3",
    cover: "https://via.placeholder.com/300x300?text=🎵",
    genre: "Tollywood",
    language: "Telugu",
    year: 2024
  },
  {
    id: 7,
    title: "Kalale Kalale",
    artist: "Various Artists",
    album: "Telugu Collection",
    duration: "3:40",
    src: "/audio/[iSongs.info] 03 - Kalale Kalale (1).mp3",
    cover: "https://via.placeholder.com/300x300?text=🎵",
    genre: "Tollywood",
    language: "Telugu",
    year: 2024
  },
  {
    id: 8,
    title: "Jambar Gimbar Lala",
    artist: "Various Artists",
    album: "Telugu Collection",
    duration: "4:15",
    src: "/audio/[iSongs.info] 04 - Jambar Gimbar Lala.mp3",
    cover: "https://via.placeholder.com/300x300?text=🎵",
    genre: "Tollywood",
    language: "Telugu",
    year: 2024
  }
];

// Helper function to get all songs
export const getAllSongs = () => staticSongs;

// Helper function to get song by ID
export const getSongById = (id) => staticSongs.find(song => song.id === id);

// Helper function to search songs
export const searchSongs = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return staticSongs.filter(song => 
    song.title.toLowerCase().includes(lowercaseQuery) ||
    song.artist.toLowerCase().includes(lowercaseQuery) ||
    song.album.toLowerCase().includes(lowercaseQuery) ||
    song.genre.toLowerCase().includes(lowercaseQuery) ||
    song.language.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to get songs by genre
export const getSongsByGenre = (genre) => 
  staticSongs.filter(song => song.genre.toLowerCase() === genre.toLowerCase());

// Helper function to get songs by language
export const getSongsByLanguage = (language) => 
  staticSongs.filter(song => song.language.toLowerCase() === language.toLowerCase());

// Helper function to get genre stats
export const getGenreStats = () => {
  const stats = {};
  staticSongs.forEach(song => {
    stats[song.genre] = (stats[song.genre] || 0) + 1;
  });
  return stats;
};

// Helper function to get available languages
export const getAvailableLanguages = () => {
  const languages = [...new Set(staticSongs.map(song => song.language))];
  return languages.sort();
};

// Helper function to get language stats
export const getLanguageStats = () => {
  const stats = {};
  staticSongs.forEach(song => {
    stats[song.language] = (stats[song.language] || 0) + 1;
  });
  return stats;
};

// Helper function to get songs by artist
export const getSongsByArtist = (artist) =>
  staticSongs.filter(song => song.artist.toLowerCase() === artist.toLowerCase());