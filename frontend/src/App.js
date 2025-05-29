import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Dashboard, Caseload, Schedule, Students, Login, LiveSession } from './components';

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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/caseload" element={<Caseload currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/schedule" element={<Schedule currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/students" element={<Students currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/students/:id" element={<Students currentUser={currentUser} onLogout={handleLogout} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;