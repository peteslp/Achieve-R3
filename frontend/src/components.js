import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Login Component
export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials with the backend
    // For this demo, we'll just navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-teal-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Achieve</h1>
          <p className="text-gray-600">Therapy Progress Tracking</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
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
  
  // Sample data for the dashboard
  const students = [
    {
      id: 1,
      name: "Emma Rodriguez",
      age: 8,
      diagnosis: "Speech Delay, ADHD",
      nextSession: "Monday, 10:00 AM",
      progress: { score: 78, trend: "improving" }
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 10,
      diagnosis: "Autism Spectrum Disorder",
      nextSession: "Tuesday, 2:00 PM",
      progress: { score: 62, trend: "stable" }
    },
    {
      id: 3,
      name: "Aisha Patel",
      age: 7,
      diagnosis: "Developmental Coordination Disorder",
      nextSession: "Wednesday, 11:00 AM",
      progress: { score: 85, trend: "improving" }
    },
    {
      id: 4,
      name: "Dylan Chen",
      age: 9,
      diagnosis: "Selective Mutism",
      nextSession: "Thursday, 3:00 PM",
      progress: { score: 45, trend: "needs attention" }
    },
    {
      id: 5,
      name: "Sofia Martinez",
      age: 6,
      diagnosis: "Phonological Disorder",
      nextSession: "Friday, 9:00 AM",
      progress: { score: 70, trend: "improving" }
    }
  ];
  
  const recentNotes = [
    {
      id: 1,
      studentName: "Emma Rodriguez",
      date: "2023-05-15",
      note: "Emma showed significant improvement in articulation exercises. She was able to correctly pronounce 'r' sounds in 8 out of 10 attempts."
    },
    {
      id: 2,
      studentName: "Marcus Johnson",
      date: "2023-05-14",
      note: "Marcus participated well in the social skills group today. He initiated conversation with peers twice without prompting."
    },
    {
      id: 3,
      studentName: "Dylan Chen",
      date: "2023-05-12",
      note: "Dylan spoke in full sentences during our one-on-one session, but still struggles in group settings. Will continue with gradual exposure therapy."
    }
  ];
  
  const upcomingSessions = [
    {
      id: 1,
      studentName: "Emma Rodriguez",
      date: "2023-05-22",
      time: "10:00 AM",
      type: "Individual"
    },
    {
      id: 2,
      studentName: "Marcus Johnson",
      date: "2023-05-22",
      time: "2:00 PM",
      type: "Individual"
    },
    {
      id: 3,
      studentName: "Aisha Patel",
      date: "2023-05-23",
      time: "11:00 AM",
      type: "Individual"
    },
    {
      id: 4,
      studentName: "Multiple Students",
      date: "2023-05-23",
      time: "1:00 PM",
      type: "Group - Social Skills"
    },
    {
      id: 5,
      studentName: "Dylan Chen",
      date: "2023-05-24",
      time: "3:00 PM",
      type: "Individual"
    }
  ];
  
  // Progress data for charts
  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Average Student Progress',
        data: [65, 68, 70, 72, 75],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Achieve</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Welcome, {currentUser || 'Therapist'}</span>
            <button
              onClick={onLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button 
              className="text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-500"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/students')}
            >
              Students
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/schedule')}
            >
              Schedule
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/reports')}
            >
              Reports
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/resources')}
            >
              Resources
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Overview */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stats Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">24</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Sessions This Week</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">18</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg. Progress Score</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">72%</dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Goals Achieved</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">12</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Students Needing Attention */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Students Needing Attention</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {students.filter(s => s.progress.trend === "needs attention").map(student => (
                  <li key={student.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">{student.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.diagnosis}</div>
                        </div>
                      </div>
                      <div>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {student.progress.score}% - {student.progress.trend}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Sessions</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {upcomingSessions.slice(0, 4).map(session => (
                  <li key={session.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{session.studentName}</div>
                        <div className="text-sm text-gray-500">
                          {session.date} at {session.time} - {session.type}
                        </div>
                      </div>
                      <div>
                        <button className="text-sm text-blue-500 hover:text-blue-700">View</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
                <button 
                  className="text-sm text-blue-500 hover:text-blue-700"
                  onClick={() => navigate('/schedule')}
                >
                  View All Sessions →
                </button>
              </div>
            </div>

            {/* Recent Notes */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Session Notes</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {recentNotes.map(note => (
                  <li key={note.id} className="px-4 py-4 sm:px-6">
                    <div>
                      <div className="flex justify-between">
                        <div className="text-sm font-medium text-gray-900">{note.studentName}</div>
                        <div className="text-sm text-gray-500">{note.date}</div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {note.note}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
                <button className="text-sm text-blue-500 hover:text-blue-700">View All Notes →</button>
              </div>
            </div>

            {/* Student Progress */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Student Progress</h3>
              </div>
              <div className="p-4">
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Progress Chart Placeholder</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {students.slice(0, 4).map(student => (
                    <div key={student.id} className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ 
                        backgroundColor: student.progress.trend === 'improving' 
                          ? '#10B981' 
                          : student.progress.trend === 'stable' 
                            ? '#F59E0B' 
                            : '#EF4444'
                      }}></div>
                      <span className="text-xs text-gray-600">{student.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Students Component
export const Students = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  
  // Sample data for students
  const students = [
    {
      id: 1,
      name: "Emma Rodriguez",
      age: 8,
      diagnosis: "Speech Delay, ADHD",
      therapist: "Dr. Sarah Johnson",
      startDate: "2023-01-15",
      goals: ["Improve articulation of 'r' sounds", "Develop focus during activities", "Enhance social communication"],
      recentProgress: { score: 78, trend: "improving" }
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 10,
      diagnosis: "Autism Spectrum Disorder",
      therapist: "Dr. Michael Chen",
      startDate: "2022-09-05",
      goals: ["Develop conversation skills", "Reduce repetitive behaviors", "Improve eye contact"],
      recentProgress: { score: 62, trend: "stable" }
    },
    {
      id: 3,
      name: "Aisha Patel",
      age: 7,
      diagnosis: "Developmental Coordination Disorder",
      therapist: "Dr. Sarah Johnson",
      startDate: "2023-02-20",
      goals: ["Improve fine motor skills", "Enhance handwriting ability", "Develop better balance"],
      recentProgress: { score: 85, trend: "improving" }
    },
    {
      id: 4,
      name: "Dylan Chen",
      age: 9,
      diagnosis: "Selective Mutism",
      therapist: "Dr. Lisa Rodriguez",
      startDate: "2022-11-10",
      goals: ["Increase verbal communication in classroom", "Reduce anxiety in social settings", "Develop self-advocacy skills"],
      recentProgress: { score: 45, trend: "needs attention" }
    },
    {
      id: 5,
      name: "Sofia Martinez",
      age: 6,
      diagnosis: "Phonological Disorder",
      therapist: "Dr. Michael Chen",
      startDate: "2023-03-15",
      goals: ["Improve sound discrimination", "Enhance phonological awareness", "Develop clear speech patterns"],
      recentProgress: { score: 70, trend: "improving" }
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Achieve</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Welcome, {currentUser || 'Therapist'}</span>
            <button
              onClick={onLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button 
              className="text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-500"
              onClick={() => navigate('/students')}
            >
              Students
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/schedule')}
            >
              Schedule
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/reports')}
            >
              Reports
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/resources')}
            >
              Resources
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Students List */}
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Students</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add New Student
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4">
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Diagnoses</option>
                  <option value="speech">Speech Delay</option>
                  <option value="autism">Autism Spectrum Disorder</option>
                  <option value="dcd">Developmental Coordination Disorder</option>
                  <option value="selective-mutism">Selective Mutism</option>
                  <option value="phonological">Phonological Disorder</option>
                </select>
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Therapists</option>
                  <option value="johnson">Dr. Sarah Johnson</option>
                  <option value="chen">Dr. Michael Chen</option>
                  <option value="rodriguez">Dr. Lisa Rodriguez</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Students Table */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Therapist
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map(student => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">{student.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">Age: {student.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.diagnosis}</div>
                      <div className="text-sm text-gray-500">Since {student.startDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.therapist}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.recentProgress.trend === 'improving' 
                          ? 'bg-green-100 text-green-800' 
                          : student.recentProgress.trend === 'stable' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {student.recentProgress.score}% - {student.recentProgress.trend}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// Schedule Component
export const Schedule = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('calendar');
  
  // Sample data for schedule
  const events = [
    {
      id: 1,
      title: "Emma Rodriguez - Speech Therapy",
      start: "2023-05-22T10:00:00",
      end: "2023-05-22T11:00:00",
      student: "Emma Rodriguez",
      type: "Individual",
      color: "#3B82F6"
    },
    {
      id: 2,
      title: "Marcus Johnson - ASD Therapy",
      start: "2023-05-22T14:00:00",
      end: "2023-05-22T15:00:00",
      student: "Marcus Johnson",
      type: "Individual",
      color: "#10B981"
    },
    {
      id: 3,
      title: "Aisha Patel - Coordination Therapy",
      start: "2023-05-23T11:00:00",
      end: "2023-05-23T12:00:00",
      student: "Aisha Patel",
      type: "Individual",
      color: "#F59E0B"
    },
    {
      id: 4,
      title: "Social Skills Group",
      start: "2023-05-23T13:00:00",
      end: "2023-05-23T14:00:00",
      student: "Multiple Students",
      type: "Group",
      color: "#8B5CF6"
    },
    {
      id: 5,
      title: "Dylan Chen - Selective Mutism",
      start: "2023-05-24T15:00:00",
      end: "2023-05-24T16:00:00",
      student: "Dylan Chen",
      type: "Individual",
      color: "#EC4899"
    },
    {
      id: 6,
      title: "Sofia Martinez - Phonological Therapy",
      start: "2023-05-25T09:00:00",
      end: "2023-05-25T10:00:00",
      student: "Sofia Martinez",
      type: "Individual",
      color: "#6366F1"
    },
    {
      id: 7,
      title: "Team Meeting",
      start: "2023-05-26T08:00:00",
      end: "2023-05-26T09:00:00",
      student: "Staff Only",
      type: "Meeting",
      color: "#EF4444"
    },
    {
      id: 8,
      title: "Articulation Group",
      start: "2023-05-26T13:00:00",
      end: "2023-05-26T14:00:00",
      student: "Multiple Students",
      type: "Group",
      color: "#8B5CF6"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Achieve</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Welcome, {currentUser || 'Therapist'}</span>
            <button
              onClick={onLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/students')}
            >
              Students
            </button>
            <button 
              className="text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-500"
              onClick={() => navigate('/schedule')}
            >
              Schedule
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/reports')}
            >
              Reports
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/resources')}
            >
              Resources
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Schedule</h2>
            <div className="flex space-x-4">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    viewMode === 'calendar' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Calendar View
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Grid View
                </button>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Session
              </button>
            </div>
          </div>
          
          {viewMode === 'calendar' ? (
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">May 2023</h3>
                <div className="flex space-x-2">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Calendar Placeholder */}
              <div className="border rounded-lg overflow-hidden">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {/* Week 1 */}
                  <div className="bg-white p-2 h-32">
                    <div className="text-gray-400 text-sm">30</div>
                  </div>
                  {[1, 2, 3, 4, 5, 6].map(day => (
                    <div key={day} className="bg-white p-2 h-32">
                      <div className="text-sm">{day}</div>
                    </div>
                  ))}
                  
                  {/* Week 2 */}
                  {[7, 8, 9, 10, 11, 12, 13].map(day => (
                    <div key={day} className="bg-white p-2 h-32">
                      <div className="text-sm">{day}</div>
                    </div>
                  ))}
                  
                  {/* Week 3 */}
                  {[14, 15, 16, 17, 18, 19, 20].map(day => (
                    <div key={day} className="bg-white p-2 h-32">
                      <div className="text-sm">{day}</div>
                      {day === 15 && (
                        <div className="mt-1 p-1 text-xs bg-blue-100 text-blue-800 rounded">
                          Emma - 10:00 AM
                        </div>
                      )}
                      {day === 17 && (
                        <div className="mt-1 p-1 text-xs bg-purple-100 text-purple-800 rounded">
                          Group - 1:00 PM
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Week 4 */}
                  {[21, 22, 23, 24, 25, 26, 27].map(day => (
                    <div key={day} className={`bg-white p-2 h-32 ${day === 22 ? 'ring-2 ring-blue-500' : ''}`}>
                      <div className={`text-sm ${day === 22 ? 'font-semibold text-blue-600' : ''}`}>{day}</div>
                      {day === 22 && (
                        <>
                          <div className="mt-1 p-1 text-xs bg-blue-100 text-blue-800 rounded">
                            Emma - 10:00 AM
                          </div>
                          <div className="mt-1 p-1 text-xs bg-green-100 text-green-800 rounded">
                            Marcus - 2:00 PM
                          </div>
                        </>
                      )}
                      {day === 23 && (
                        <>
                          <div className="mt-1 p-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                            Aisha - 11:00 AM
                          </div>
                          <div className="mt-1 p-1 text-xs bg-purple-100 text-purple-800 rounded">
                            Group - 1:00 PM
                          </div>
                        </>
                      )}
                      {day === 24 && (
                        <div className="mt-1 p-1 text-xs bg-pink-100 text-pink-800 rounded">
                          Dylan - 3:00 PM
                        </div>
                      )}
                      {day === 25 && (
                        <div className="mt-1 p-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                          Sofia - 9:00 AM
                        </div>
                      )}
                      {day === 26 && (
                        <>
                          <div className="mt-1 p-1 text-xs bg-red-100 text-red-800 rounded">
                            Meeting - 8:00 AM
                          </div>
                          <div className="mt-1 p-1 text-xs bg-purple-100 text-purple-800 rounded">
                            Group - 1:00 PM
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {/* Week 5 */}
                  {[28, 29, 30, 31, 1, 2, 3].map(day => (
                    <div key={day} className="bg-white p-2 h-32">
                      <div className={`text-sm ${day > 31 ? 'text-gray-400' : ''}`}>{day}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
                  <span className="text-sm text-slate-600">Individual Session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-200 border border-purple-400 rounded"></div>
                  <span className="text-sm text-slate-600">Group Session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
                  <span className="text-sm text-slate-600">Meeting</span>
                </div>
              </div>
            </div>
          ) : (
            <ScheduleGrid currentUser={currentUser} onLogout={onLogout} />
          )}
        </div>
      </main>
    </div>
  );
};

// Reports Component
export const Reports = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Achieve</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Welcome, {currentUser || 'Therapist'}</span>
            <button
              onClick={onLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/students')}
            >
              Students
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/schedule')}
            >
              Schedule
            </button>
            <button 
              className="text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-500"
              onClick={() => navigate('/reports')}
            >
              Reports
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/resources')}
            >
              Resources
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
            <div className="flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Generate New Report
              </button>
              <button className="bg-white hover:bg-gray-50 text-blue-500 font-bold py-2 px-4 rounded border border-blue-500">
                Export Data
              </button>
            </div>
          </div>
          
          {/* Report Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="progress">Student Progress</option>
                  <option value="attendance">Attendance</option>
                  <option value="goals">Goals Achievement</option>
                  <option value="billing">Billing Summary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="last30">Last 30 Days</option>
                  <option value="last90">Last 90 Days</option>
                  <option value="year">Year to Date</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Students</option>
                  <option value="1">Emma Rodriguez</option>
                  <option value="2">Marcus Johnson</option>
                  <option value="3">Aisha Patel</option>
                  <option value="4">Dylan Chen</option>
                  <option value="5">Sofia Martinez</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Reports Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Progress Overview</h3>
              </div>
              <div className="p-4">
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Progress Chart Placeholder</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Overall student progress increased by 12% this quarter</li>
                    <li>Emma and Aisha showed the most improvement</li>
                    <li>Dylan requires additional attention in social settings</li>
                    <li>Group therapy sessions show 15% better outcomes than individual sessions for social skills</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Goals Achievement */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Goals Achievement</h3>
              </div>
              <div className="p-4">
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Goals Chart Placeholder</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Completed Goals:</h4>
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-500">+3 from last month</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">In Progress:</h4>
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-500">68% average completion</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Session Attendance */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Session Attendance</h3>
              </div>
              <div className="p-4">
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Attendance Chart Placeholder</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attended:</h4>
                    <div className="text-2xl font-bold text-green-600">92%</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Rescheduled:</h4>
                    <div className="text-2xl font-bold text-yellow-600">6%</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Missed:</h4>
                    <div className="text-2xl font-bold text-red-600">2%</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Therapy Hours */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Therapy Hours</h3>
              </div>
              <div className="p-4">
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Hours Chart Placeholder</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Total Hours:</h4>
                    <div className="text-2xl font-bold text-blue-600">128</div>
                    <div className="text-sm text-gray-500">Last 30 days</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">By Type:</h4>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Individual:</span>
                        <span className="font-medium">86 hrs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Group:</span>
                        <span className="font-medium">32 hrs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assessment:</span>
                        <span className="font-medium">10 hrs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Reports */}
          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reports</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                { id: 1, name: "Q1 Progress Summary", date: "2023-04-01", type: "Quarterly" },
                { id: 2, name: "Emma Rodriguez - 6 Month Review", date: "2023-03-15", type: "Student" },
                { id: 3, name: "Group Therapy Outcomes", date: "2023-02-28", type: "Analysis" },
                { id: 4, name: "March Billing Summary", date: "2023-03-31", type: "Billing" },
                { id: 5, name: "New Students Assessment", date: "2023-03-10", type: "Assessment" }
              ].map(report => (
                <li key={report.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-500">
                        Generated on {report.date} • {report.type} Report
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-blue-600 hover:text-blue-900">Download</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

// Resources Component
export const Resources = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  
  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Speech Sound Development Chart",
      type: "PDF",
      category: "Assessment",
      description: "A comprehensive chart showing typical speech sound development by age.",
      dateAdded: "2023-03-15"
    },
    {
      id: 2,
      title: "Social Skills Activity Cards",
      type: "Printable",
      category: "Activities",
      description: "50 printable cards with social skills activities for group sessions.",
      dateAdded: "2023-02-10"
    },
    {
      id: 3,
      title: "Sensory Integration Techniques",
      type: "Video",
      category: "Training",
      description: "Training video demonstrating sensory integration techniques for children with ASD.",
      dateAdded: "2023-04-05"
    },
    {
      id: 4,
      title: "Parent Communication Templates",
      type: "Document",
      category: "Communication",
      description: "Templates for communicating progress, goals, and home practice to parents.",
      dateAdded: "2023-01-20"
    },
    {
      id: 5,
      title: "Fine Motor Skills Assessment",
      type: "Form",
      category: "Assessment",
      description: "Standardized assessment form for evaluating fine motor skills in children ages 4-10.",
      dateAdded: "2023-03-28"
    },
    {
      id: 6,
      title: "Articulation Exercises - R Sounds",
      type: "Audio",
      category: "Therapy",
      description: "Audio exercises for practicing 'r' sounds in different word positions.",
      dateAdded: "2023-02-15"
    },
    {
      id: 7,
      title: "Visual Schedule Maker",
      type: "Tool",
      category: "Planning",
      description: "Online tool for creating customized visual schedules for students.",
      dateAdded: "2023-04-12"
    },
    {
      id: 8,
      title: "Progress Monitoring Sheets",
      type: "Spreadsheet",
      category: "Documentation",
      description: "Spreadsheet templates for tracking student progress on specific goals.",
      dateAdded: "2023-01-05"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Achieve</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Welcome, {currentUser || 'Therapist'}</span>
            <button
              onClick={onLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/students')}
            >
              Students
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/schedule')}
            >
              Schedule
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              onClick={() => navigate('/reports')}
            >
              Reports
            </button>
            <button 
              className="text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-500"
              onClick={() => navigate('/resources')}
            >
              Resources
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Resources</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Upload New Resource
            </button>
          </div>
          
          {/* Resource Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Types</option>
                  <option value="pdf">PDF</option>
                  <option value="printable">Printable</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="document">Document</option>
                  <option value="form">Form</option>
                  <option value="tool">Tool</option>
                  <option value="spreadsheet">Spreadsheet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Categories</option>
                  <option value="assessment">Assessment</option>
                  <option value="activities">Activities</option>
                  <option value="training">Training</option>
                  <option value="communication">Communication</option>
                  <option value="therapy">Therapy</option>
                  <option value="planning">Planning</option>
                  <option value="documentation">Documentation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
              <div key={resource.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      resource.type === 'PDF' ? 'bg-red-100 text-red-800' :
                      resource.type === 'Video' ? 'bg-blue-100 text-blue-800' :
                      resource.type === 'Audio' ? 'bg-purple-100 text-purple-800' :
                      resource.type === 'Printable' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {resource.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Added: {resource.dateAdded}</span>
                  <div className="flex space-x-2">
                    <button className="text-sm text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-sm text-blue-600 hover:text-blue-900">Download</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resource Categories */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Resource Categories</h3>
            </div>
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Assessment", count: 12, icon: "📋" },
                { name: "Activities", count: 24, icon: "🎮" },
                { name: "Training", count: 8, icon: "🎓" },
                { name: "Communication", count: 15, icon: "💬" },
                { name: "Therapy", count: 30, icon: "🧠" },
                { name: "Planning", count: 10, icon: "📅" },
                { name: "Documentation", count: 18, icon: "📄" },
                { name: "Research", count: 6, icon: "🔍" }
              ].map(category => (
                <div key={category.name} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} resources</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Schedule Grid Component
export const ScheduleGrid = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  // Sample data for the schedule grid
  const students = [
    { id: 1, name: "Emma Rodriguez", color: "#3B82F6" },
    { id: 2, name: "Marcus Johnson", color: "#10B981" },
    { id: 3, name: "Aisha Patel", color: "#F59E0B" },
    { id: 4, name: "Dylan Chen", color: "#EC4899" },
    { id: 5, name: "Sofia Martinez", color: "#6366F1" }
  ];
  
  const timeSlots = [
    "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"
  ];
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const [schedule, setSchedule] = useState({
    Monday: {
      "9:00 AM": { type: "individual", student: "Emma Rodriguez", color: "#3B82F6" },
      "11:00 AM": { type: "individual", student: "Marcus Johnson", color: "#10B981" },
      "1:00 PM": { 
        type: "group", 
        name: "Social Communication Group", 
        students: ["Aisha Patel", "Dylan Chen", "Sofia Martinez"],
        colors: ["#F59E0B", "#EC4899", "#6366F1"]
      }
    },
    Tuesday: {
      "10:00 AM": { type: "individual", student: "Aisha Patel", color: "#F59E0B" },
      "2:00 PM": { type: "individual", student: "Dylan Chen", color: "#EC4899" }
    },
    Wednesday: {
      "9:00 AM": { type: "individual", student: "Sofia Martinez", color: "#6366F1" },
      "11:00 AM": { type: "individual", student: "Emma Rodriguez", color: "#3B82F6" },
      "1:00 PM": { 
        type: "group", 
        name: "Articulation Practice", 
        students: ["Marcus Johnson", "Sofia Martinez"],
        colors: ["#10B981", "#6366F1"]
      }
    },
    Thursday: {
      "10:00 AM": { type: "individual", student: "Marcus Johnson", color: "#10B981" },
      "1:00 PM": { type: "individual", student: "Aisha Patel", color: "#F59E0B" },
      "2:00 PM": { type: "assessment", student: "Dylan Chen", color: "#EC4899" }
    },
    Friday: {
      "9:00 AM": { type: "blocked", reason: "Team Meeting" },
      "11:00 AM": { type: "individual", student: "Sofia Martinez", color: "#6366F1" },
      "1:00 PM": { type: "individual", student: "Emma Rodriguez", color: "#3B82F6" }
    }
  });
  
  const handlePreviousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };
  
  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };
  
  const formatWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday
    
    const end = new Date(start);
    end.setDate(end.getDate() + 4); // Friday
    
    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
  };
  
  const handleDrop = (student, day, time) => {
    // Handle dropping a student into a time slot
    const updatedSchedule = { ...schedule };
    
    if (!updatedSchedule[day]) {
      updatedSchedule[day] = {};
    }
    
    const studentObj = students.find(s => s.name === student);
    
    updatedSchedule[day][time] = {
      type: "individual",
      student: student,
      color: studentObj ? studentObj.color : "#3B82F6"
    };
    
    setSchedule(updatedSchedule);
  };
  
  const handleSessionDrop = (session, fromDay, fromTime, toDay, toTime) => {
    // Handle dropping a session from one time slot to another
    if (fromDay === toDay && fromTime === toTime) return;
    
    const updatedSchedule = { ...schedule };
    
    // Copy the session to the new location
    updatedSchedule[toDay] = updatedSchedule[toDay] || {};
    updatedSchedule[toDay][toTime] = { ...updatedSchedule[fromDay][fromTime] };
    
    // Remove from the old location
    delete updatedSchedule[fromDay][fromTime];
    
    setSchedule(updatedSchedule);
  };
  
  const addStudentToGroup = (student, day, time) => {
    // Add a student to an existing group session
    const updatedSchedule = { ...schedule };
    const session = updatedSchedule[day][time];
    
    if (session.type === "group") {
      const studentObj = students.find(s => s.name === student);
      
      if (!session.students.includes(student)) {
        session.students.push(student);
        session.colors.push(studentObj ? studentObj.color : "#3B82F6");
      }
      
      setSchedule(updatedSchedule);
    }
  };
  
  const removeStudentFromGroup = (student, day, time) => {
    // Remove a student from a group session
    const updatedSchedule = { ...schedule };
    const session = updatedSchedule[day][time];
    
    if (session.type === "group") {
      const index = session.students.indexOf(student);
      
      if (index !== -1) {
        session.students.splice(index, 1);
        session.colors.splice(index, 1);
        
        // If only one student remains, convert to individual session
        if (session.students.length === 1) {
          updatedSchedule[day][time] = {
            type: "individual",
            student: session.students[0],
            color: session.colors[0]
          };
        }
        
        // If no students remain, delete the session
        if (session.students.length === 0) {
          delete updatedSchedule[day][time];
        }
      }
      
      setSchedule(updatedSchedule);
    }
  };
  
  const createGroupSession = (day, time) => {
    // Create a new empty group session
    const updatedSchedule = { ...schedule };
    
    updatedSchedule[day] = updatedSchedule[day] || {};
    updatedSchedule[day][time] = {
      type: "group",
      name: "New Group Session",
      students: [],
      colors: []
    };
    
    setSchedule(updatedSchedule);
  };

  const deleteSession = (sessionId, day, time) => {
    // Delete a session
    const updatedSchedule = { ...schedule };
    
    if (updatedSchedule[day] && updatedSchedule[day][time]) {
      delete updatedSchedule[day][time];
      setSchedule(updatedSchedule);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handlePreviousWeek}
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-lg font-medium text-gray-900">Schedule Grid: {formatWeekRange(currentWeek)}</h3>
          <button 
            onClick={handleNextWeek}
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <button 
          onClick={() => setViewMode('calendar')}
          className="px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 rounded-md"
        >
          Calendar View
        </button>
      </div>
      
      <div className="flex">
        {/* Student Sidebar */}
        <div className="w-48 border-r pr-4">
          <h4 className="font-medium text-gray-700 mb-2">Students</h4>
          <div className="space-y-2">
            {students.map(student => (
              <div 
                key={student.id}
                className="p-2 bg-white border rounded shadow-sm cursor-move"
                style={{ borderLeftWidth: '4px', borderLeftColor: student.color }}
              >
                {student.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Schedule Grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="min-w-max">
            {/* Days Header */}
            <div className="grid grid-cols-5 gap-2 mb-2 ml-16">
              {days.map(day => (
                <div key={day} className="text-center font-medium text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Time Slots and Sessions */}
            <div className="space-y-2">
              {timeSlots.map(time => (
                <div key={time} className="flex">
                  <div className="w-16 text-right pr-2 text-sm text-gray-600 pt-2">
                    {time}
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-2">
                    {days.map(day => {
                      const session = schedule[day] && schedule[day][time];
                      
                      return (
                        <div 
                          key={`${day}-${time}`}
                          className="h-16 border rounded p-1 bg-gray-50 relative"
                        >
                          {session ? (
                            session.type === "individual" ? (
                              <div 
                                className="h-full w-full rounded p-1 cursor-move"
                                style={{ backgroundColor: `${session.color}20`, borderLeft: `3px solid ${session.color}` }}
                              >
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">{session.student}</span>
                                  <button 
                                    onClick={() => deleteSession(null, day, time)}
                                    className="text-slate-400 hover:text-slate-600 text-xs"
                                  >
                                    ×
                                  </button>
                                </div>
                                <div className="text-xs text-gray-600">Individual</div>
                              </div>
                            ) : session.type === "group" ? (
                              <div 
                                className="h-full w-full rounded p-1 cursor-move bg-purple-50 border-l-3 border-purple-400"
                              >
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">{session.name}</span>
                                  <button 
                                    onClick={() => deleteSession(null, day, time)}
                                    className="text-slate-400 hover:text-slate-600 text-xs"
                                  >
                                    ×
                                  </button>
                                </div>
                                <div className="text-xs text-gray-600">
                                  {session.students.map((student, idx) => (
                                    <div key={idx} className="flex items-center">
                                      <div 
                                        className="w-2 h-2 rounded-full mr-1"
                                        style={{ backgroundColor: session.colors[idx] }}
                                      ></div>
                                      <span>{student}</span>
                                      <button 
                                        onClick={() => removeStudentFromGroup(student, day, time)}
                                        className="ml-1 text-slate-400 hover:text-slate-600 text-xs"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : session.type === "assessment" ? (
                              <div 
                                className="h-full w-full rounded p-1 cursor-move bg-yellow-50 border-l-3 border-yellow-400"
                              >
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">{session.student}</span>
                                  <button 
                                    onClick={() => deleteSession(null, day, time)}
                                    className="text-slate-400 hover:text-slate-600 text-xs"
                                  >
                                    ×
                                  </button>
                                </div>
                                <div className="text-xs text-gray-600">Assessment</div>
                              </div>
                            ) : (
                              <div 
                                className="h-full w-full rounded p-1 bg-red-50 border-l-3 border-red-400"
                              >
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">{session.reason}</span>
                                  <button 
                                    onClick={() => deleteSession(null, day, time)}
                                    className="text-slate-400 hover:text-slate-600 text-xs"
                                  >
                                    ×
                                  </button>
                                </div>
                                <div className="text-xs text-gray-600">Blocked</div>
                              </div>
                            )
                          ) : (
                            <button 
                              onClick={() => createGroupSession(day, time)}
                              className="h-full w-full flex items-center justify-center text-sm text-gray-400 hover:text-gray-600"
                            >
                              + Add
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 border-t pt-4 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
          <span className="text-sm text-slate-600">Individual Session</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-200 border border-purple-400 rounded"></div>
          <span className="text-sm text-slate-600">Group Session</span>
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
  );
};
