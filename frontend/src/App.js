import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components with error handling
let Login, ScheduleGrid;
try {
  const components = require('./components');
  Login = components.Login;
  ScheduleGrid = components.ScheduleGrid;
} catch (error) {
  console.error('Error loading components:', error);
  // Fallback components
  Login = () => <div>Loading Login...</div>;
  ScheduleGrid = () => <div>Loading Schedule...</div>;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Routes>
            <Route path="/" element={<ScheduleGrid currentUser={currentUser} onLogout={handleLogout} />} />
            <Route path="/schedule-grid" element={<ScheduleGrid currentUser={currentUser} onLogout={handleLogout} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;