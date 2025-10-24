import React, { useState, useRef } from 'react';

const AudioTest = () => {
  const [testResults, setTestResults] = useState([]);
  const audioRef = useRef(new Audio());

  const addResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, { message, type, timestamp }]);
    console.log(`[${timestamp}] ${message}`);
  };

  const testBasicAudio = () => {
    addResult('🧪 Starting basic audio test...', 'info');
    
    try {
      // Test 1: Can we create Audio element?
      const testAudio = new Audio();
      addResult('✅ Audio element created successfully', 'success');
      
      // Test 2: Can we set source?
      testAudio.src = '/audio/Chaleya Jawan 128 Kbps.mp3';
      addResult('✅ Audio source set to: ' + testAudio.src, 'success');
      
      // Test 3: Check audio properties
      addResult(`🔍 Audio properties - Volume: ${testAudio.volume}, Muted: ${testAudio.muted}`, 'info');
      
      // Test 4: Check MP3 support
      const mp3Support = testAudio.canPlayType('audio/mpeg');
      addResult(`🎵 MP3 support: ${mp3Support || 'Unknown'}`, mp3Support ? 'success' : 'warning');
      
      // Test 5: Try to load
      testAudio.addEventListener('loadstart', () => {
        addResult('📡 Audio load started', 'info');
      });
      
      testAudio.addEventListener('error', (e) => {
        addResult(`❌ Audio error: ${e.target.error?.message || 'Unknown error'}`, 'error');
      });
      
      testAudio.addEventListener('canplay', () => {
        addResult('✅ Audio can play - file loaded successfully', 'success');
      });
      
      testAudio.load();
      
    } catch (error) {
      addResult(`❌ Test failed: ${error.message}`, 'error');
    }
  };

  const testDirectPlay = async () => {
    addResult('🎯 Testing direct play...', 'info');
    
    try {
      const audio = audioRef.current;
      audio.src = '/audio/Chaleya Jawan 128 Kbps.mp3';
      
      audio.addEventListener('error', (e) => {
        const error = e.target.error;
        addResult(`❌ Play error: Code ${error?.code}, Message: ${error?.message}`, 'error');
      });
      
      audio.addEventListener('canplay', () => {
        addResult('✅ Audio ready to play', 'success');
      });
      
      await audio.play();
      addResult('🎉 Audio started playing!', 'success');
      
      // Stop after 2 seconds
      setTimeout(() => {
        audio.pause();
        addResult('⏸️ Audio paused for test', 'info');
      }, 2000);
      
    } catch (error) {
      addResult(`❌ Direct play failed: ${error.message}`, 'error');
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px'
    }}>
      <h2>🔧 Audio Debug Test</h2>
      <p>Since audio was working yesterday, let's test what might have changed:</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testBasicAudio}
          style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            margin: '5px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Audio Loading
        </button>
        
        <button 
          onClick={testDirectPlay}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            margin: '5px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Direct Play
        </button>
        
        <button 
          onClick={clearResults}
          style={{
            background: '#757575',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            margin: '5px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Results
        </button>
      </div>

      <div style={{ 
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '15px',
        minHeight: '200px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p style={{ color: '#666' }}>Click a test button to start debugging...</p>
        ) : (
          testResults.map((result, index) => (
            <div 
              key={index}
              style={{
                padding: '5px 0',
                borderBottom: '1px solid #eee',
                color: result.type === 'error' ? '#f44336' : 
                       result.type === 'success' ? '#4CAF50' : 
                       result.type === 'warning' ? '#ff9800' : '#333'
              }}
            >
              <small style={{ color: '#666' }}>[{result.timestamp}]</small> {result.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AudioTest;