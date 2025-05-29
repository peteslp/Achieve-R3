import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Home, Users, Calendar, GraduationCap, Bell, Search, LogOut, 
  Plus, Filter, ChevronLeft, ChevronRight, Brain, Target, 
  TrendingUp, AlertCircle, Clock, CheckCircle, BookOpen,
  FileText, BarChart3, Settings, User, Star, MessageSquare,
  Zap, Calendar as CalendarIcon, Award, Activity
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import clsx from 'clsx';

// Helper function for progress color styling
const getProgressColor = (level) => {
  switch(level) {
    case 'Excellent': return 'text-green-600 bg-green-100';
    case 'Progressing': return 'text-blue-600 bg-blue-100';
    case 'Needs Support': return 'text-orange-600 bg-orange-100';
    default: return 'text-slate-600 bg-slate-100';
  }
};

// Mock Data
const mockStudents = [
  {
    id: 1,
    name: "Emma Rodriguez",
    age: 8,
    grade: "3rd Grade",
    avatar: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg",
    status: "Active",
    primaryGoals: ["Articulation - /R/ sound production", "Language comprehension"],
    nextSession: "2025-01-15T10:00:00",
    iepDue: "2025-02-15",
    evaluationDue: null,
    progressLevel: "Progressing",
    therapyType: "Individual",
    servicesPerWeek: 3,
    sessionLength: "30 min",
    accommodations: ["Extended time", "Visual supports", "Preferential seating"],
    recentProgress: { score: 78, trend: "up" }
  },
  {
    id: 2,
    name: "Marcus Johnson",
    age: 6,
    grade: "1st Grade",
    avatar: "https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg",
    status: "Active",
    primaryGoals: ["Fluency improvement", "Social communication"],
    nextSession: "2025-01-15T11:00:00",
    iepDue: null,
    evaluationDue: "2025-01-20",
    progressLevel: "Excellent",
    therapyType: "Group",
    servicesPerWeek: 2,
    sessionLength: "45 min",
    accommodations: ["Calm down breaks", "Peer support"],
    recentProgress: { score: 92, trend: "up" }
  },
  {
    id: 3,
    name: "Aisha Patel",
    age: 10,
    grade: "5th Grade",
    avatar: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
    status: "Active",
    primaryGoals: ["Voice quality", "Pragmatic language skills"],
    nextSession: "2025-01-16T09:00:00",
    iepDue: "2025-01-25",
    evaluationDue: null,
    progressLevel: "Needs Support",
    therapyType: "Individual",
    servicesPerWeek: 4,
    sessionLength: "30 min",
    accommodations: ["Assistive technology", "Communication board"],
    recentProgress: { score: 65, trend: "stable" }
  },
  {
    id: 4,
    name: "Dylan Chen",
    age: 7,
    grade: "2nd Grade",
    avatar: "https://images.pexels.com/photos/8298453/pexels-photo-8298453.jpeg",
    status: "Active",
    primaryGoals: ["Phonological awareness", "Vocabulary expansion"],
    nextSession: "2025-01-16T14:00:00",
    iepDue: null,
    evaluationDue: "2025-02-01",
    progressLevel: "Progressing",
    therapyType: "Individual",
    servicesPerWeek: 2,
    sessionLength: "30 min",
    accommodations: ["Visual schedule", "Reduced auditory distractions"],
    recentProgress: { score: 74, trend: "up" }
  },
  {
    id: 5,
    name: "Sofia Martinez",
    age: 9,
    grade: "4th Grade",
    avatar: "https://images.pexels.com/photos/7402835/pexels-photo-7402835.jpeg",
    status: "Active",
    primaryGoals: ["Language structure", "Reading comprehension"],
    nextSession: "2024-01-17T10:30:00",
    iepDue: "2024-03-10",
    evaluationDue: null,
    progressLevel: "Excellent",
    therapyType: "Group",
    servicesPerWeek: 3,
    sessionLength: "45 min",
    accommodations: ["Text-to-speech", "Modified assignments"],
    recentProgress: { score: 88, trend: "up" }
  }
];

