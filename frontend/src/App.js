import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Dashboard, Caseload, Schedule, StudentDetail, Login, LiveSession, ScheduleGrid } from './components';

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