import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Home, Users, Calendar, GraduationCap, Bell, Search, LogOut, 
  Plus, Filter, ChevronLeft, ChevronRight, Brain, Target, 
  TrendingUp, AlertCircle, Clock, CheckCircle, BookOpen,
  FileText, BarChart3, Settings, User, Star, MessageSquare,
  Zap, Calendar as CalendarIcon, Award, Activity
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import clsx from 'clsx';

// Item types for drag and drop
const ItemTypes = {
  STUDENT: 'student',
  SESSION: 'session'
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

// Draggable Student Component
const DraggableStudent = ({ student }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.STUDENT,
    item: student,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={clsx(
        "p-3 rounded-lg border-2 border-dashed cursor-move hover:shadow-md transition-shadow",
        student.color,
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
    >
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
        <span className="font-medium text-slate-900">{student.name}</span>
      </div>
    </div>
  );
};

// Draggable Session Component
const DraggableSession = ({ session, onDelete, onRemoveStudentFromGroup }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SESSION,
    item: session,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={clsx(
        "p-2 rounded border-2 cursor-move hover:shadow-md transition-shadow relative group",
        session.color,
        isDragging ? 'opacity-50' : 'opacity-100'
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
                    onRemoveStudentFromGroup(session.id, student);
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
          onDelete(session.id);
        }}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <AlertCircle className="h-3 w-3" />
      </button>
    </div>
  );
};

// Drop Zone Component
const DropZone = ({ day, time, sessions, onDrop, onDelete, onRemoveStudentFromGroup, onCreateGroup }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.STUDENT, ItemTypes.SESSION],
    drop: (item, monitor) => {
      const itemType = monitor.getItemType();
      onDrop(item, day, time, itemType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={clsx(
        "p-2 min-h-[80px] border-l border-slate-200",
        isOver ? 'bg-blue-100' : 'bg-white'
      )}
    >
      <div className="space-y-1">
        {sessions.map(session => (
          <DraggableSession
            key={session.id}
            session={session}
            onDelete={() => onDelete(session.id, day, time)}
            onRemoveStudentFromGroup={onRemoveStudentFromGroup}
          />
        ))}
      </div>

      {/* Empty slot indicator */}
      {sessions.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <button
            onClick={() => onCreateGroup(day, time)}
            className="text-slate-400 hover:text-slate-600 text-xs"
          >
            + Add
          </button>
        </div>
      )}
    </div>
  );
};

// Simple Navigation Component for the grid
const SimpleNavigation = ({ currentUser, onLogout }) => {
  return (
    <nav className="bg-slate-900 text-white h-16 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">Achieve - Schedule Grid</h1>
      </div>

      <div className="flex items-center space-x-4">
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
    </nav>
  );
};

// ScheduleGrid Component - Bird's Eye View with Drag & Drop
export const ScheduleGrid = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(new Date());
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

  const handleDrop = (item, targetDay, targetTime, itemType) => {
    if (itemType === ItemTypes.STUDENT) {
      // Create new individual session
      const newSession = {
        id: `new-${Date.now()}`,
        student: item.name,
        type: 'individual',
        color: item.color,
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
    } else if (itemType === ItemTypes.SESSION) {
      // Move existing session
      setScheduleData(prev => {
        const newData = { ...prev };
        
        // Remove from source
        Object.keys(newData).forEach(day => {
          Object.keys(newData[day]).forEach(time => {
            newData[day][time] = newData[day][time].filter(s => s.id !== item.id);
          });
        });
        
        // Add to target
        const updatedItem = { ...item, day: targetDay, time: targetTime };
        newData[targetDay][targetTime] = [...newData[targetDay][targetTime], updatedItem];
        
        return newData;
      });
    }
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
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-50">
        <SimpleNavigation currentUser={currentUser} onLogout={onLogout} />
        
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Schedule Grid</h1>
              <p className="text-slate-600">Drag and drop to manage your weekly schedule</p>
            </div>
            <div className="flex items-center space-x-3">
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
                    <DraggableStudent key={student.id} student={student} />
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
                        <DropZone
                          key={`${day}-${time}`}
                          day={day}
                          time={time}
                          sessions={scheduleData[day][time]}
                          onDrop={handleDrop}
                          onDelete={deleteSession}
                          onRemoveStudentFromGroup={removeStudentFromGroup}
                          onCreateGroup={createNewGroup}
                        />
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
    </DndProvider>
  );
};