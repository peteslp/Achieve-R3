import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, MainApp } from './SimpleComponents';
import StudentCaseload from './StudentCaseload';

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
          <MainAppWithCaseload currentUser={currentUser} onLogout={handleLogout} />
        )}
      </BrowserRouter>
    </div>
  );
}

// Enhanced App with Caseload Integration
const MainAppWithCaseload = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: 'Home' },
    { id: 'caseload', name: 'Caseload', icon: 'Users' },
    { id: 'schedule', name: 'Schedule', icon: 'Calendar' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'caseload':
        return <StudentCaseload />;
      case 'schedule':
        return <div className="p-6"><div className="text-center py-12"><h3 className="text-lg font-medium text-gray-900 mb-2">Schedule Coming Soon</h3><p className="text-gray-600">Advanced scheduling features will be available soon</p></div></div>;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Achieve</h1>
              </div>
              
              <div className="hidden md:flex ml-10 space-x-8">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'text-blue-700 bg-blue-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {currentUser?.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="flex space-x-1 p-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'text-blue-700 bg-blue-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <main>
        {renderContent()}
      </main>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of your therapy practice</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Stats</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total Students: <span className="font-medium text-blue-600">6</span></p>
            <p className="text-sm text-gray-600">Today's Sessions: <span className="font-medium text-green-600">8</span></p>
            <p className="text-sm text-gray-600">Upcoming IEPs: <span className="font-medium text-orange-600">3</span></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">AI Insights</h3>
          <p className="text-sm text-gray-600">
            3 students showing excellent progress this week. Consider reducing session frequency for Jake M.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Today's Sessions</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">9:00 AM - Emma R. (Individual)</p>
            <p className="text-sm text-gray-600">10:30 AM - Group Session</p>
            <p className="text-sm text-gray-600">1:00 PM - Jake M. (Individual)</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Jake Mitchell completed fluency assessment - 88% improvement</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Emma Rodriguez session notes updated - /r/ sound progress noted</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Sophia Chen IEP meeting scheduled for July 30th</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;