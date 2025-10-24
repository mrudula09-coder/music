import React, { useState } from 'react';

const ThemeCustomizer = ({ onClose, currentTheme, onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'default');

  const themes = [
    {
      id: 'default',
      name: 'Spotify Green',
      colors: {
        primary: '#1db954',
        accent: '#1ed760',
        background: '#121212',
        cardBg: '#181818',
        textPrimary: '#ffffff',
        textSecondary: '#b3b3b3'
      },
      preview: 'linear-gradient(135deg, #1db954, #1ed760)'
    },
    {
      id: 'purple',
      name: 'Purple Vibes',
      colors: {
        primary: '#8b5cf6',
        accent: '#a78bfa',
        background: '#1a1625',
        cardBg: '#2d1b69',
        textPrimary: '#ffffff',
        textSecondary: '#c4b5fd'
      },
      preview: 'linear-gradient(135deg, #8b5cf6, #a78bfa)'
    },
    {
      id: 'ocean',
      name: 'Ocean Blue',
      colors: {
        primary: '#0ea5e9',
        accent: '#38bdf8',
        background: '#0c1621',
        cardBg: '#1e293b',
        textPrimary: '#ffffff',
        textSecondary: '#94a3b8'
      },
      preview: 'linear-gradient(135deg, #0ea5e9, #38bdf8)'
    },
    {
      id: 'sunset',
      name: 'Sunset Orange',
      colors: {
        primary: '#f97316',
        accent: '#fb923c',
        background: '#1c1917',
        cardBg: '#292524',
        textPrimary: '#ffffff',
        textSecondary: '#d6d3d1'
      },
      preview: 'linear-gradient(135deg, #f97316, #fb923c)'
    },
    {
      id: 'rose',
      name: 'Rose Pink',
      colors: {
        primary: '#e11d48',
        accent: '#f43f5e',
        background: '#1f1315',
        cardBg: '#2d1b20',
        textPrimary: '#ffffff',
        textSecondary: '#fda4af'
      },
      preview: 'linear-gradient(135deg, #e11d48, #f43f5e)'
    },
    {
      id: 'emerald',
      name: 'Emerald Green',
      colors: {
        primary: '#059669',
        accent: '#10b981',
        background: '#0c1d16',
        cardBg: '#1a2e23',
        textPrimary: '#ffffff',
        textSecondary: '#86efac'
      },
      preview: 'linear-gradient(135deg, #059669, #10b981)'
    },
    {
      id: 'dark',
      name: 'Pure Dark',
      colors: {
        primary: '#374151',
        accent: '#6b7280',
        background: '#000000',
        cardBg: '#111827',
        textPrimary: '#ffffff',
        textSecondary: '#9ca3af'
      },
      preview: 'linear-gradient(135deg, #374151, #6b7280)'
    },
    {
      id: 'gold',
      name: 'Golden Hour',
      colors: {
        primary: '#d97706',
        accent: '#f59e0b',
        background: '#1c1917',
        cardBg: '#292524',
        textPrimary: '#ffffff',
        textSecondary: '#fbbf24'
      },
      preview: 'linear-gradient(135deg, #d97706, #f59e0b)'
    }
  ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme.id);
    // Apply theme immediately for preview
    applyThemeColors(theme.colors);
  };

  const handleApply = () => {
    const theme = themes.find(t => t.id === selectedTheme);
    onThemeChange(selectedTheme, theme.colors);
    onClose();
  };

  const handleCancel = () => {
    // Revert to current theme
    const currentThemeData = themes.find(t => t.id === currentTheme);
    if (currentThemeData) {
      applyThemeColors(currentThemeData.colors);
    }
    onClose();
  };

  const applyThemeColors = (colors) => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
  };

  return (
    <div className="theme-customizer-overlay">
      <div className="theme-customizer-modal">
        <div className="customizer-header">
          <h2>Customize Colors</h2>
          <button className="close-customizer" onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className="customizer-content">
          <p className="customizer-description">
            Choose your favorite color theme to personalize your music experience
          </p>
          
          <div className="themes-grid">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`theme-option ${selectedTheme === theme.id ? 'selected' : ''}`}
                onClick={() => handleThemeSelect(theme)}
              >
                <div 
                  className="theme-preview"
                  style={{ background: theme.preview }}
                >
                  <div className="preview-content">
                    <div className="preview-circle"></div>
                    <div className="preview-bars">
                      <div className="preview-bar"></div>
                      <div className="preview-bar short"></div>
                      <div className="preview-bar"></div>
                    </div>
                  </div>
                </div>
                <div className="theme-info">
                  <span className="theme-name">{theme.name}</span>
                  {selectedTheme === theme.id && (
                    <div className="selected-indicator">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="customizer-footer">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="apply-btn" onClick={handleApply}>
            Apply Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;