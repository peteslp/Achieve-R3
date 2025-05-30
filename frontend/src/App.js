import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, MainApp } from './SimpleComponents';
import StudentCaseload from './StudentCaseload';
import Schedule from './Schedule';

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
        return <Schedule />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🧠</span>
                </div>
                <h1 className="text-xl font-semibold text-slate-800">Achieve</h1>
              </div>
              
              <div className="hidden md:flex ml-10 space-x-8">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'text-slate-800 bg-slate-100'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Welcome, {currentUser?.name}</span>
              <button
                onClick={onLogout}
                className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-slate-200">
        <div className="flex space-x-1 p-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'text-slate-800 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
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
  const upcomingIEPs = [
    { student: "Sophia Chen", date: "2024-07-30", type: "Annual Review", priority: "high" },
    { student: "Marcus Thompson", date: "2024-08-15", type: "3-Year Re-evaluation", priority: "medium" },
    { student: "Emma Rodriguez", date: "2024-08-20", type: "Annual Review", priority: "medium" },
  ];

  const upcomingEvaluations = [
    { student: "David Kim", date: "2024-07-25", type: "Progress Evaluation", assessor: "Dr. Johnson" },
    { student: "Lily Wang", date: "2024-08-02", type: "Hearing Assessment", assessor: "Audiologist" },
    { student: "Jake Mitchell", date: "2024-08-10", type: "Fluency Re-assessment", assessor: "Dr. Johnson" },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h2>
        <p className="text-slate-600">Overview of your therapy practice</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Students</p>
              <p className="text-3xl font-bold text-slate-800">6</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Today's Sessions</p>
              <p className="text-3xl font-bold text-slate-800">8</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Upcoming IEPs</p>
              <p className="text-3xl font-bold text-slate-800">3</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Progress Rate</p>
              <p className="text-3xl font-bold text-slate-800">85%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* AI Insights */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🧠</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">AI Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
              <p className="text-sm text-emerald-800 font-medium">Excellent Progress</p>
              <p className="text-sm text-emerald-700 mt-1">Jake M. showing 88% improvement in fluency. Consider reducing session frequency.</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
              <p className="text-sm text-amber-800 font-medium">Attention Needed</p>
              <p className="text-sm text-amber-700 mt-1">Sophia C. requires additional phonological awareness support.</p>
            </div>
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Today's Sessions</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">Emma R.</span>
              </div>
              <span className="text-sm text-slate-600">9:00 AM - Individual</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">Group Session</span>
              </div>
              <span className="text-sm text-slate-600">10:30 AM - Group</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">Jake M.</span>
              </div>
              <span className="text-sm text-slate-600">1:00 PM - Individual</span>
            </div>
          </div>
        </div>
      </div>

      {/* IEPs and Evaluations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming IEPs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Upcoming IEPs</h3>
            </div>
            <span className="text-sm text-slate-500">{upcomingIEPs.length} scheduled</span>
          </div>
          <div className="space-y-3">
            {upcomingIEPs.map((iep, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-slate-800">{iep.student}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(iep.priority)}`}>
                        {iep.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{iep.type}</p>
                    <p className="text-xs text-slate-500 mt-1">{new Date(iep.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-slate-700">
                      {Math.ceil((new Date(iep.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Evaluations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Upcoming Evaluations</h3>
            </div>
            <span className="text-sm text-slate-500">{upcomingEvaluations.length} scheduled</span>
          </div>
          <div className="space-y-3">
            {upcomingEvaluations.map((evaluation, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800 mb-1">{evaluation.student}</h4>
                    <p className="text-sm text-slate-600">{evaluation.type}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(evaluation.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })} • {evaluation.assessor}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-slate-700">
                      {Math.ceil((new Date(evaluation.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">Assessment Completed</p>
              <p className="text-sm text-slate-600 mt-1">Jake Mitchell completed fluency assessment - 88% improvement recorded</p>
              <span className="text-xs text-slate-500">2 hours ago</span>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">Session Notes Updated</p>
              <p className="text-sm text-slate-600 mt-1">Emma Rodriguez - /r/ sound production progress documented</p>
              <span className="text-xs text-slate-500">4 hours ago</span>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">IEP Meeting Scheduled</p>
              <p className="text-sm text-slate-600 mt-1">Sophia Chen IEP meeting scheduled for July 30th</p>
              <span className="text-xs text-slate-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;