import React, { useState } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, Clock, User,
  Users, MapPin, Edit, Trash2, Eye, Filter, Grid, List, CalendarDays, Target
} from 'lucide-react';

// Extended students array with colors
const students = [
  { id: 1, name: "Emma Rodriguez", color: "emerald", age: 8, grade: "2nd" },
  { id: 2, name: "Jake Mitchell", color: "blue", age: 10, grade: "4th" },
  { id: 3, name: "Sophia Chen", color: "amber", age: 6, grade: "K" },
  { id: 4, name: "Marcus Thompson", color: "purple", age: 12, grade: "6th" },
  { id: 5, name: "Lily Wang", color: "pink", age: 9, grade: "3rd" },
  { id: 6, name: "David Kim", color: "indigo", age: 7, grade: "1st" },
  { id: 7, name: "Aiden Brooks", color: "teal", age: 11, grade: "5th" },
  { id: 8, name: "Maya Patel", color: "orange", age: 5, grade: "Pre-K" },
  { id: 9, name: "Ethan Cooper", color: "red", age: 13, grade: "7th" },
  { id: 10, name: "Isabella Martinez", color: "cyan", age: 9, grade: "3rd" },
  { id: 11, name: "Noah Williams", color: "lime", age: 8, grade: "2nd" },
  { id: 12, name: "Zoe Anderson", color: "violet", age: 6, grade: "1st" }
];

