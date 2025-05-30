import React from 'react';

function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page - SLP Therapy System</h1>
      <p>If you can see this, the React app is working!</p>
      <div style={{ background: '#f0f0f0', padding: '10px', marginTop: '20px' }}>
        <h3>System Status:</h3>
        <ul>
          <li>✅ React is loading</li>
          <li>✅ Frontend service is running</li>
          <li>✅ Basic components work</li>
        </ul>
      </div>
    </div>
  );
}

export default TestApp;