const mockSessions = [
  {
    id: 1,
    studentId: 1,
    date: "2025-01-15T10:00:00",
    duration: 30,
    type: "Individual",
    goals: ["Articulation practice", "Homework review"],
    status: "Scheduled"
  },
  {
    id: 2,
    studentId: 3,
    date: "2025-01-16T09:00:00",
    duration: 30,
    type: "Individual",
    goals: ["Voice exercises", "Communication practice"],
    status: "Scheduled"
  },
  {
    id: 3,
    studentId: 4,
    date: "2025-01-16T14:00:00",
    duration: 30,
    type: "Individual",
    goals: ["Phonics work", "Vocabulary building"],
    status: "Scheduled"
  },
  {
    id: 4,
    studentId: 1,
    date: "2025-01-17T09:00:00",
    duration: 30,
    type: "Individual",
    goals: ["Articulation - /R/ sound practice"],
    status: "Scheduled"
  },
  {
    id: 5,
    studentId: 5,
    date: "2025-01-18T11:00:00",
    duration: 30,
    type: "Individual",
    goals: ["Reading comprehension", "Language structure"],
    status: "Scheduled"
  }
];

const mockGroupSessions = [
  {
    id: 'group-1',
    name: "Social Communication Group",
    date: "2025-01-15T13:00:00",
    duration: 45,
    type: "Group",
    studentIds: [2, 5], // Marcus Johnson, Sofia Martinez
    goals: ["Social interaction", "Turn-taking", "Conversation skills"],
    status: "Scheduled",
    description: "Focus on peer interaction and social communication skills",
    room: "Therapy Room A"
  },
  {
    id: 'group-2',
    name: "Articulation Practice Group",
    date: "2025-01-16T15:30:00",
    duration: 60,
    type: "Group",
    studentIds: [1, 4], // Emma Rodriguez, Dylan Chen
    goals: ["Sound production", "Phonological awareness", "Peer modeling"],
    status: "Scheduled",
    description: "Group practice for /R/ and /S/ sound production",
    room: "Therapy Room B"
  },
  {
    id: 'group-3',
    name: "Language Enrichment Group",
    date: "2025-01-17T14:00:00",
    duration: 50,
    type: "Group",
    studentIds: [3, 5, 2], // Aisha Patel, Sofia Martinez, Marcus Johnson
    goals: ["Vocabulary expansion", "Grammar practice", "Narrative skills"],
    status: "Scheduled",
    description: "Advanced language skills for upper elementary students",
    room: "Therapy Room C"
  },
  {
    id: 'group-4',
    name: "Fluency Support Group",
    date: "2025-01-18T10:00:00",
    duration: 45,
    type: "Group",
    studentIds: [2, 4], // Marcus Johnson, Dylan Chen
    goals: ["Fluency techniques", "Confidence building", "Breathing exercises"],
    status: "Scheduled",
    description: "Supportive environment for fluency practice",
    room: "Therapy Room A"
  },
  {
    id: 'group-5',
    name: "Reading Readiness Group",
    date: "2025-01-19T09:30:00",
    duration: 40,
    type: "Group",
    studentIds: [1, 4, 3], // Emma Rodriguez, Dylan Chen, Aisha Patel
    goals: ["Pre-reading skills", "Phonemic awareness", "Letter-sound correspondence"],
    status: "Scheduled",
    description: "Foundation skills for reading success",
    room: "Therapy Room B"
  },
  {
    id: 'group-6',
    name: "Peer Communication Circle",
    date: "2025-01-22T11:30:00",
    duration: 45,
    type: "Group",
    studentIds: [2, 3, 5], // Marcus Johnson, Aisha Patel, Sofia Martinez
    goals: ["Peer interaction", "Problem solving", "Social pragmatics"],
    status: "Scheduled",
    description: "Interactive group for social communication development",
    room: "Therapy Room C"
  }
];