// Enhanced mock schedule data with realistic groups and 5-minute precision
const mockSessions = [
  // Monday Sessions
  {
    id: 1,
    student: "Emma Rodriguez",
    studentIds: [1],
    type: "Individual",
    date: "2024-06-17",
    time: "08:35",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Improve /r/ sound production", "Conversational carryover"],
    status: "scheduled"
  },
  {
    id: 2,
    student: "Articulation Group A",
    studentIds: [3, 6, 11, 12],
    students: ["Sophia Chen", "David Kim", "Noah Williams", "Zoe Anderson"],
    type: "Group",
    date: "2024-06-17",
    time: "09:05",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Phonological awareness", "Sound production practice", "Articulation carryover"],
    status: "scheduled"
  },
  {
    id: 3,
    student: "Jake Mitchell",
    studentIds: [2],
    type: "Individual",
    date: "2024-06-17",
    time: "09:40",
    duration: 30,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Fluency techniques", "Confidence building"],
    status: "scheduled"
  },
  {
    id: 4,
    student: "Language Development Group",
    studentIds: [5, 8, 10, 7],
    students: ["Lily Wang", "Maya Patel", "Isabella Martinez", "Aiden Brooks"],
    type: "Group",
    date: "2024-06-17",
    time: "10:15",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Vocabulary development", "Narrative skills", "Academic language"],
    status: "scheduled"
  },
  {
    id: 5,
    student: "Social Communication Group",
    studentIds: [4, 9, 10, 7],
    students: ["Marcus Thompson", "Ethan Cooper", "Isabella Martinez", "Aiden Brooks"],
    type: "Group",
    date: "2024-06-17",
    time: "10:50",
    duration: 30,
    location: "Room 104",
    therapist: "Dr. Sarah Johnson",
    goals: ["Social pragmatics", "Turn-taking", "Peer interaction", "Conversation skills"],
    status: "scheduled"
  },
  {
    id: 6,
    student: "David Kim",
    studentIds: [6],
    type: "Individual",
    date: "2024-06-17",
    time: "11:25",
    duration: 30,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Motor planning", "Sound sequencing"],
    status: "scheduled"
  },
  {
    id: 7,
    student: "Reading Support Group",
    studentIds: [1, 11, 6, 3],
    students: ["Emma Rodriguez", "Noah Williams", "David Kim", "Sophia Chen"],
    type: "Group",
    date: "2024-06-17",
    time: "13:05",
    duration: 30,
    location: "Room 104",
    therapist: "Dr. Sarah Johnson",
    goals: ["Phoneme awareness", "Sound-letter correspondence", "Decoding"],
    status: "scheduled"
  },
  {
    id: 8,
    student: "Early Language Group",
    studentIds: [8, 12, 5],
    students: ["Maya Patel", "Zoe Anderson", "Lily Wang"],
    type: "Group",
    date: "2024-06-17",
    time: "13:40",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Play-based communication", "Two-word combinations", "Following directions"],
    status: "scheduled"
  },
  {
    id: 9,
    student: "Marcus Thompson",
    studentIds: [4],
    type: "Individual",
    date: "2024-06-17",
    time: "14:15",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Social pragmatics individual work"],
    status: "scheduled"
  },

  // Tuesday Sessions
  {
    id: 10,
    student: "Sophia Chen",
    studentIds: [3],
    type: "Individual",
    date: "2024-06-18",
    time: "08:30",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Sound discrimination", "Sentence structure"],
    status: "scheduled"
  },
  {
    id: 11,
    student: "Fluency Support Group",
    studentIds: [2, 9, 4],
    students: ["Jake Mitchell", "Ethan Cooper", "Marcus Thompson"],
    type: "Group",
    date: "2024-06-18",
    time: "09:05",
    duration: 30,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Fluency strategies", "Communication confidence", "Public speaking"],
    status: "scheduled"
  },
  {
    id: 12,
    student: "Executive Function Group",
    studentIds: [7, 9, 4, 1],
    students: ["Aiden Brooks", "Ethan Cooper", "Marcus Thompson", "Emma Rodriguez"],
    type: "Group",
    date: "2024-06-18",
    time: "09:40",
    duration: 30,
    location: "Room 104",
    therapist: "Dr. Sarah Johnson",
    goals: ["Working memory", "Problem solving", "Organization skills"],
    status: "scheduled"
  },
  {
    id: 13,
    student: "Phonological Awareness Group",
    studentIds: [11, 6, 3, 12],
    students: ["Noah Williams", "David Kim", "Sophia Chen", "Zoe Anderson"],
    type: "Group",
    date: "2024-06-18",
    time: "10:15",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Sound blending", "Segmentation", "Rhyming", "Syllable awareness"],
    status: "scheduled"
  },
  {
    id: 14,
    student: "Lily Wang",
    studentIds: [5],
    type: "Individual",
    date: "2024-06-18",
    time: "10:50",
    duration: 30,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Auditory processing", "Vocabulary development"],
    status: "scheduled"
  },
  {
    id: 15,
    student: "Aiden Brooks",
    studentIds: [7],
    type: "Individual",
    date: "2024-06-18",
    time: "11:25",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Working memory", "Narrative organization"],
    status: "scheduled"
  },
  {
    id: 16,
    student: "Communication Confidence Group",
    studentIds: [10, 8, 5, 2],
    students: ["Isabella Martinez", "Maya Patel", "Lily Wang", "Jake Mitchell"],
    type: "Group",
    date: "2024-06-18",
    time: "13:05",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Verbal participation", "Anxiety management", "Peer communication"],
    status: "scheduled"
  },

  // Wednesday Sessions
  {
    id: 17,
    student: "Emma Rodriguez",
    studentIds: [1],
    type: "Individual",
    date: "2024-06-19",
    time: "08:35",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Improve /r/ sound production"],
    status: "scheduled"
  },
  {
    id: 18,
    student: "Articulation Group A",
    studentIds: [3, 6, 11, 12],
    students: ["Sophia Chen", "David Kim", "Noah Williams", "Zoe Anderson"],
    type: "Group",
    date: "2024-06-19",
    time: "09:10",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Sound production practice", "Generalization activities"],
    status: "scheduled"
  },
  {
    id: 19,
    student: "Advanced Language Group",
    studentIds: [7, 1, 2, 4],
    students: ["Aiden Brooks", "Emma Rodriguez", "Jake Mitchell", "Marcus Thompson"],
    type: "Group",
    date: "2024-06-19",
    time: "09:45",
    duration: 30,
    location: "Room 104",
    therapist: "Dr. Sarah Johnson",
    goals: ["Complex sentence structure", "Abstract concepts", "Academic vocabulary"],
    status: "scheduled"
  },
  {
    id: 20,
    student: "Isabella Martinez",
    studentIds: [10],
    type: "Individual",
    date: "2024-06-19",
    time: "10:20",
    duration: 30,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Verbal participation", "Anxiety management"],
    status: "scheduled"
  },
  {
    id: 21,
    student: "Motor Speech Group",
    studentIds: [6, 3, 8, 12],
    students: ["David Kim", "Sophia Chen", "Maya Patel", "Zoe Anderson"],
    type: "Group",
    date: "2024-06-19",
    time: "10:55",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Oral motor skills", "Speech clarity", "Breath support"],
    status: "scheduled"
  },
  {
    id: 22,
    student: "Ethan Cooper",
    studentIds: [9],
    type: "Individual",
    date: "2024-06-19",
    time: "11:30",
    duration: 30,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Memory strategies", "Problem solving"],
    status: "scheduled"
  },

  // Thursday Sessions
  {
    id: 23,
    student: "Comprehensive Language Group",
    studentIds: [5, 8, 10, 11, 1],
    students: ["Lily Wang", "Maya Patel", "Isabella Martinez", "Noah Williams", "Emma Rodriguez"],
    type: "Group",
    date: "2024-06-20",
    time: "08:35",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Listening comprehension", "Expressive language", "Following complex directions"],
    status: "scheduled"
  },
  {
    id: 24,
    student: "Jake Mitchell",
    studentIds: [2],
    type: "Individual",
    date: "2024-06-20",
    time: "09:10",
    duration: 30,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Fluency techniques"],
    status: "scheduled"
  },
  {
    id: 25,
    student: "Social Skills Intensive",
    studentIds: [4, 7, 9, 10, 6],
    students: ["Marcus Thompson", "Aiden Brooks", "Ethan Cooper", "Isabella Martinez", "David Kim"],
    type: "Group",
    date: "2024-06-20",
    time: "09:45",
    duration: 30,
    location: "Room 104",
    therapist: "Dr. Sarah Johnson",
    goals: ["Group dynamics", "Conflict resolution", "Empathy building"],
    status: "scheduled"
  },
  {
    id: 26,
    student: "Maya Patel",
    studentIds: [8],
    type: "Individual",
    date: "2024-06-20",
    time: "10:20",
    duration: 15,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Vocabulary expansion", "Two-word combinations"],
    status: "scheduled"
  },
  {
    id: 27,
    student: "Literacy Support Group",
    studentIds: [1, 11, 3, 6, 12],
    students: ["Emma Rodriguez", "Noah Williams", "Sophia Chen", "David Kim", "Zoe Anderson"],
    type: "Group",
    date: "2024-06-20",
    time: "10:40",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Pre-reading skills", "Letter-sound correspondence", "Phonics"],
    status: "scheduled"
  },

  // Friday Sessions
  {
    id: 28,
    student: "Sophia Chen",
    studentIds: [3],
    type: "Individual",
    date: "2024-06-21",
    time: "08:35",
    duration: 15,
    location: "Room 101",
    therapist: "Dr. Sarah Johnson",
    goals: ["Sound discrimination"],
    status: "scheduled"
  },
  {
    id: 29,
    student: "Peer Interaction Group",
    studentIds: [8, 12, 5, 10, 6],
    students: ["Maya Patel", "Zoe Anderson", "Lily Wang", "Isabella Martinez", "David Kim"],
    type: "Group",
    date: "2024-06-21",
    time: "08:55",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Turn-taking", "Sharing", "Cooperative play", "Social scripts"],
    status: "scheduled"
  },
  {
    id: 30,
    student: "Advanced Articulation",
    studentIds: [1, 2, 11, 7],
    students: ["Emma Rodriguez", "Jake Mitchell", "Noah Williams", "Aiden Brooks"],
    type: "Group",
    date: "2024-06-21",
    time: "09:30",
    duration: 30,
    location: "Room 104",
    therapist: "Dr. Sarah Johnson",
    goals: ["Complex sound combinations", "Connected speech", "Self-monitoring"],
    status: "scheduled"
  },
  {
    id: 31,
    student: "Lily Wang",
    studentIds: [5],
    type: "Individual",
    date: "2024-06-21",
    time: "10:05",
    duration: 15,
    location: "Room 102",
    therapist: "Dr. Sarah Johnson",
    goals: ["Auditory processing"],
    status: "scheduled"
  },
  {
    id: 32,
    student: "Comprehensive Assessment Group",
    studentIds: [3, 4, 9, 11, 12],
    students: ["Sophia Chen", "Marcus Thompson", "Ethan Cooper", "Noah Williams", "Zoe Anderson"],
    type: "Group",
    date: "2024-06-21",
    time: "10:25",
    duration: 30,
    location: "Room 103",
    therapist: "Dr. Sarah Johnson",
    goals: ["Progress evaluation", "Goal setting", "Skill generalization"],
    status: "scheduled"
  }
];

