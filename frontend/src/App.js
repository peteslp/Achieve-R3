import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, SimpleDashboard } from './SimpleComponents';

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
            <Route path="/" element={<SimpleDashboard currentUser={currentUser} onLogout={handleLogout} />} />
            <Route path="/dashboard" element={<SimpleDashboard currentUser={currentUser} onLogout={handleLogout} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;