// Navigation Component
const Navigation = ({ currentTab, onTabChange, onLogout, currentUser }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/' },
    { id: 'caseload', name: 'Caseload', icon: Users, path: '/caseload' },
    { id: 'schedule', name: 'Schedule', icon: Calendar, path: '/schedule' },
    { id: 'students', name: 'Students', icon: GraduationCap, path: '/students' }
  ];

  return (
    <nav className="bg-slate-900 text-white h-16 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Achieve</h1>
        </div>
        
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors",
                currentTab === tab.id
                  ? "bg-slate-700 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg">
          <Search className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-white">{currentUser?.name}</div>
            <div className="text-xs text-slate-400">Speech Therapist</div>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Login Component
export const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    setting: '',
    role: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app would authenticate
    onLogin({
      name: formData.name || 'Dr. Sarah Johnson',
      email: formData.email,
      role: 'Speech Language Pathologist'
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Achieve</h1>
          </div>
          <h2 className="text-xl text-slate-600">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <select
                    name="setting"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.setting}
                    onChange={handleInputChange}
                  >
                    <option value="">What setting do you work in?</option>
                    <option value="school">School District</option>
                    <option value="clinic">Private Clinic</option>
                    <option value="hospital">Hospital</option>
                    <option value="home">Home Health</option>
                  </select>
                </div>
                <div>
                  <select
                    name="role"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="">What is your role in that setting?</option>
                    <option value="slp">Speech Language Pathologist</option>
                    <option value="assistant">SLP Assistant</option>
                    <option value="supervisor">Clinical Supervisor</option>
                  </select>
                </div>
              </>
            )}
            
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {isSignUp && (
            <div className="text-sm text-slate-600">
              <p>Password must contain:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>At least 6 characters</li>
                <li>At least 1 uppercase letter</li>
                <li>At least 1 number</li>
              </ul>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Dashboard Component
export const Dashboard = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('dashboard');

  const upcomingIEPs = mockStudents.filter(student => 
    student.iepDue && new Date(student.iepDue) <= addDays(new Date(), 30)
  );

  const upcomingEvaluations = mockStudents.filter(student => 
    student.evaluationDue && new Date(student.evaluationDue) <= addDays(new Date(), 30)
  );

  const todaySessions = mockSessions.filter(session =>
    format(new Date(session.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const todayGroupSessions = mockGroupSessions.filter(session =>
    format(new Date(session.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    switch(tab) {
      case 'caseload':
        navigate('/caseload');
        break;
      case 'schedule':
        navigate('/schedule');
        break;
      case 'students':
        navigate('/students');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onLogout={onLogout}
        currentUser={currentUser}
      />
      
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, {currentUser?.name}</h1>
          <p className="text-slate-600">Here's what's happening with your caseload today</p>
        </div>

        {/* AI Insights Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="h-6 w-6" />
            <h2 className="text-xl font-semibold">AI Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-90">This Week's Focus</div>
              <div className="font-semibold">3 students showing rapid progress in articulation goals</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-90">Scheduling Optimization</div>
              <div className="font-semibold">Consider grouping Emma and Sofia for social skills practice</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-90">Data Pattern</div>
              <div className="font-semibold">Morning sessions show 23% better engagement</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-slate-900">{mockStudents.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Today's Sessions</p>
                <p className="text-2xl font-bold text-slate-900">{todaySessions.length + todayGroupSessions.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Upcoming IEPs</p>
                <p className="text-2xl font-bold text-slate-900">{upcomingIEPs.length}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Evaluations Due</p>
                <p className="text-2xl font-bold text-slate-900">{upcomingEvaluations.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming IEPs */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Upcoming IEPs</h3>
              <AlertCircle className="h-5 w-5 text-orange-500" />
            </div>
            
            {upcomingIEPs.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No upcoming IEPs</p>
            ) : (
              <div className="space-y-3">
                {upcomingIEPs.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p className="text-sm text-slate-600">Grade {student.grade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">
                        Due {format(new Date(student.iepDue), 'MMM dd')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Today's Sessions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Today's Sessions</h3>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            
            {todaySessions.length === 0 && todayGroupSessions.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No sessions scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {/* Individual Sessions */}
                {todaySessions.map(session => {
                  const student = mockStudents.find(s => s.id === session.studentId);
                  return (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img src={student?.avatar} alt={student?.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-slate-900">{student?.name}</p>
                          <p className="text-sm text-slate-600">{session.type} • {session.duration} min</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600">
                          {format(new Date(session.date), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  );
                })}
                
                {/* Group Sessions */}
                {todayGroupSessions.map(session => {
                  const students = session.studentIds.map(id => mockStudents.find(s => s.id === id)).filter(Boolean);
                  return (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Users className="h-5 w-5 text-purple-600" />
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">GROUP</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{session.name}</p>
                          <div className="flex items-center space-x-1 text-sm text-slate-600">
                            <span>{session.duration} min •</span>
                            <span>{students.map(s => s.name).join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-purple-600">
                          {format(new Date(session.date), 'h:mm a')}
                        </p>
                        <p className="text-xs text-slate-500">{session.room}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Caseload Component
export const Caseload = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('caseload');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    switch(tab) {
      case 'dashboard':
        navigate('/');
        break;
      case 'schedule':
        navigate('/schedule');
        break;
      case 'students':
        navigate('/students');
        break;
      default:
        navigate('/caseload');
    }
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onLogout={onLogout}
        currentUser={currentUser}
      />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">My Caseload</h1>
            <p className="text-slate-600">Manage all students in your caseload</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select 
                className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Students</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <div key={student.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => navigate(`/students/${student.id}`)}>
              <div className="flex items-center space-x-4 mb-4">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{student.name}</h3>
                  <p className="text-slate-600 text-sm">{student.grade} • Age {student.age}</p>
                </div>
                <span className={clsx("px-2 py-1 rounded-full text-xs font-medium", getProgressColor(student.progressLevel))}>
                  {student.progressLevel}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">Primary Goals</p>
                  <div className="space-y-1">
                    {student.primaryGoals.slice(0, 2).map((goal, index) => (
                      <p key={index} className="text-sm text-slate-600">• {goal}</p>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <div className="text-sm">
                    <p className="text-slate-500">Next Session</p>
                    <p className="font-medium text-slate-900">
                      {format(new Date(student.nextSession), 'MMM dd, h:mm a')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Progress</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{student.recentProgress.score}%</span>
                      <TrendingUp className={clsx("h-3 w-3", 
                        student.recentProgress.trend === 'up' ? 'text-green-500' : 'text-slate-400')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No students found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Schedule Component
export const Schedule = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('schedule');
  const [viewType, setViewType] = useState('week'); // day, week, month
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    switch(tab) {
      case 'dashboard':
        navigate('/');
        break;
      case 'caseload':
        navigate('/caseload');
        break;
      case 'students':
        navigate('/students');
        break;
      default:
        navigate('/schedule');
    }
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewType === 'day') {
      newDate.setDate(currentDate.getDate() + direction);
    } else if (viewType === 'week') {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else {
      newDate.setMonth(currentDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  const getViewDates = () => {
    if (viewType === 'day') {
      return [currentDate];
    } else if (viewType === 'week') {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return eachDayOfInterval({ start, end });
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return eachDayOfInterval({ start, end });
    }
  };

  const getSessionsForDate = (date) => {
    const individualSessions = mockSessions.filter(session => 
      format(new Date(session.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    
    const groupSessions = mockGroupSessions.filter(session => 
      format(new Date(session.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    
    return { individualSessions, groupSessions };
  };

  const handleSessionClick = (session) => {
    if (session.type === 'Group') {
      // Future: Navigate to live group session interface
      console.log('Opening group session:', session.name);
      // For now, show an alert
      alert(`Group Session: ${session.name}\nStudents: ${session.studentIds.map(id => mockStudents.find(s => s.id === id)?.name).join(', ')}\nReady for live session data collection!`);
    } else {
      // Future: Navigate to individual session interface
      console.log('Opening individual session for student:', session.studentId);
    }
  };

  const renderSessionCard = (session, isGroupSession = false) => {
    if (isGroupSession) {
      const students = session.studentIds.map(id => mockStudents.find(s => s.id === id)).filter(Boolean);
      return (
        <div 
          key={session.id} 
          className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500 cursor-pointer hover:bg-purple-100 transition-colors"
          onClick={() => handleSessionClick(session)}
        >
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">GROUP</span>
          </div>
          <div className="text-purple-600 font-medium">
            {format(new Date(session.date), 'h:mm a')}
          </div>
          <div className="flex-1">
            <p className="font-medium text-slate-900">{session.name}</p>
            <p className="text-sm text-slate-600">{session.duration} minutes • {session.room}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-slate-500">Students:</span>
              {students.map((student, index) => (
                <span key={student.id} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {student.name}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
              {session.status}
            </span>
          </div>
        </div>
      );
    } else {
      const student = mockStudents.find(s => s.id === session.studentId);
      return (
        <div 
          key={session.id} 
          className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => handleSessionClick(session)}
        >
          <div className="text-blue-600 font-medium">
            {format(new Date(session.date), 'h:mm a')}
          </div>
          <img src={student?.avatar} alt={student?.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-medium text-slate-900">{student?.name}</p>
            <p className="text-sm text-slate-600">{session.type} • {session.duration} minutes</p>
          </div>
          <div className="text-right">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
              {session.status}
            </span>
          </div>
        </div>
      );
    }
  };

  const viewDates = getViewDates();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onLogout={onLogout}
        currentUser={currentUser}
      />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Schedule</h1>
            <p className="text-slate-600">Manage your therapy sessions</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>New Session</span>
          </button>
        </div>

        {/* Schedule Controls */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h2 className="text-lg font-semibold text-slate-900">
                {viewType === 'day' && format(currentDate, 'EEEE, MMMM dd, yyyy')}
                {viewType === 'week' && `Week of ${format(startOfWeek(currentDate), 'MMM dd, yyyy')}`}
                {viewType === 'month' && format(currentDate, 'MMMM yyyy')}
              </h2>
              <button 
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {['day', 'week', 'month'].map(type => (
                <button
                  key={type}
                  onClick={() => setViewType(type)}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-sm font-medium capitalize",
                    viewType === type 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        {viewType === 'day' ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">
                {format(currentDate, 'EEEE, MMMM dd')}
              </h3>
              <div className="space-y-3">
                {(() => {
                  const { individualSessions, groupSessions } = getSessionsForDate(currentDate);
                  const allSessions = [
                    ...individualSessions.map(session => ({ ...session, isGroup: false })),
                    ...groupSessions.map(session => ({ ...session, isGroup: true }))
                  ].sort((a, b) => new Date(a.date) - new Date(b.date));

                  if (allSessions.length === 0) {
                    return <p className="text-slate-500 text-center py-8">No sessions scheduled for this day</p>;
                  }

                  return allSessions.map(session => 
                    renderSessionCard(session, session.isGroup)
                  );
                })()}
              </div>
            </div>
          </div>
        ) : viewType === 'week' ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-slate-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center font-medium text-slate-600 border-r border-slate-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {viewDates.map(date => {
                const { individualSessions, groupSessions } = getSessionsForDate(date);
                const allSessions = [
                  ...individualSessions,
                  ...groupSessions
                ].sort((a, b) => new Date(a.date) - new Date(b.date));

                return (
                  <div key={date.toISOString()} className="min-h-[120px] p-2 border-r border-slate-200 last:border-r-0">
                    <div className={clsx(
                      "text-sm font-medium mb-2",
                      isToday(date) ? "text-blue-600" : "text-slate-900"
                    )}>
                      {format(date, 'd')}
                    </div>
                    <div className="space-y-1">
                      {allSessions.slice(0, 3).map(session => {
                        const isGroup = session.studentIds !== undefined;
                        if (isGroup) {
                          return (
                            <div 
                              key={session.id} 
                              className="text-xs p-1 bg-purple-100 text-purple-700 rounded truncate cursor-pointer hover:bg-purple-200"
                              onClick={() => handleSessionClick(session)}
                            >
                              {format(new Date(session.date), 'h:mm a')} {session.name}
                            </div>
                          );
                        } else {
                          const student = mockStudents.find(s => s.id === session.studentId);
                          return (
                            <div 
                              key={session.id} 
                              className="text-xs p-1 bg-blue-100 text-blue-700 rounded truncate cursor-pointer hover:bg-blue-200"
                              onClick={() => handleSessionClick(session)}
                            >
                              {format(new Date(session.date), 'h:mm a')} {student?.name}
                            </div>
                          );
                        }
                      })}
                      {allSessions.length > 3 && (
                        <div className="text-xs text-slate-500">
                          +{allSessions.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-slate-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center font-medium text-slate-600 border-r border-slate-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {viewDates.map(date => {
                const { individualSessions, groupSessions } = getSessionsForDate(date);
                const allSessions = [
                  ...individualSessions,
                  ...groupSessions
                ].sort((a, b) => new Date(a.date) - new Date(b.date));

                return (
                  <div key={date.toISOString()} className={clsx(
                    "min-h-[100px] p-2 border-r border-b border-slate-200 last:border-r-0",
                    !isSameMonth(date, currentDate) && "bg-slate-50"
                  )}>
                    <div className={clsx(
                      "text-sm font-medium mb-1",
                      isToday(date) ? "text-blue-600" : 
                      isSameMonth(date, currentDate) ? "text-slate-900" : "text-slate-400"
                    )}>
                      {format(date, 'd')}
                    </div>
                    <div className="space-y-1">
                      {allSessions.slice(0, 2).map(session => {
                        const isGroup = session.studentIds !== undefined;
                        return (
                          <div 
                            key={session.id} 
                            className={clsx(
                              "text-xs p-1 rounded truncate cursor-pointer",
                              isGroup 
                                ? "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            )}
                            onClick={() => handleSessionClick(session)}
                          >
                            {format(new Date(session.date), 'h:mm a')}
                            {isGroup ? ` (Group)` : ''}
                          </div>
                        );
                      })}
                      {allSessions.length > 2 && (
                        <div className="text-xs text-slate-500">
                          +{allSessions.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Students Component
export const Students = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('students');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeStudentTab, setActiveStudentTab] = useState('overview');

  React.useEffect(() => {
    if (id) {
      const student = mockStudents.find(s => s.id === parseInt(id));
      setSelectedStudent(student);
    }
  }, [id]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    switch(tab) {
      case 'dashboard':
        navigate('/');
        break;
      case 'caseload':
        navigate('/caseload');
        break;
      case 'schedule':
        navigate('/schedule');
        break;
      default:
        navigate('/students');
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    navigate(`/students/${student.id}`);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    navigate('/students');
  };

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation 
          currentTab={currentTab} 
          onTabChange={handleTabChange} 
          onLogout={onLogout}
          currentUser={currentUser}
        />
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <button 
              onClick={handleBackToList}
              className="p-2 hover:bg-slate-200 rounded-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-4">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{selectedStudent.name}</h1>
                <p className="text-slate-600">{selectedStudent.grade} • Age {selectedStudent.age}</p>
              </div>
            </div>
          </div>

          {/* Student Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
            <div className="flex border-b border-slate-200">
              {[
                { id: 'overview', name: 'Overview', icon: User },
                { id: 'goals', name: 'Goals & Progress', icon: Target },
                { id: 'assessments', name: 'Assessments', icon: BarChart3 },
                { id: 'sessions', name: 'Session Notes', icon: MessageSquare },
                { id: 'schedule', name: 'Schedule', icon: CalendarIcon }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveStudentTab(tab.id)}
                  className={clsx(
                    "flex items-center space-x-2 px-6 py-4 font-medium transition-colors",
                    activeStudentTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeStudentTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Student Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Status:</span>
                          <span className="font-medium text-green-600">{selectedStudent.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Therapy Type:</span>
                          <span className="font-medium">{selectedStudent.therapyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Services per Week:</span>
                          <span className="font-medium">{selectedStudent.servicesPerWeek}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Session Length:</span>
                          <span className="font-medium">{selectedStudent.sessionLength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Progress Level:</span>
                          <span className={clsx("font-medium", getProgressColor(selectedStudent.progressLevel))}>
                            {selectedStudent.progressLevel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Accommodations</h3>
                      <div className="space-y-2">
                        {selectedStudent.accommodations.map((accommodation, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-slate-700">{accommodation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Primary Goals</h3>
                      <div className="space-y-3">
                        {selectedStudent.primaryGoals.map((goal, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Target className="h-4 w-4 text-blue-600" />
                              <span className="font-medium text-slate-900">Goal {index + 1}</span>
                            </div>
                            <p className="text-slate-700">{goal}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">AI Insights</h3>
                      <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-purple-900">Smart Recommendations</span>
                        </div>
                        <p className="text-purple-800 text-sm">
                          Based on recent progress, consider introducing peer interaction activities 
                          to enhance social communication skills. Morning sessions show 15% better 
                          engagement for this student.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStudentTab === 'goals' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-900">Goals & Progress Tracking</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Add New Goal
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {selectedStudent.primaryGoals.map((goal, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-slate-900">Goal {index + 1}</h4>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-slate-700 mb-4">{goal}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{65 + index * 10}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${65 + index * 10}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="text-sm text-slate-600">
                            <p>Target Date: March 15, 2024</p>
                            <p>Last Updated: 2 days ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStudentTab === 'assessments' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-900">Assessment History</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      New Assessment
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: "GFTA-3 Assessment", date: "2024-01-10", score: "85%", status: "Complete" },
                      { name: "CELF-5 Evaluation", date: "2023-12-15", score: "78%", status: "Complete" },
                      { name: "Articulation Screener", date: "2023-11-20", score: "72%", status: "Complete" }
                    ].map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <BarChart3 className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-slate-900">{assessment.name}</h4>
                            <p className="text-sm text-slate-600">{assessment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">{assessment.score}</p>
                          <p className="text-sm text-green-600">{assessment.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStudentTab === 'sessions' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-900">Session Notes</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Add Note
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        date: "2024-01-12", 
                        time: "10:00 AM",
                        duration: "30 min",
                        focus: "Articulation - /R/ sound",
                        notes: "Student showed great improvement with /R/ in isolation. Practiced with picture cards and achieved 80% accuracy.",
                        aiSuggestion: "Consider introducing /R/ in syllable level activities next session."
                      },
                      { 
                        date: "2024-01-10", 
                        time: "10:00 AM",
                        duration: "30 min",
                        focus: "Language comprehension",
                        notes: "Worked on following 2-step directions. Student needed visual supports but completed 7/10 tasks correctly.",
                        aiSuggestion: "Continue with visual supports and gradually increase complexity."
                      }
                    ].map((session, index) => (
                      <div key={index} className="bg-white border border-slate-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium text-slate-900">{session.focus}</h4>
                            <p className="text-sm text-slate-600">{session.date} • {session.time} • {session.duration}</p>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600">
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-slate-900 mb-2">Session Notes</h5>
                            <p className="text-slate-700">{session.notes}</p>
                          </div>
                          
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Brain className="h-4 w-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">AI Suggestion</span>
                            </div>
                            <p className="text-sm text-purple-800">{session.aiSuggestion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStudentTab === 'schedule' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">Therapy Schedule</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-4">Weekly Schedule</h4>
                      <div className="space-y-3">
                        {[
                          { day: "Monday", time: "10:00 AM", type: "Individual", duration: "30 min" },
                          { day: "Wednesday", time: "10:00 AM", type: "Individual", duration: "30 min" },
                          { day: "Friday", time: "11:30 AM", type: "Group", duration: "45 min" }
                        ].map((schedule, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                              <p className="font-medium text-slate-900">{schedule.day}</p>
                              <p className="text-sm text-slate-600">{schedule.type} Session</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-blue-600">{schedule.time}</p>
                              <p className="text-sm text-slate-600">{schedule.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 mb-4">Upcoming Sessions</h4>
                      <div className="space-y-3">
                        {mockSessions.filter(s => s.studentId === selectedStudent.id).map(session => (
                          <div key={session.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                              <p className="font-medium text-slate-900">
                                {format(new Date(session.date), 'MMM dd')}
                              </p>
                              <p className="text-sm text-slate-600">{session.type} Session</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-green-600">
                                {format(new Date(session.date), 'h:mm a')}
                              </p>
                              <p className="text-sm text-slate-600">{session.duration} min</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onLogout={onLogout}
        currentUser={currentUser}
      />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Students</h1>
            <p className="text-slate-600">Select a student to view detailed information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStudents.map(student => (
            <div key={student.id} 
                 className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => handleStudentSelect(student)}>
              <div className="flex items-center space-x-4 mb-4">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{student.name}</h3>
                  <p className="text-slate-600 text-sm">{student.grade} • Age {student.age}</p>
                </div>
                <span className={clsx("px-2 py-1 rounded-full text-xs font-medium", getProgressColor(student.progressLevel))}>
                  {student.progressLevel}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">Primary Goals</p>
                  <div className="space-y-1">
                    {student.primaryGoals.slice(0, 2).map((goal, index) => (
                      <p key={index} className="text-sm text-slate-600">• {goal}</p>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <div className="text-sm">
                    <p className="text-slate-500">Services</p>
                    <p className="font-medium text-slate-900">{student.servicesPerWeek}x/week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Progress</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{student.recentProgress.score}%</span>
                      <TrendingUp className={clsx("h-3 w-3", 
                        student.recentProgress.trend === 'up' ? 'text-green-500' : 'text-slate-400')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};