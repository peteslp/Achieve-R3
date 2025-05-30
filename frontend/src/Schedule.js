import React, { useState } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, Clock, User,
  Users, MapPin, Edit, Trash2, Eye, Filter
} from 'lucide-react';

// Mock schedule data
const mockSessions = [
  {
    id: 1,
    student: "Emma Rodriguez",
    studentId: 1,
    type: "Individual",
    date: "2024-06-17",
    time: "09:00",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Improve /r/ sound production", "Conversational carryover"],
    status: "scheduled"
  },
  {
    id: 2,
    student: "Jake Mitchell",
    studentId: 2,
    type: "Individual",
    date: "2024-06-17",
    time: "10:00",
    duration: 45,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Fluency techniques", "Confidence building"],
    status: "scheduled"
  },
  {
    id: 3,
    student: "Group Session A",
    studentId: null,
    students: ["Sophia Chen", "David Kim"],
    type: "Group",
    date: "2024-06-17",
    time: "11:00",
    duration: 60,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Social communication", "Turn-taking"],
    status: "scheduled"
  },
  {
    id: 4,
    student: "Lily Wang",
    studentId: 5,
    type: "Individual",
    date: "2024-06-17",
    time: "13:00",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Auditory processing", "Vocabulary development"],
    status: "completed"
  },
  {
    id: 5,
    student: "Marcus Thompson",
    studentId: 4,
    type: "Individual",
    date: "2024-06-18",
    time: "09:30",
    duration: 45,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Social pragmatics", "Peer interaction"],
    status: "scheduled"
  },
  {
    id: 6,
    student: "Emma Rodriguez",
    studentId: 1,
    type: "Individual",
    date: "2024-06-19",
    time: "10:00",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Improve /r/ sound production"],
    status: "scheduled"
  }
];

const students = [
  { id: 1, name: "Emma Rodriguez", color: "emerald" },
  { id: 2, name: "Jake Mitchell", color: "blue" },
  { id: 3, name: "Sophia Chen", color: "amber" },
  { id: 4, name: "Marcus Thompson", color: "purple" },
  { id: 5, name: "Lily Wang", color: "pink" },
  { id: 6, name: "David Kim", color: "indigo" }
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"
];

const getStatusColor = (status) => {
  switch(status) {
    case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

const getStudentColor = (color) => {
  const colors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500'
  };
  return colors[color] || 'bg-slate-500';
};

const SessionCard = ({ session, onClick }) => {
  const student = students.find(s => s.id === session.studentId);
  const colorClass = student ? getStudentColor(student.color) : 'bg-slate-500';
  
  return (
    <div 
      className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={() => onClick(session)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
          <h4 className="font-medium text-slate-800 text-sm">{session.student}</h4>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(session.status)}`}>
          {session.status}
        </span>
      </div>
      <div className="space-y-1 text-xs text-slate-600">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{session.time} ({session.duration}min)</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-3 h-3" />
          <span>{session.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          {session.type === 'Group' ? <Users className="w-3 h-3" /> : <User className="w-3 h-3" />}
          <span>{session.type}</span>
        </div>
      </div>
    </div>
  );
};

const WeekView = ({ currentDate, sessions, onSessionClick, onAddSession }) => {
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    weekDays.push(day);
  }

  const getSessionsForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="grid grid-cols-8 border-b border-slate-200">
        <div className="p-4 bg-slate-50 font-medium text-slate-700 text-sm">Time</div>
        {weekDays.map((day, index) => (
          <div key={index} className="p-4 text-center border-l border-slate-200">
            <div className="font-medium text-slate-800">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div className="text-sm text-slate-600">{day.getDate()}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-8">
        {/* Time column */}
        <div className="bg-slate-50">
          {timeSlots.map((time, index) => (
            <div key={index} className="h-16 p-2 border-b border-slate-200 text-xs text-slate-600 flex items-center">
              {time}
            </div>
          ))}
        </div>
        
        {/* Day columns */}
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="border-l border-slate-200">
            {timeSlots.map((time, timeIndex) => {
              const daySessions = getSessionsForDay(day);
              const sessionAtTime = daySessions.find(session => session.time === time);
              
              return (
                <div key={timeIndex} className="h-16 p-1 border-b border-slate-200 relative">
                  {sessionAtTime ? (
                    <SessionCard session={sessionAtTime} onClick={onSessionClick} />
                  ) : (
                    <button
                      onClick={() => onAddSession(day, time)}
                      className="w-full h-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const SessionModal = ({ session, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState(session || {
    student: '',
    type: 'Individual',
    date: '',
    time: '',
    duration: 30,
    location: 'Room 101',
    goals: [],
    status: 'scheduled'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">
            {session ? 'Edit Session' : 'New Session'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Student</label>
              <select
                value={formData.student}
                onChange={(e) => setFormData({...formData, student: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.id} value={student.name}>{student.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Session Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              >
                <option value="Individual">Individual</option>
                <option value="Group">Group</option>
                <option value="Assessment">Assessment</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                required
              >
                <option value="">Select Time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration (minutes)</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              >
                <option value="Room 101">Room 101</option>
                <option value="Room 102">Room 102</option>
                <option value="Room 103">Room 103</option>
                <option value="Main Therapy Room">Main Therapy Room</option>
                <option value="Quiet Room">Quiet Room</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <div className="space-x-2">
              {session && (
                <button
                  type="button"
                  onClick={() => onDelete(session)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                {session ? 'Update' : 'Create'} Session
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState('week'); // week, day, month

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleAddSession = (date, time) => {
    setSelectedSession({
      date: date.toISOString().split('T')[0],
      time: time,
      student: '',
      type: 'Individual',
      duration: 30,
      location: 'Room 101',
      status: 'scheduled'
    });
    setIsModalOpen(true);
  };

  const handleSaveSession = (sessionData) => {
    if (selectedSession?.id) {
      // Update existing session
      setSessions(sessions.map(s => s.id === selectedSession.id ? {...sessionData, id: selectedSession.id} : s));
    } else {
      // Create new session
      const newSession = {
        ...sessionData,
        id: Math.max(...sessions.map(s => s.id)) + 1,
        therapist: "Dr. Sarah Johnson"
      };
      setSessions([...sessions, newSession]);
    }
  };

  const handleDeleteSession = (session) => {
    setSessions(sessions.filter(s => s.id !== session.id));
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const getCurrentWeekRange = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Schedule</h1>
            <p className="text-slate-600">Manage therapy sessions and appointments</p>
          </div>
          <button
            onClick={() => handleAddSession(new Date(), '09:00')}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Session</span>
          </button>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevWeek}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="text-lg font-semibold text-slate-800">{getCurrentWeekRange()}</h2>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Schedule View */}
      <WeekView 
        currentDate={currentDate}
        sessions={sessions}
        onSessionClick={handleSessionClick}
        onAddSession={handleAddSession}
      />

      {/* Legend */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-medium text-slate-800 mb-3">Students</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {students.map(student => (
            <div key={student.id} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getStudentColor(student.color)}`}></div>
              <span className="text-sm text-slate-700">{student.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Session Modal */}
      <SessionModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSession(null);
        }}
        onSave={handleSaveSession}
        onDelete={handleDeleteSession}
      />
    </div>
  );
};

export default Schedule;