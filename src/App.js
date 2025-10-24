import React, { useState, useEffect } from "react";
import './App.css';
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import MusicPlayer from "./components/MusicPlayer";
import ToastContainer from "./components/ToastContainer";
import { MusicProvider } from "./context/MusicContext";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

// Component to handle keyboard shortcuts when user is logged in
const AppWithShortcuts = ({ user, onLogout, onUserUpdate, theme, toggleTheme, onThemeChange, currentTheme }) => {
  useKeyboardShortcuts(); // Enable keyboard shortcuts
  
  return (
    <>
      <Dashboard 
        user={user} 
        onLogout={onLogout} 
        onUserUpdate={onUserUpdate}
        theme={theme}
        toggleTheme={toggleTheme}
        onThemeChange={onThemeChange}
        currentTheme={currentTheme}
      />
      <MusicPlayer />
      <ToastContainer />
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [currentTheme, setCurrentTheme] = useState("default");

  // Load saved theme on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem('musicAppTheme');
    const savedThemeColors = localStorage.getItem('musicAppThemeColors');
    
    if (savedTheme && savedThemeColors) {
      setCurrentTheme(savedTheme);
      const colors = JSON.parse(savedThemeColors);
      applyThemeColors(colors);
    }
  }, []);

  const applyThemeColors = (colors) => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
  };

  const handleThemeChange = (themeId, colors) => {
    setCurrentTheme(themeId);
    applyThemeColors(colors);
    
    // Save to localStorage
    localStorage.setItem('musicAppTheme', themeId);
    localStorage.setItem('musicAppThemeColors', JSON.stringify(colors));
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUserUpdate = (updatedUserData) => {
    setUser(updatedUserData);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Show auth screen if no user is logged in
  if (!user) {
    return (
      <div className="auth-page">
        <Auth onLogin={handleLogin} />
      </div>
    );
  }

  // Show Spotify-style dashboard when user is logged in
  return (
    <MusicProvider>
      <div className={`app ${theme}`}>
        <AppWithShortcuts 
          user={user}
          onLogout={handleLogout}
          onUserUpdate={handleUserUpdate}
          theme={theme}
          toggleTheme={toggleTheme}
          onThemeChange={handleThemeChange}
          currentTheme={currentTheme}
        />
      </div>
    </MusicProvider>
  );
}

export default App;