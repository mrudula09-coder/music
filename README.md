# 🎵 Music Player App

A modern, full-featured music player web application built with React.js and Node.js.

## ✨ Features

### 🎧 **Core Music Features**
- **Play/Pause/Stop** music controls
- **Queue Management** - Add songs to play next
- **Shuffle & Repeat** modes
- **Volume Control** with mute functionality
- **Progress Bar** with seek functionality
- **Recently Played** tracking

### 🎨 **User Experience**
- **8 Custom Themes** - Users can customize website colors
- **Light Theme** optimized design
- **Responsive Design** - Works on desktop and mobile
- **Song Options Menu** - Play next, like, add to playlist for each song
- **Language Organization** - Songs organized by language (Hindi/Telugu)
- **Keyboard Shortcuts** for quick navigation

### 🎤 **User Roles**
- **Music Lover** - Listen to music, create playlists, like songs
- **Artist** - Upload songs, manage artist dashboard
- **Authentication System** - Secure signup/signin with MongoDB

### 📱 **Advanced Features**
- **Playlists** - Create and manage custom playlists
- **Like System** - Heart songs you love
- **Toast Notifications** - User-friendly feedback
- **Genre Browser** - Browse by music genres
- **Search Functionality** - Find songs quickly
- **Audio Debugging Tools** - Built-in diagnostics

## 🛠️ Tech Stack

### **Frontend**
- **React.js** - Component-based UI
- **CSS3** - Custom styling with CSS variables for theming
- **HTML5 Audio API** - Native audio playback
- **Context API** - State management

### **Backend**
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database for user data
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (installed and running)
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrudula09-coder/music.git
   cd music-app
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up MongoDB**
   ```bash
   # Make sure MongoDB is running
   # Windows: net start MongoDB
   # Linux/Mac: sudo systemctl start mongod
   ```

5. **Add Your Music Files**
   ```bash
   # Add your MP3 files to: public/audio/
   # Supported formats: MP3
   ```

### **Running the Application**

1. **Start the Backend Server**
   ```bash
   cd backend
   node server.js
   # Server runs on http://localhost:5000
   ```

2. **Start the Frontend (in a new terminal)**
   ```bash
   npm start
   # App opens at http://localhost:3000
   ```

3. **Access the Application**
   - Open your browser to `http://localhost:3000`
   - Sign up for a new account or sign in
   - Start enjoying your music!

## 📁 Project Structure

```
music-app/
├── public/
│   ├── audio/              # Place your MP3 files here
│   └── index.html
├── src/
│   ├── components/         # React components
│   ├── context/           # React Context (state management)
│   ├── data/              # Static data (song metadata)
│   ├── hooks/             # Custom React hooks
│   └── services/          # API services
├── backend/
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
└── README.md
```

## 🎵 Adding Your Music

1. Place your MP3 files in the `public/audio/` directory
2. Update `src/data/staticSongs.js` with your song metadata:
   ```javascript
   {
     id: 1,
     title: "Your Song Title",
     artist: "Artist Name",
     src: "/audio/your-song-file.mp3",
     genre: "Bollywood", // or "Tollywood"
     language: "Hindi"    // or "Telugu"
   }
   ```

## 🎨 Customization

### **Themes**
- Users can choose from 8 pre-built color themes
- Themes use CSS custom properties for easy customization
- Light theme optimized for better visibility

### **Adding New Features**
- The app uses React Context for state management
- Audio functionality is centralized in `MusicContext.js`
- Components are modular and reusable

## 🐛 Troubleshooting

### **Audio Not Playing?**
- Use the built-in "🔧 Debug Audio" tool in the app
- Check browser console for error messages
- Ensure MP3 files are in the correct directory
- Verify file paths in `staticSongs.js`

### **Common Issues**
- **Port conflicts**: Make sure ports 3000 and 5000 are available
- **MongoDB connection**: Ensure MongoDB service is running
- **Audio files**: Check file formats (only MP3 supported)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Enjoy Your Music!

Built with ❤️ for music lovers everywhere.