// 5-minute increment time slots
const timeSlots = [];
for (let hour = 8; hour <= 15; hour++) {
  for (let minute = 0; minute < 60; minute += 5) {
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    timeSlots.push(timeString);
  }
}

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
    indigo: 'bg-indigo-500',
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    cyan: 'bg-cyan-500',
    lime: 'bg-lime-500',
    violet: 'bg-violet-500'
  };
  return colors[color] || 'bg-slate-500';
};

const getGroupColor = (sessionType) => {
  if (sessionType === 'Group') return 'bg-gradient-to-r from-purple-400 to-pink-400';
  return 'bg-slate-400';
};

const SessionCard = ({ session, onClick, isCompact = false }) => {
  const isGroup = session.type === 'Group';
  const studentColors = isGroup ? session.studentIds?.map(id => {
    const student = students.find(s => s.id === id);
    return student ? getStudentColor(student.color) : 'bg-slate-500';
  }) : [];
  
  return (
    <div 
      className={`bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer ${
        isCompact ? 'p-2' : 'p-3'
      }`}
      onClick={() => onClick(session)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2 flex-1">
          {isGroup ? (
            <div className="flex -space-x-1">
              {studentColors.slice(0, 3).map((color, index) => (
                <div key={index} className={`w-3 h-3 rounded-full border border-white ${color}`}></div>
              ))}
              {studentColors.length > 3 && (
                <div className="w-3 h-3 rounded-full bg-slate-300 border border-white flex items-center justify-center">
                  <span className="text-xs text-slate-600">+</span>
                </div>
              )}
            </div>
          ) : (
            <div className={`w-3 h-3 rounded-full ${
              session.studentIds?.[0] ? 
                getStudentColor(students.find(s => s.id === session.studentIds[0])?.color) : 
                'bg-slate-500'
            }`}></div>
          )}
          <h4 className={`font-medium text-slate-800 ${isCompact ? 'text-xs' : 'text-sm'} truncate`}>
            {session.student}
          </h4>
        </div>
        {!isCompact && (
          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(session.status)}`}>
            {session.status}
          </span>
        )}
      </div>
      
      <div className={`space-y-1 ${isCompact ? 'text-xs' : 'text-xs'} text-slate-600`}>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{session.time} ({session.duration}min)</span>
        </div>
        {!isCompact && (
          <>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{session.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              {session.type === 'Group' ? <Users className="w-3 h-3" /> : <User className="w-3 h-3" />}
              <span>{session.type}</span>
              {isGroup && session.students && (
                <span className="text-slate-500">({session.students.length})</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Daily View Component
const DailyView = ({ currentDate, sessions, onSessionClick, onAddSession }) => {
  const dateStr = currentDate.toISOString().split('T')[0];
  const daySessions = sessions.filter(session => session.date === dateStr);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </h3>
        <p className="text-sm text-slate-600">{daySessions.length} sessions scheduled</p>
      </div>
      
      <div className="divide-y divide-slate-200">
        {timeSlots.map((time, index) => {
          const sessionAtTime = daySessions.find(session => session.time === time);
          
          return (
            <div key={index} className="flex items-center p-4 hover:bg-slate-50">
              <div className="w-20 text-sm font-medium text-slate-700">{time}</div>
              <div className="flex-1 ml-4">
                {sessionAtTime ? (
                  <SessionCard session={sessionAtTime} onClick={onSessionClick} />
                ) : (
                  <button
                    onClick={() => onAddSession(currentDate, time)}
                    className="w-full h-12 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="text-sm">Add Session</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Weekly View Component
const WeeklyView = ({ currentDate, sessions, onSessionClick, onAddSession }) => {
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-8 border-b border-slate-200">
        <div className="p-3 bg-slate-50 font-medium text-slate-700 text-sm">Time</div>
        {weekDays.map((day, index) => (
          <div key={index} className="p-3 text-center border-l border-slate-200">
            <div className="font-medium text-slate-800 text-sm">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-sm text-slate-600">{day.getDate()}</div>
            <div className="text-xs text-slate-500 mt-1">
              {getSessionsForDay(day).length} sessions
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-8 max-h-96 overflow-y-auto">
        {/* Time column */}
        <div className="bg-slate-50">
          {timeSlots.map((time, index) => (
            <div key={index} className="h-20 p-2 border-b border-slate-200 text-xs text-slate-600 flex items-center">
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
                <div key={timeIndex} className="h-20 p-1 border-b border-slate-200 relative">
                  {sessionAtTime ? (
                    <SessionCard session={sessionAtTime} onClick={onSessionClick} isCompact={true} />
                  ) : (
                    <button
                      onClick={() => onAddSession(day, time)}
                      className="w-full h-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded transition-colors"
                    >
                      <Plus className="w-3 h-3" />
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

// Monthly View Component
const MonthlyView = ({ currentDate, sessions, onSessionClick, onDayClick }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  while (current <= lastDay || current.getDay() !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
    if (days.length > 41) break; // Prevent infinite loop
  }

  const getSessionsForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  const isCurrentMonth = (date) => date.getMonth() === month;
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
      </div>
      
      <div className="grid grid-cols-7 border-b border-slate-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 text-center font-medium text-slate-700 text-sm bg-slate-50">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const daySessions = getSessionsForDay(day);
          const isInCurrentMonth = isCurrentMonth(day);
          const isTodayDate = isToday(day);
          
          return (
            <div
              key={index}
              className={`h-24 p-2 border-b border-r border-slate-200 cursor-pointer hover:bg-slate-50 ${
                !isInCurrentMonth ? 'bg-slate-50 text-slate-400' : ''
              } ${isTodayDate ? 'bg-blue-50 border-blue-200' : ''}`}
              onClick={() => onDayClick(day)}
            >
              <div className={`text-sm font-medium mb-1 ${
                isTodayDate ? 'text-blue-600' : isInCurrentMonth ? 'text-slate-800' : 'text-slate-400'
              }`}>
                {day.getDate()}
              </div>
              <div className="space-y-1">
                {daySessions.slice(0, 2).map((session, idx) => (
                  <div
                    key={idx}
                    className={`text-xs px-2 py-1 rounded truncate ${
                      session.type === 'Group' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSessionClick(session);
                    }}
                  >
                    {session.time} {session.student}
                  </div>
                ))}
                {daySessions.length > 2 && (
                  <div className="text-xs text-slate-500">
                    +{daySessions.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Session Modal Component (Updated)
const SessionModal = ({ session, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState(session || {
    student: '',
    type: 'Individual',
    date: '',
    time: '',
    duration: 30,
    location: 'Room 101',
    goals: [],
    status: 'scheduled',
    studentIds: [],
    students: []
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleStudentChange = (studentId, checked) => {
    if (formData.type === 'Individual') {
      setFormData({
        ...formData,
        studentIds: checked ? [parseInt(studentId)] : [],
        student: checked ? students.find(s => s.id === parseInt(studentId))?.name : ''
      });
    } else {
      const currentIds = formData.studentIds || [];
      const newIds = checked 
        ? [...currentIds, parseInt(studentId)]
        : currentIds.filter(id => id !== parseInt(studentId));
      
      const selectedStudents = students.filter(s => newIds.includes(s.id)).map(s => s.name);
      
      setFormData({
        ...formData,
        studentIds: newIds,
        students: selectedStudents,
        student: newIds.length > 0 ? `Group Session (${newIds.length} students)` : ''
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">
            {session ? 'Edit Session' : 'New Session'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Session Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value, studentIds: [], students: [], student: ''})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              >
                <option value="Individual">Individual</option>
                <option value="Group">Group</option>
                <option value="Assessment">Assessment</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              >
                <option value="Room 101">Room 101</option>
                <option value="Room 102">Room 102</option>
                <option value="Room 103">Room 103</option>
                <option value="Room 104">Room 104</option>
                <option value="Main Therapy Room">Main Therapy Room</option>
                <option value="Quiet Room">Quiet Room</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          {/* Student Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              {formData.type === 'Individual' ? 'Select Student' : 'Select Students'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-3 border border-slate-200 rounded-lg">
              {students.map(student => (
                <label key={student.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type={formData.type === 'Individual' ? 'radio' : 'checkbox'}
                    name="students"
                    value={student.id}
                    checked={formData.studentIds?.includes(student.id) || false}
                    onChange={(e) => handleStudentChange(student.id, e.target.checked)}
                    className="text-slate-600"
                  />
                  <div className={`w-3 h-3 rounded-full ${getStudentColor(student.color)}`}></div>
                  <span className="text-sm text-slate-700">{student.name}</span>
                </label>
              ))}
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

// Main Schedule Component
const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState('weekly'); // daily, weekly, monthly
  const [draggedStudent, setDraggedStudent] = useState(null);
  const [draggedSession, setDraggedSession] = useState(null);
  const [dropZone, setDropZone] = useState(null);

  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
  const weekDays = [];
  for (let i = 1; i < 6; i++) { // Monday to Friday only
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    weekDays.push(day);
  }

  // Get sessions for specific day
  const getSessionsForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  // Get session at specific time slot
  const getSessionAtTimeSlot = (date, time) => {
    const daySessions = getSessionsForDay(date);
    return daySessions.find(session => session.time === time);
  };

  // Check if time slot is occupied by a session
  const isTimeSlotOccupied = (date, time, duration = 15) => {
    const daySessions = getSessionsForDay(date);
    const slotStart = timeSlots.indexOf(time);
    const slotsNeeded = duration / 5;
    
    for (let i = 0; i < slotsNeeded; i++) {
      const checkTime = timeSlots[slotStart + i];
      if (daySessions.some(session => session.time === checkTime)) {
        return true;
      }
    }
    return false;
  };

  // Handle drag start for students
  const handleStudentDragStart = (student) => {
    setDraggedStudent(student);
  };

  // Handle drag start for existing sessions
  const handleSessionDragStart = (session) => {
    setDraggedSession(session);
  };

  // Handle drop
  const handleDrop = (date, time) => {
    const dateStr = date.toISOString().split('T')[0];
    
    if (draggedStudent) {
      // Create new session for student
      const newSession = {
        id: Math.max(...sessions.map(s => s.id)) + 1,
        student: draggedStudent.name,
        studentIds: [draggedStudent.id],
        type: "Individual",
        date: dateStr,
        time: time,
        duration: 30,
        location: "Room 101",
        therapist: "Dr. Sarah Johnson",
        goals: ["Individual therapy session"],
        status: "scheduled"
      };
      onSessionUpdate([...sessions, newSession]);
    } else if (draggedSession) {
      // Move existing session
      const updatedSessions = sessions.map(session => 
        session.id === draggedSession.id 
          ? { ...session, date: dateStr, time: time }
          : session
      );
      onSessionUpdate(updatedSessions);
    }
    
    setDraggedStudent(null);
    setDraggedSession(null);
    setDropZone(null);
  };

  // Handle drag over
  const handleDragOver = (e, date, time) => {
    e.preventDefault();
    setDropZone({ date: date.toISOString().split('T')[0], time });
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setDropZone(null);
  };

  // Get available students (not in group sessions at this time)
  const getAvailableStudents = (date, time) => {
    const session = getSessionAtTimeSlot(date, time);
    if (!session) return students;
    
    const occupiedStudentIds = session.studentIds || [];
    return students.filter(student => !occupiedStudentIds.includes(student.id));
  };

  // Render time slots (every 30 minutes for cleaner view)
  const displayTimeSlots = timeSlots.filter((_, index) => index % 6 === 0 || index % 6 === 6); // Every 30 minutes

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Live Scheduler - Drag & Drop</h3>
        <p className="text-sm text-slate-600">Drag students or sessions to time slots to schedule therapy</p>
      </div>

      <div className="flex">
        {/* Students Sidebar */}
        <div className="w-64 border-r border-slate-200 p-4">
          <h4 className="font-medium text-slate-700 mb-3">Available Students</h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map(student => (
              <div
                key={student.id}
                draggable
                onDragStart={() => handleStudentDragStart(student)}
                className={`flex items-center space-x-2 p-2 rounded-lg border-2 border-dashed border-slate-200 cursor-move hover:border-slate-300 hover:bg-slate-50 transition-colors ${
                  draggedStudent?.id === student.id ? 'border-blue-400 bg-blue-50' : ''
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${getStudentColor(student.color)}`}></div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-slate-700">{student.name}</span>
                  <div className="text-xs text-slate-500">{student.age}y, {student.grade}</div>
                </div>
                <Target className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="grid grid-cols-6 min-w-full">
            {/* Header */}
            <div className="p-3 bg-slate-50 font-medium text-slate-700 text-sm border-b border-slate-200">
              Time
            </div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-3 text-center border-b border-l border-slate-200 bg-slate-50">
                <div className="font-medium text-slate-800 text-sm">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm text-slate-600">{day.getDate()}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {getSessionsForDay(day).length} sessions
                </div>
              </div>
            ))}

            {/* Time slots and schedule */}
            {displayTimeSlots.map((time, timeIndex) => (
              <React.Fragment key={timeIndex}>
                {/* Time label */}
                <div className="p-3 bg-slate-50 text-xs text-slate-600 border-b border-slate-200 flex items-center">
                  {time}
                </div>
                
                {/* Day columns */}
                {weekDays.map((day, dayIndex) => {
                  const session = getSessionAtTimeSlot(day, time);
                  const isDropZoneActive = dropZone?.date === day.toISOString().split('T')[0] && dropZone?.time === time;
                  const canDrop = !isTimeSlotOccupied(day, time, draggedStudent ? 30 : (draggedSession?.duration || 30));
                  
                  return (
                    <div
                      key={dayIndex}
                      className={`relative border-b border-l border-slate-200 min-h-16 p-1 ${
                        isDropZoneActive && canDrop ? 'bg-green-100 border-green-300' : ''
                      } ${
                        isDropZoneActive && !canDrop ? 'bg-red-100 border-red-300' : ''
                      } ${
                        !session && canDrop ? 'hover:bg-slate-50' : ''
                      }`}
                      onDragOver={(e) => canDrop && handleDragOver(e, day, time)}
                      onDragLeave={handleDragLeave}
                      onDrop={() => canDrop && handleDrop(day, time)}
                    >
                      {session ? (
                        <div
                          draggable
                          onDragStart={() => handleSessionDragStart(session)}
                          className="bg-white border border-slate-200 rounded p-2 shadow-sm hover:shadow-md transition-all cursor-move"
                        >
                          <div className="flex items-center space-x-1 mb-1">
                            {session.type === 'Group' ? (
                              <div className="flex -space-x-1">
                                {session.studentIds?.slice(0, 3).map((id, index) => {
                                  const student = students.find(s => s.id === id);
                                  return (
                                    <div 
                                      key={index} 
                                      className={`w-2 h-2 rounded-full border border-white ${
                                        student ? getStudentColor(student.color) : 'bg-slate-400'
                                      }`}
                                    ></div>
                                  );
                                })}
                                {session.studentIds?.length > 3 && (
                                  <div className="w-2 h-2 rounded-full bg-slate-300 border border-white"></div>
                                )}
                              </div>
                            ) : (
                              <div className={`w-2 h-2 rounded-full ${
                                session.studentIds?.[0] ? 
                                  getStudentColor(students.find(s => s.id === session.studentIds[0])?.color) : 
                                  'bg-slate-400'
                              }`}></div>
                            )}
                            {session.type === 'Group' ? <Users className="w-3 h-3 text-purple-600" /> : <User className="w-3 h-3 text-blue-600" />}
                          </div>
                          <div className="text-xs font-medium text-slate-800 truncate">{session.student}</div>
                          <div className="text-xs text-slate-600">{session.duration}min</div>
                        </div>
                      ) : (
                        canDrop && (draggedStudent || draggedSession) && (
                          <div className="h-full flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded">
                            <div className="text-center">
                              <Plus className="w-4 h-4 mx-auto mb-1" />
                              <div className="text-xs">Drop Here</div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-slate-600">Available Drop Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-slate-600">Conflict - Cannot Drop</span>
            </div>
          </div>
          <div className="text-slate-500">
            💡 Tip: Drag students from the left panel or existing sessions to reschedule
          </div>
        </div>
      </div>
    </div>
  );
};
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState('weekly'); // daily, weekly, monthly

  const handlePrevPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'daily') {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (view === 'weekly') {
      newDate.setDate(currentDate.getDate() - 7);
    } else if (view === 'monthly') {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'daily') {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (view === 'weekly') {
      newDate.setDate(currentDate.getDate() + 7);
    } else if (view === 'monthly') {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
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
      status: 'scheduled',
      studentIds: [],
      students: []
    });
    setIsModalOpen(true);
  };

  const handleDayClick = (date) => {
    setCurrentDate(date);
    setView('daily');
  };

  const handleSaveSession = (sessionData) => {
    if (selectedSession?.id) {
      // Update existing session
      setSessions(sessions.map(s => 
        s.id === selectedSession.id 
          ? {...sessionData, id: selectedSession.id, therapist: "Dr. Sarah Johnson"} 
          : s
      ));
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

  const getCurrentPeriodDisplay = () => {
    if (view === 'daily') {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } else if (view === 'weekly') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const getSessionCount = () => {
    if (view === 'daily') {
      const dateStr = currentDate.toISOString().split('T')[0];
      return sessions.filter(s => s.date === dateStr).length;
    } else if (view === 'weekly') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return sessions.filter(s => {
        const sessionDate = new Date(s.date);
        return sessionDate >= weekStart && sessionDate <= weekEnd;
      }).length;
    } else {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      return sessions.filter(s => {
        const sessionDate = new Date(s.date);
        return sessionDate.getMonth() === month && sessionDate.getFullYear() === year;
      }).length;
    }
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
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevPeriod}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-slate-800">{getCurrentPeriodDisplay()}</h2>
              <p className="text-sm text-slate-600">{getSessionCount()} sessions</p>
            </div>
            <button
              onClick={handleNextPeriod}
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
            
            {/* View Toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setView('daily')}
                className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                  view === 'daily' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <List className="w-4 h-4" />
                <span>Day</span>
              </button>
              <button
                onClick={() => setView('weekly')}
                className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                  view === 'weekly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Week</span>
              </button>
              <button
                onClick={() => setView('monthly')}
                className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                  view === 'monthly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Month</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Views */}
      {view === 'daily' && (
        <DailyView 
          currentDate={currentDate}
          sessions={sessions}
          onSessionClick={handleSessionClick}
          onAddSession={handleAddSession}
        />
      )}

      {view === 'weekly' && (
        <WeeklyView 
          currentDate={currentDate}
          sessions={sessions}
          onSessionClick={handleSessionClick}
          onAddSession={handleAddSession}
        />
      )}

      {view === 'monthly' && (
        <MonthlyView 
          currentDate={currentDate}
          sessions={sessions}
          onSessionClick={handleSessionClick}
          onDayClick={handleDayClick}
        />
      )}

      {/* Legend */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-medium text-slate-800 mb-4">Students & Groups</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {students.map(student => (
            <div key={student.id} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getStudentColor(student.color)}`}></div>
              <span className="text-sm text-slate-700">{student.name}</span>
              <span className="text-xs text-slate-500">({student.age}y, {student.grade})</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200">
          <h4 className="font-medium text-slate-700 mb-2">Session Types</h4>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-slate-700">Individual Sessions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-slate-700">Group Sessions</span>
            </div>
          </div>
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