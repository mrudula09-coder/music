import React from 'react';
import { getAvailableLanguages, getLanguageStats } from '../data/staticSongs';

const LanguageFilter = ({ selectedLanguage, onLanguageChange, className = "" }) => {
  const languages = getAvailableLanguages();
  const languageStats = getLanguageStats();

  const getLanguageFlag = (language) => {
    const flags = {
      'Hindi': '🇮🇳',
      'Telugu': '🎭',
      'English': '🇺🇸',
      'Tamil': '🎵',
      'Punjabi': '🎶'
    };
    return flags[language] || '🎵';
  };

  return (
    <div className={`language-filter ${className}`}>
      <div className="filter-title">
        <span className="title-icon">🌐</span>
        <span>Filter by Language</span>
      </div>
      
      <div className="language-options">
        <button
          className={`language-btn ${selectedLanguage === 'all' ? 'active' : ''}`}
          onClick={() => onLanguageChange('all')}
        >
          <span className="language-icon">🎵</span>
          <span className="language-name">All Songs</span>
          <span className="song-count">{Object.values(languageStats).reduce((a, b) => a + b, 0)}</span>
        </button>
        
        {languages.map(language => (
          <button
            key={language}
            className={`language-btn ${selectedLanguage === language ? 'active' : ''}`}
            onClick={() => onLanguageChange(language)}
          >
            <span className="language-icon">{getLanguageFlag(language)}</span>
            <span className="language-name">{language}</span>
            <span className="song-count">{languageStats[language]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageFilter;