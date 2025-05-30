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

// Helper functions for dates and colors
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentWeek = [];
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfCurrentWeek);
    date.setDate(startOfCurrentWeek.getDate() + i);
    currentWeek.push(date);
  }
  return currentWeek;
};

const formatDateForSessions = (timestamp) => {
  // Convert timestamp to Date object before calling toISOString
  return new Date(timestamp).toISOString();
};

const getProgressColor = (level) => {
  switch(level) {
    case 'Excellent': return 'text-green-600 bg-green-100';
    case 'Progressing': return 'text-blue-600 bg-blue-100';
    case 'Needs Support': return 'text-orange-600 bg-orange-100';
    default: return 'text-slate-600 bg-slate-100';
  }
};

// Get current week dates for scheduling
const currentWeekDates = getCurrentWeekDates();

// Mock Data with current week dates
const mockStudents = [
  {
    id: 1,
    name: "Emma Rodriguez",
    age: 8,
    grade: "3rd Grade",
    avatar: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg",
    status: "Active",
    primaryGoals: ["Articulation - /R/ sound production", "Language comprehension"],
    nextSession: formatDateForSessions(new Date(currentWeekDates[1].getTime()).setHours(10, 0, 0)),
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
    nextSession: formatDateForSessions(new Date(currentWeekDates[5].getTime()).setHours(10, 30, 0)),
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
    nextSession: formatDateForSessions(new Date(currentWeekDates[2].getTime()).setHours(9, 0, 0)),
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
    nextSession: formatDateForSessions(new Date(currentWeekDates[2].getTime()).setHours(14, 0, 0)),
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
    nextSession: formatDateForSessions(new Date(currentWeekDates[4].getTime()).setHours(11, 0, 0)),
    iepDue: "2025-03-10",
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
    date: formatDateForSessions(new Date(currentWeekDates[1].getTime()).setHours(10, 0, 0)), // Monday 10:00 AM
    duration: 30,
    type: "Individual",
    goals: ["Articulation practice", "Homework review"],
    status: "Scheduled"
  },
  {
    id: 2,
    studentId: 3,
    date: formatDateForSessions(new Date(currentWeekDates[2].getTime()).setHours(9, 0, 0)), // Tuesday 9:00 AM
    duration: 30,
    type: "Individual",
    goals: ["Voice exercises", "Communication practice"],
    status: "Scheduled"
  },
  {
    id: 3,
    studentId: 4,
    date: formatDateForSessions(new Date(currentWeekDates[2].getTime()).setHours(14, 0, 0)), // Tuesday 2:00 PM
    duration: 30,
    type: "Individual",
    goals: ["Phonics work", "Vocabulary building"],
    status: "Scheduled"
  },
  {
    id: 4,
    studentId: 1,
    date: formatDateForSessions(new Date(currentWeekDates[3].getTime()).setHours(9, 0, 0)), // Wednesday 9:00 AM
    duration: 30,
    type: "Individual",
    goals: ["Articulation - /R/ sound practice"],
    status: "Scheduled"
  },
  {
    id: 5,
    studentId: 5,
    date: formatDateForSessions(new Date(currentWeekDates[4].getTime()).setHours(11, 0, 0)), // Thursday 11:00 AM
    duration: 30,
    type: "Individual",
    goals: ["Reading comprehension", "Language structure"],
    status: "Scheduled"
  },
  {
    id: 6,
    studentId: 2,
    date: formatDateForSessions(new Date(currentWeekDates[5].getTime()).setHours(10, 30, 0)), // Friday 10:30 AM
    duration: 30,
    type: "Individual",
    goals: ["Fluency techniques", "Confidence building"],
    status: "Scheduled"
  }
];

const mockGroupSessions = [
  {
    id: 'group-1',
    name: "Social Communication Group",
    date: formatDateForSessions(new Date(currentWeekDates[1].getTime()).setHours(13, 0, 0)), // Monday 1:00 PM
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
    date: formatDateForSessions(new Date(currentWeekDates[2].getTime()).setHours(15, 30, 0)), // Tuesday 3:30 PM
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
    date: formatDateForSessions(new Date(currentWeekDates[3].getTime()).setHours(14, 0, 0)), // Wednesday 2:00 PM
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
    date: formatDateForSessions(new Date(currentWeekDates[4].getTime()).setHours(10, 0, 0)), // Thursday 10:00 AM
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
    date: formatDateForSessions(new Date(currentWeekDates[5].getTime()).setHours(9, 30, 0)), // Friday 9:30 AM
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
    date: formatDateForSessions(new Date(currentWeekDates[1].getTime()).setHours(11, 30, 0)), // Monday 11:30 AM
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
    { id: 'schedule', name: 'Schedule', icon: Calendar, path: '/schedule' }
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
      case 'dashboard':
        navigate('/');
        break;
      case 'caseload':
        navigate('/caseload');
        break;
      default:
        navigate('/schedule');
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
                 onClick={() => navigate(`/student/${student.id}`)}>
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
    if (session.type === 'Group' || session.studentIds) {
      // Navigate to live group session interface
      console.log('Opening group session:', session.name);
      navigate(`/live-session/${session.id}`);
    } else {
      // Navigate to individual session interface
      console.log('Opening individual session for student:', session.studentId);
      navigate(`/live-session/${session.id}`);
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
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/schedule-grid')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Grid View</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>New Session</span>
            </button>
          </div>
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

// LiveSession Component for Data Collection
export const LiveSession = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [currentTab, setCurrentTab] = useState('schedule');
  const [activeStudentTab, setActiveStudentTab] = useState(0);
  const [sessionData, setSessionData] = useState({});
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Find the session data
  const session = React.useMemo(() => {
    // Try to find in individual sessions first
    let foundSession = mockSessions.find(s => s.id.toString() === sessionId);
    if (foundSession) {
      return { ...foundSession, isGroup: false };
    }
    
    // Try to find in group sessions
    foundSession = mockGroupSessions.find(s => s.id.toString() === sessionId);
    if (foundSession) {
      return { ...foundSession, isGroup: true };
    }
    
    return null;
  }, [sessionId]);

  const students = React.useMemo(() => {
    if (!session) return [];
    
    if (session.isGroup) {
      return session.studentIds.map(id => mockStudents.find(s => s.id === id)).filter(Boolean);
    } else {
      const student = mockStudents.find(s => s.id === session.studentId);
      return student ? [student] : [];
    }
  }, [session]);

  const activeStudent = students[activeStudentTab] || students[0];

  // Timer effect
  React.useEffect(() => {
    let interval;
    if (isSessionActive && sessionStartTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionStartTime]);

  // Initialize session data for each student
  React.useEffect(() => {
    if (students.length > 0) {
      const initialData = {};
      students.forEach(student => {
        initialData[student.id] = {
          goals: student.primaryGoals.map((goal, index) => ({
            id: index,
            description: goal,
            attempts: [],
            currentTrials: 0,
            accuracy: 0,
            notes: '',
            status: 'not-started' // not-started, in-progress, completed
          })),
          behaviorData: {
            engagement: 5,
            cooperation: 5,
            attention: 5,
            notes: ''
          },
          sessionNotes: '',
          nextSteps: ''
        };
      });
      setSessionData(initialData);
    }
  }, [students]);

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

  const startSession = () => {
    setIsSessionActive(true);
    setSessionStartTime(new Date());
    setElapsedTime(0);
  };

  const endSession = () => {
    setIsSessionActive(false);
    // Here you would typically save the session data
    alert('Session ended! Data saved successfully.');
    navigate('/schedule');
  };

  const addTrialData = (studentId, goalId, wasCorrect) => {
    setSessionData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        goals: prev[studentId].goals.map(goal => {
          if (goal.id === goalId) {
            const newAttempts = [...goal.attempts, wasCorrect];
            const newTrials = goal.currentTrials + 1;
            const newAccuracy = Math.round((newAttempts.filter(a => a).length / newTrials) * 100);
            return {
              ...goal,
              attempts: newAttempts,
              currentTrials: newTrials,
              accuracy: newAccuracy,
              status: newTrials > 0 ? 'in-progress' : 'not-started'
            };
          }
          return goal;
        })
      }
    }));
  };

  const updateSessionNotes = (studentId, field, value) => {
    setSessionData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const updateBehaviorData = (studentId, behavior, value) => {
    setSessionData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        behaviorData: {
          ...prev[studentId].behaviorData,
          [behavior]: value
        }
      }
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Session Not Found</h2>
          <button 
            onClick={() => navigate('/schedule')}
            className="text-blue-600 hover:text-blue-500"
          >
            Return to Schedule
          </button>
        </div>
      </div>
    );
  }

  const currentStudentData = sessionData[activeStudent?.id] || {};

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onLogout={onLogout}
        currentUser={currentUser}
      />
      
      <div className="p-6">
        {/* Session Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/schedule')}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {session.isGroup ? session.name : `${activeStudent?.name} - Individual Session`}
                </h1>
                <p className="text-slate-600">
                  {format(new Date(session.date), 'EEEE, MMMM dd, yyyy')} • {format(new Date(session.date), 'h:mm a')} • {session.duration} minutes
                  {session.room && ` • ${session.room}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Session Timer */}
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {formatTime(elapsedTime)}
                </div>
                <div className="text-xs text-slate-500">
                  {session.duration} min session
                </div>
              </div>
              
              {/* Session Controls */}
              {!isSessionActive ? (
                <button
                  onClick={startSession}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Activity className="h-4 w-4" />
                  <span>Start Session</span>
                </button>
              ) : (
                <button
                  onClick={endSession}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                >
                  <Clock className="h-4 w-4" />
                  <span>End Session</span>
                </button>
              )}
            </div>
          </div>

          {/* Student Tabs for Group Sessions */}
          {students.length > 1 && (
            <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
              {students.map((student, index) => (
                <button
                  key={student.id}
                  onClick={() => setActiveStudentTab(index)}
                  className={clsx(
                    "flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors flex-1",
                    activeStudentTab === index
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <img src={student.avatar} alt={student.name} className="w-6 h-6 rounded-full object-cover" />
                  <span>{student.name}</span>
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                    {student.grade}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active Student Data Collection */}
        {activeStudent && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Goals and Data Collection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Goals & Data Collection - {activeStudent.name}
                </h3>
                
                <div className="space-y-4">
                  {currentStudentData.goals?.map((goal, index) => (
                    <div key={goal.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-900">Goal {index + 1}</h4>
                        <span className={clsx(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          goal.status === 'completed' ? 'bg-green-100 text-green-600' :
                          goal.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-slate-100 text-slate-600'
                        )}>
                          {goal.status.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-slate-700 mb-3">{goal.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900">{goal.currentTrials}</div>
                          <div className="text-xs text-slate-500">Trials</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900">{goal.accuracy}%</div>
                          <div className="text-xs text-slate-500">Accuracy</div>
                        </div>
                      </div>
                      
                      {/* Trial Data Input */}
                      {isSessionActive && (
                        <div className="flex space-x-2 mb-3">
                          <button
                            onClick={() => addTrialData(activeStudent.id, goal.id, true)}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Correct</span>
                          </button>
                          <button
                            onClick={() => addTrialData(activeStudent.id, goal.id, false)}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                          >
                            <AlertCircle className="h-4 w-4" />
                            <span>Incorrect</span>
                          </button>
                        </div>
                      )}
                      
                      {/* Recent Trials Display */}
                      {goal.attempts.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-slate-500 mr-2">Recent:</span>
                          {goal.attempts.slice(-10).map((attempt, i) => (
                            <div
                              key={i}
                              className={clsx(
                                "w-4 h-4 rounded-full",
                                attempt ? "bg-green-500" : "bg-red-500"
                              )}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Goal Notes */}
                      <textarea
                        placeholder="Goal-specific notes..."
                        className="w-full mt-3 p-2 border border-slate-300 rounded-lg text-sm"
                        rows="2"
                        value={goal.notes}
                        onChange={(e) => {
                          const updatedGoals = currentStudentData.goals.map(g => 
                            g.id === goal.id ? { ...g, notes: e.target.value } : g
                          );
                          updateSessionNotes(activeStudent.id, 'goals', updatedGoals);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Behavior Data and Notes */}
            <div className="space-y-6">
              {/* Behavior Tracking */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Behavior Data</h3>
                
                <div className="space-y-4">
                  {[
                    { key: 'engagement', label: 'Engagement', icon: Star },
                    { key: 'cooperation', label: 'Cooperation', icon: Users },
                    { key: 'attention', label: 'Attention', icon: Target }
                  ].map(behavior => (
                    <div key={behavior.key}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <behavior.icon className="h-4 w-4 text-slate-600" />
                          <span className="text-sm font-medium text-slate-900">{behavior.label}</span>
                        </div>
                        <span className="text-sm text-slate-600">
                          {currentStudentData.behaviorData?.[behavior.key] || 5}/10
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={currentStudentData.behaviorData?.[behavior.key] || 5}
                        onChange={(e) => updateBehaviorData(activeStudent.id, behavior.key, parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                
                <textarea
                  placeholder="Behavior notes..."
                  className="w-full mt-4 p-3 border border-slate-300 rounded-lg text-sm"
                  rows="3"
                  value={currentStudentData.behaviorData?.notes || ''}
                  onChange={(e) => updateBehaviorData(activeStudent.id, 'notes', e.target.value)}
                />
              </div>

              {/* Session Notes */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Session Notes</h3>
                
                <textarea
                  placeholder="Overall session notes for this student..."
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm"
                  rows="4"
                  value={currentStudentData.sessionNotes || ''}
                  onChange={(e) => updateSessionNotes(activeStudent.id, 'sessionNotes', e.target.value)}
                />
              </div>

              {/* Next Steps */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Next Steps</h3>
                
                <textarea
                  placeholder="Recommendations for next session..."
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm"
                  rows="3"
                  value={currentStudentData.nextSteps || ''}
                  onChange={(e) => updateSessionNotes(activeStudent.id, 'nextSteps', e.target.value)}
                />
              </div>

              {/* AI Recommendations */}
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-900">AI Recommendations</h3>
                </div>
                <div className="space-y-2 text-sm text-purple-800">
                  <p>• Consider increasing trial difficulty based on 78% accuracy</p>
                  <p>• Strong engagement suggests readiness for peer interaction activities</p>
                  <p>• Recommend visual cue fading for next session</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// StudentDetail Component - Comprehensive Student Information
export const StudentDetail = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('caseload');
  const [activeTab, setActiveTab] = useState('overview');

  const student = mockStudents.find(s => s.id === parseInt(id));

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    switch(tab) {
      case 'dashboard':
        navigate('/');
        break;
      case 'schedule':
        navigate('/schedule');
        break;
      default:
        navigate('/caseload');
    }
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Student Not Found</h2>
          <button 
            onClick={() => navigate('/caseload')}
            className="text-blue-600 hover:text-blue-500"
          >
            Return to Caseload
          </button>
        </div>
      </div>
    );
  }

  // Mock additional data for the student
  const studentSessions = mockSessions.filter(s => s.studentId === student.id)
    .concat(mockGroupSessions.filter(s => s.studentIds.includes(student.id)));

  const assessmentHistory = [
    {
      id: 1,
      name: "GFTA-3 Assessment",
      date: "2024-12-10",
      score: "85%",
      status: "Complete",
      type: "Articulation",
      notes: "Significant improvement in /R/ sound production"
    },
    {
      id: 2,
      name: "CELF-5 Evaluation",
      date: "2024-11-15",
      score: "78%",
      status: "Complete",
      type: "Language",
      notes: "Working level language skills, continued therapy recommended"
    },
    {
      id: 3,
      name: "Fluency Assessment",
      date: "2024-10-20",
      score: "72%",
      status: "Complete",
      type: "Fluency",
      notes: "Mild disfluencies noted, monitoring progress"
    }
  ];

  const progressData = [
    { date: "2024-11-01", goal: "Articulation", accuracy: 65 },
    { date: "2024-11-08", goal: "Articulation", accuracy: 70 },
    { date: "2024-11-15", goal: "Articulation", accuracy: 75 },
    { date: "2024-11-22", goal: "Articulation", accuracy: 78 },
    { date: "2024-11-29", goal: "Articulation", accuracy: 82 }
  ];

  const strategies = [
    "Use visual cues for sound production",
    "Provide frequent positive reinforcement",
    "Break tasks into smaller steps",
    "Allow extra processing time",
    "Use peer modeling when appropriate",
    "Incorporate movement into activities"
  ];

  const recordedSessions = [
    {
      id: 1,
      date: "2024-12-01",
      type: "Individual",
      duration: "30 min",
      goals: ["Articulation practice"],
      notes: "Great progress on /R/ sounds",
      recording: "session_001.mp4"
    },
    {
      id: 2,
      date: "2024-11-28",
      type: "Group",
      duration: "45 min",
      goals: ["Social communication"],
      notes: "Participated well in group discussion",
      recording: "session_002.mp4"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onLogout={onLogout}
        currentUser={currentUser}
      />
      
      <div className="p-6">
        {/* Student Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <button 
              onClick={() => navigate('/caseload')}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-4 flex-1">
              <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full object-cover" />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900">{student.name}</h1>
                <p className="text-slate-600 text-lg">{student.grade} • Age {student.age}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={clsx("px-3 py-1 rounded-full text-sm font-medium", getProgressColor(student.progressLevel))}>
                    {student.progressLevel}
                  </span>
                  <span className="text-sm text-slate-600">{student.therapyType} Therapy</span>
                  <span className="text-sm text-slate-600">{student.servicesPerWeek}x/week</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">Overall Progress</div>
                <div className="text-3xl font-bold text-slate-900">{student.recentProgress.score}%</div>
                <div className="flex items-center justify-end space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Improving</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200">
            {[
              { id: 'overview', name: 'Overview', icon: User },
              { id: 'goals', name: 'Goals & Progress', icon: Target },
              { id: 'assessments', name: 'Assessments', icon: BarChart3 },
              { id: 'sessions', name: 'Session History', icon: MessageSquare },
              { id: 'schedule', name: 'Schedule & Times', icon: CalendarIcon },
              { id: 'accommodations', name: 'Strategies', icon: BookOpen },
              { id: 'notes', name: 'Notes & Documents', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2",
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600"
                    : "text-slate-600 hover:text-slate-900 border-transparent"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Student Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Status</label>
                      <p className="text-slate-900">{student.status}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Therapy Type</label>
                      <p className="text-slate-900">{student.therapyType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Services per Week</label>
                      <p className="text-slate-900">{student.servicesPerWeek}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Session Length</label>
                      <p className="text-slate-900">{student.sessionLength}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Next Session</label>
                      <p className="text-slate-900">{format(new Date(student.nextSession), 'MMM dd, h:mm a')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Progress Level</label>
                      <p className="text-slate-900">{student.progressLevel}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Important Dates</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-5 w-5 text-orange-600" />
                        <span className="font-medium text-orange-900">IEP Due</span>
                      </div>
                      <p className="text-orange-800">
                        {student.iepDue ? format(new Date(student.iepDue), 'MMM dd, yyyy') : 'No IEP scheduled'}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Evaluation Due</span>
                      </div>
                      <p className="text-blue-800">
                        {student.evaluationDue ? format(new Date(student.evaluationDue), 'MMM dd, yyyy') : 'No evaluation scheduled'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Current Goals</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Add New Goal
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {student.primaryGoals.map((goal, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-slate-900">Goal {index + 1}</h4>
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-slate-700 mb-3">{goal}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="text-xl font-bold text-slate-900">{75 + index * 5}%</div>
                            <div className="text-xs text-slate-500">Accuracy</div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="text-xl font-bold text-slate-900">{20 + index * 10}</div>
                            <div className="text-xs text-slate-500">Sessions</div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="text-xl font-bold text-slate-900">{150 + index * 25}</div>
                            <div className="text-xs text-slate-500">Trials</div>
                          </div>
                        </div>
                        
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${75 + index * 5}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Progress Monitoring</h3>
                  <div className="space-y-3">
                    {progressData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{data.goal}</p>
                          <p className="text-sm text-slate-600">{format(new Date(data.date), 'MMM dd, yyyy')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">{data.accuracy}%</p>
                          <p className="text-sm text-slate-600">Accuracy</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assessments' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Assessment History</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    New Assessment
                  </button>
                </div>
                
                <div className="space-y-4">
                  {assessmentHistory.map(assessment => (
                    <div key={assessment.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <BarChart3 className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-slate-900">{assessment.name}</h4>
                          <p className="text-sm text-slate-600">{assessment.type} • {assessment.date}</p>
                          <p className="text-sm text-slate-700 mt-1">{assessment.notes}</p>
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

            {activeTab === 'sessions' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Sessions</h3>
                  
                  <div className="space-y-4">
                    {recordedSessions.map(session => (
                      <div key={session.id} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-slate-900">{session.type} Session</h4>
                            <p className="text-sm text-slate-600">{session.date} • {session.duration}</p>
                          </div>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                            View Recording
                          </button>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium text-slate-900 mb-1">Goals Addressed:</p>
                          <p className="text-sm text-slate-600">{session.goals.join(', ')}</p>
                        </div>
                        
                        <p className="text-sm text-slate-700">{session.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Therapy Schedule</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Weekly Schedule</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { day: "Monday", time: "10:00 AM", type: "Individual", duration: "30 min" },
                        { day: "Wednesday", time: "10:00 AM", type: "Individual", duration: "30 min" },
                        { day: "Friday", time: "11:30 AM", type: "Group", duration: "45 min" }
                      ].map((schedule, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-slate-900">{schedule.day}</p>
                              <p className="text-sm text-slate-600">{schedule.type} Session</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-blue-600">{schedule.time}</p>
                              <p className="text-sm text-slate-600">{schedule.duration}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Upcoming Sessions</h4>
                    <div className="space-y-3">
                      {studentSessions.slice(0, 5).map(session => (
                        <div key={session.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">
                              {format(new Date(session.date), 'MMM dd')}
                            </p>
                            <p className="text-sm text-slate-600">
                              {session.name || `${session.type} Session`}
                            </p>
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

            {activeTab === 'accommodations' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Strategies & Accommodations</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    Add Strategy
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Current Accommodations</h4>
                    <div className="space-y-2">
                      {student.accommodations.map((accommodation, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-slate-900">{accommodation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Recommended Strategies</h4>
                    <div className="space-y-2">
                      {strategies.map((strategy, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Target className="h-5 w-5 text-blue-600" />
                          <span className="text-slate-900">{strategy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Clinical Notes</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Add Note
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        date: "2024-12-01",
                        type: "Session Note",
                        content: "Student demonstrated excellent progress in /R/ sound production. Achieved 85% accuracy in structured activities.",
                        author: "Dr. Sarah Johnson"
                      },
                      {
                        date: "2024-11-28",
                        type: "Parent Conference",
                        content: "Met with parents to discuss home practice strategies. Parents report student is practicing daily.",
                        author: "Dr. Sarah Johnson"
                      },
                      {
                        date: "2024-11-15",
                        type: "IEP Meeting",
                        content: "Annual IEP review completed. Goals updated to reflect current performance level.",
                        author: "IEP Team"
                      }
                    ].map((note, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-600">{note.type}</span>
                          <span className="text-sm text-slate-500">{note.date}</span>
                        </div>
                        <p className="text-slate-700 mb-2">{note.content}</p>
                        <p className="text-sm text-slate-500">By: {note.author}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Documents</h3>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Current IEP", date: "2024-11-15", type: "PDF" },
                      { name: "Speech Evaluation Report", date: "2024-10-01", type: "PDF" },
                      { name: "Progress Report", date: "2024-12-01", type: "PDF" },
                      { name: "Parent Consent Forms", date: "2024-09-15", type: "PDF" }
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">{doc.name}</p>
                            <p className="text-sm text-slate-600">{doc.date} • {doc.type}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-500 text-sm">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Schedule Session</span>
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Add Note</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Run Assessment</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">AI Insights</h3>
              </div>
              <div className="space-y-2 text-sm text-purple-800">
                <p>• Student shows consistent improvement across all goals</p>
                <p>• Recommend increasing session frequency during IEP transition</p>
                <p>• Consider peer interaction opportunities for social skills</p>
                <p>• Parent engagement is high - continue home practice</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Session completed", time: "2 hours ago", icon: CheckCircle, color: "text-green-600" },
                  { action: "Goal updated", time: "1 day ago", icon: Target, color: "text-blue-600" },
                  { action: "Note added", time: "2 days ago", icon: MessageSquare, color: "text-purple-600" },
                  { action: "Assessment scheduled", time: "3 days ago", icon: BarChart3, color: "text-orange-600" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <activity.icon className={clsx("h-4 w-4", activity.color)} />
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ScheduleGrid Component - Bird's Eye View with Drag & Drop
export const ScheduleGrid = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('schedule');
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [draggedItem, setDraggedItem] = useState(null);
  const [scheduleData, setScheduleData] = useState(() => {
    // Initialize schedule data structure
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
      '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'
    ];
    
    const initialData = {};
    days.forEach(day => {
      initialData[day] = {};
      timeSlots.forEach(time => {
        initialData[day][time] = [];
      });
    });

    // Populate with existing sessions and groups
    const sessions = [
      // Individual Sessions
      { id: 'ind-1', student: 'Emma Rodriguez', type: 'individual', color: 'bg-blue-200 border-blue-400', day: 'Monday', time: '10:00', duration: 30 },
      { id: 'ind-2', student: 'Aisha Patel', type: 'individual', color: 'bg-green-200 border-green-400', day: 'Tuesday', time: '9:00', duration: 30 },
      { id: 'ind-3', student: 'Dylan Chen', type: 'individual', color: 'bg-yellow-200 border-yellow-400', day: 'Tuesday', time: '2:00', duration: 30 },
      { id: 'ind-4', student: 'Emma Rodriguez', type: 'individual', color: 'bg-blue-200 border-blue-400', day: 'Wednesday', time: '9:00', duration: 30 },
      { id: 'ind-5', student: 'Sofia Martinez', type: 'individual', color: 'bg-purple-200 border-purple-400', day: 'Thursday', time: '11:00', duration: 30 },
      { id: 'ind-6', student: 'Marcus Johnson', type: 'individual', color: 'bg-red-200 border-red-400', day: 'Friday', time: '10:00', duration: 30 },

      // Group Sessions
      { 
        id: 'group-1', 
        name: 'Social Communication Group',
        students: ['Marcus Johnson', 'Sofia Martinez'], 
        type: 'group', 
        color: 'bg-pink-200 border-pink-400', 
        day: 'Monday', 
        time: '1:00', 
        duration: 45 
      },
      { 
        id: 'group-2', 
        name: 'Articulation Practice',
        students: ['Emma Rodriguez', 'Dylan Chen'], 
        type: 'group', 
        color: 'bg-cyan-200 border-cyan-400', 
        day: 'Tuesday', 
        time: '3:00', 
        duration: 60 
      },
      { 
        id: 'group-3', 
        name: 'Language Enrichment',
        students: ['Aisha Patel', 'Sofia Martinez', 'Marcus Johnson'], 
        type: 'group', 
        color: 'bg-orange-200 border-orange-400', 
        day: 'Wednesday', 
        time: '2:00', 
        duration: 50 
      },
      { 
        id: 'group-4', 
        name: 'Fluency Support',
        students: ['Marcus Johnson', 'Dylan Chen'], 
        type: 'group', 
        color: 'bg-teal-200 border-teal-400', 
        day: 'Thursday', 
        time: '10:00', 
        duration: 45 
      },
      { 
        id: 'group-5', 
        name: 'Reading Readiness',
        students: ['Emma Rodriguez', 'Dylan Chen', 'Aisha Patel'], 
        type: 'group', 
        color: 'bg-indigo-200 border-indigo-400', 
        day: 'Friday', 
        time: '9:00', 
        duration: 40 
      }
    ];

    // Place sessions in the grid
    sessions.forEach(session => {
      if (initialData[session.day] && initialData[session.day][session.time]) {
        initialData[session.day][session.time].push(session);
      }
    });

    return initialData;
  });

  const [availableStudents] = useState([
    { id: 1, name: 'Emma Rodriguez', color: 'bg-blue-200 border-blue-400' },
    { id: 2, name: 'Marcus Johnson', color: 'bg-red-200 border-red-400' },
    { id: 3, name: 'Aisha Patel', color: 'bg-green-200 border-green-400' },
    { id: 4, name: 'Dylan Chen', color: 'bg-yellow-200 border-yellow-400' },
    { id: 5, name: 'Sofia Martinez', color: 'bg-purple-200 border-purple-400' }
  ]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    switch(tab) {
      case 'dashboard':
        navigate('/');
        break;
      case 'caseload':
        navigate('/caseload');
        break;
      default:
        navigate('/schedule');
    }
  };

  const handleDragStart = (e, item, sourceDay, sourceTime) => {
    setDraggedItem({ item, sourceDay, sourceTime });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDay, targetTime) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const { item, sourceDay, sourceTime } = draggedItem;

    // Don't do anything if dropped in the same place
    if (sourceDay === targetDay && sourceTime === targetTime) {
      setDraggedItem(null);
      return;
    }

    setScheduleData(prev => {
      const newData = { ...prev };
      
      // Remove from source
      newData[sourceDay][sourceTime] = newData[sourceDay][sourceTime].filter(s => s.id !== item.id);
      
      // Add to target
      const updatedItem = { ...item, day: targetDay, time: targetTime };
      newData[targetDay][targetTime] = [...newData[targetDay][targetTime], updatedItem];
      
      return newData;
    });

    setDraggedItem(null);
  };

  const handleNewStudentDrop = (e, targetDay, targetTime) => {
    e.preventDefault();
    
    const studentData = e.dataTransfer.getData('text/plain');
    if (!studentData) return;

    try {
      const student = JSON.parse(studentData);
      
      const newSession = {
        id: `new-${Date.now()}`,
        student: student.name,
        type: 'individual',
        color: student.color,
        day: targetDay,
        time: targetTime,
        duration: 30
      };

      setScheduleData(prev => ({
        ...prev,
        [targetDay]: {
          ...prev[targetDay],
          [targetTime]: [...prev[targetDay][targetTime], newSession]
        }
      }));
    } catch (error) {
      console.error('Error dropping student:', error);
    }
  };

  const addStudentToGroup = (groupId, studentName) => {
    setScheduleData(prev => {
      const newData = { ...prev };
      
      // Find the group and add the student
      Object.keys(newData).forEach(day => {
        Object.keys(newData[day]).forEach(time => {
          newData[day][time] = newData[day][time].map(session => {
            if (session.id === groupId && session.type === 'group') {
              return {
                ...session,
                students: [...session.students, studentName]
              };
            }
            return session;
          });
        });
      });
      
      return newData;
    });
  };

  const removeStudentFromGroup = (groupId, studentName) => {
    setScheduleData(prev => {
      const newData = { ...prev };
      
      // Find the group and remove the student
      Object.keys(newData).forEach(day => {
        Object.keys(newData[day]).forEach(time => {
          newData[day][time] = newData[day][time].map(session => {
            if (session.id === groupId && session.type === 'group') {
              return {
                ...session,
                students: session.students.filter(s => s !== studentName)
              };
            }
            return session;
          });
        });
      });
      
      return newData;
    });
  };

  const createNewGroup = (day, time) => {
    const newGroup = {
      id: `group-new-${Date.now()}`,
      name: 'New Group',
      students: [],
      type: 'group',
      color: 'bg-gray-200 border-gray-400',
      day,
      time,
      duration: 45
    };

    setScheduleData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: [...prev[day][time], newGroup]
      }
    }));
  };

  const deleteSession = (sessionId, day, time) => {
    setScheduleData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: prev[day][time].filter(s => s.id !== sessionId)
      }
    }));
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onLogout={onLogout}
        currentUser={currentUser}
      />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Schedule Grid</h1>
            <p className="text-slate-600">Drag and drop to manage your weekly schedule</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/schedule')}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-700"
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar View</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>New Session</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Student Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 sticky top-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Students</h3>
              <p className="text-sm text-slate-600 mb-4">Drag students to schedule slots</p>
              
              <div className="space-y-3">
                {availableStudents.map(student => (
                  <div
                    key={student.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', JSON.stringify(student));
                    }}
                    className={clsx(
                      "p-3 rounded-lg border-2 border-dashed cursor-move hover:shadow-md transition-shadow",
                      student.color
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                      <span className="font-medium text-slate-900">{student.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-2">Actions</h4>
                <div className="space-y-2">
                  <button className="w-full bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700">
                    Create Group
                  </button>
                  <button className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700">
                    Add Time Slot
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Week Header */}
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">
                    Week of {format(startOfWeek(selectedWeek), 'MMM dd, yyyy')}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setSelectedWeek(addDays(selectedWeek, -7))}
                      className="p-2 hover:bg-slate-200 rounded-lg"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setSelectedWeek(addDays(selectedWeek, 7))}
                      className="p-2 hover:bg-slate-200 rounded-lg"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid Header */}
              <div className="grid grid-cols-6 border-b border-slate-200">
                <div className="p-3 bg-slate-50 font-medium text-slate-600 text-sm">Time</div>
                {days.map(day => (
                  <div key={day} className="p-3 bg-slate-50 font-medium text-slate-600 text-sm border-l border-slate-200">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Body */}
              <div className="max-h-[600px] overflow-y-auto">
                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-6 border-b border-slate-200 min-h-[80px]">
                    {/* Time Column */}
                    <div className="p-3 bg-slate-50 border-r border-slate-200 flex items-center">
                      <span className="font-medium text-slate-900">{time}</span>
                    </div>

                    {/* Day Columns */}
                    {days.map(day => (
                      <div
                        key={`${day}-${time}`}
                        className="p-2 border-l border-slate-200 min-h-[80px]"
                        onDragOver={handleDragOver}
                        onDrop={(e) => {
                          handleDrop(e, day, time);
                          handleNewStudentDrop(e, day, time);
                        }}
                      >
                        <div className="space-y-1">
                          {scheduleData[day][time].map(session => (
                            <div
                              key={session.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, session, day, time)}
                              className={clsx(
                                "p-2 rounded border-2 cursor-move hover:shadow-md transition-shadow relative group",
                                session.color
                              )}
                            >
                              {session.type === 'individual' ? (
                                <div>
                                  <div className="font-medium text-xs">{session.student}</div>
                                  <div className="text-xs text-slate-600">{session.duration}min</div>
                                </div>
                              ) : (
                                <div>
                                  <div className="font-medium text-xs mb-1">{session.name}</div>
                                  <div className="text-xs text-slate-600 mb-1">{session.duration}min</div>
                                  <div className="space-y-1">
                                    {session.students.map((student, idx) => (
                                      <div key={idx} className="text-xs bg-white/50 px-1 rounded flex items-center justify-between">
                                        <span>{student}</span>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeStudentFromGroup(session.id, student);
                                          }}
                                          className="text-red-500 hover:text-red-700 ml-1"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Delete button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSession(session.id, day, time);
                                }}
                                className="absolute top-1 right-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <AlertCircle className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Empty slot indicator */}
                        {scheduleData[day][time].length === 0 && (
                          <div className="h-full flex items-center justify-center">
                            <button
                              onClick={() => createNewGroup(day, time)}
                              className="text-slate-400 hover:text-slate-600 text-xs"
                            >
                              + Add
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <h4 className="font-medium text-slate-900 mb-3">Legend</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
                  <span className="text-sm text-slate-600">Individual Session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-pink-200 border border-pink-400 rounded"></div>
                  <span className="text-sm text-slate-600">Group Session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded border-dashed"></div>
                  <span className="text-sm text-slate-600">Available Slot</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
                  <span className="text-sm text-slate-600">Assessment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
                  <span className="text-sm text-slate-600">Blocked Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );