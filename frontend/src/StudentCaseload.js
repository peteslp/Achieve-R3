import React, { useState } from 'react';
import { 
  Search, Filter, User, Calendar, TrendingUp, FileText, 
  AlertCircle, CheckCircle, Clock, GraduationCap, Target,
  BarChart3, Settings, ChevronRight, Star, Award
} from 'lucide-react';

// Mock student data
const mockStudents = [
  {
    id: 1,
    name: "Emma Rodriguez",
    age: 8,
    grade: "2nd Grade",
    diagnosis: ["Articulation Disorder", "Language Delay"],
    therapyGoals: ["Improve /r/ sound production", "Expand vocabulary", "Narrative skills"],
    progressLevel: "Progressing",
    lastSession: "2024-06-10",
    nextIEP: "2024-08-15",
    sessionFrequency: "2x/week",
    recentProgress: { score: 75, trend: "improving" },
    caseManager: "Dr. Sarah Johnson",
    notes: "Shows consistent improvement in /r/ production. Needs continued work on conversational carryover."
  },
  {
    id: 2,
    name: "Jake Mitchell",
    age: 10,
    grade: "4th Grade",
    diagnosis: ["Stuttering", "Language Processing"],
    therapyGoals: ["Fluency techniques", "Confidence building", "Classroom participation"],
    progressLevel: "Excellent",
    lastSession: "2024-06-09",
    nextIEP: "2024-09-20",
    sessionFrequency: "1x/week",
    recentProgress: { score: 88, trend: "improving" },
    caseManager: "Dr. Sarah Johnson",
    notes: "Excellent progress with fluency strategies. Ready to reduce session frequency."
  },
  {
    id: 3,
    name: "Sophia Chen",
    age: 6,
    grade: "Kindergarten",
    diagnosis: ["Phonological Processing", "Expressive Language"],
    therapyGoals: ["Sound discrimination", "Sentence structure", "Following directions"],
    progressLevel: "Needs Support",
    lastSession: "2024-06-11",
    nextIEP: "2024-07-30",
    sessionFrequency: "3x/week",
    recentProgress: { score: 45, trend: "stable" },
    caseManager: "Dr. Sarah Johnson",
    notes: "Requires additional support for phonological awareness. Consider AAC evaluation."
  },
  {
    id: 4,
    name: "Marcus Thompson",
    age: 12,
    grade: "6th Grade",
    diagnosis: ["Autism Spectrum", "Social Communication"],
    therapyGoals: ["Social pragmatics", "Turn-taking", "Peer interaction"],
    progressLevel: "Progressing",
    lastSession: "2024-06-08",
    nextIEP: "2024-10-12",
    sessionFrequency: "2x/week",
    recentProgress: { score: 68, trend: "improving" },
    caseManager: "Dr. Sarah Johnson",
    notes: "Making steady progress with social scripts. Increased peer interaction observed."
  },
  {
    id: 5,
    name: "Lily Wang",
    age: 9,
    grade: "3rd Grade",
    diagnosis: ["Hearing Impairment", "Language Delay"],
    therapyGoals: ["Auditory processing", "Vocabulary development", "Reading comprehension"],
    progressLevel: "Progressing",
    lastSession: "2024-06-10",
    nextIEP: "2024-08-05",
    sessionFrequency: "2x/week",
    recentProgress: { score: 70, trend: "improving" },
    caseManager: "Dr. Sarah Johnson",
    notes: "Good progress with hearing aids. Focus on auditory discrimination activities."
  },
  {
    id: 6,
    name: "David Kim",
    age: 7,
    grade: "1st Grade",
    diagnosis: ["Apraxia", "Motor Speech"],
    therapyGoals: ["Motor planning", "Sound sequencing", "Intelligibility"],
    progressLevel: "Progressing",
    lastSession: "2024-06-11",
    nextIEP: "2024-09-15",
    sessionFrequency: "3x/week",
    recentProgress: { score: 58, trend: "improving" },
    caseManager: "Dr. Sarah Johnson",
    notes: "Slow but steady progress with motor planning. Family practicing at home."
  }
];

const getProgressColor = (level) => {
  switch(level) {
    case 'Excellent': return 'text-green-700 bg-green-100 border-green-200';
    case 'Progressing': return 'text-blue-700 bg-blue-100 border-blue-200';
    case 'Needs Support': return 'text-orange-700 bg-orange-100 border-orange-200';
    default: return 'text-gray-700 bg-gray-100 border-gray-200';
  }
};

const getTrendIcon = (trend) => {
  if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-green-600" />;
  if (trend === 'declining') return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
  return <Target className="w-4 h-4 text-gray-600" />;
};

const StudentCard = ({ student, onSelect, isSelected }) => {
  const progressColorClass = getProgressColor(student.progressLevel);
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border-2 hover:shadow-md transition-all cursor-pointer ${
        isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'
      }`}
      onClick={() => onSelect(student)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-600">Age {student.age} • {student.grade}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {student.diagnosis.map((dx, index) => (
                  <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {dx}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${progressColorClass}`}>
              {student.progressLevel}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getTrendIcon(student.recentProgress.trend)}
            <span className="text-sm font-medium text-gray-700">{student.recentProgress.score}%</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>Frequency: {student.sessionFrequency}</span>
          <span>Next IEP: {new Date(student.nextIEP).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

const StudentDetails = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-gray-600">Age {student.age} • {student.grade}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">Progress Level</h4>
            </div>
            <p className={`mt-2 text-lg font-semibold ${getProgressColor(student.progressLevel).split(' ')[0]}`}>
              {student.progressLevel}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-gray-900">Recent Score</h4>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-lg font-semibold text-green-700">{student.recentProgress.score}%</span>
              {getTrendIcon(student.recentProgress.trend)}
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-gray-900">Session Frequency</h4>
            </div>
            <p className="mt-2 text-lg font-semibold text-purple-700">{student.sessionFrequency}</p>
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Diagnosis</h4>
          <div className="flex flex-wrap gap-2">
            {student.diagnosis.map((dx, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                {dx}
              </span>
            ))}
          </div>
        </div>

        {/* Therapy Goals */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Current Therapy Goals</h4>
          <ul className="space-y-2">
            {student.therapyGoals.map((goal, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Schedule Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Session:</span>
                <span className="font-medium">{new Date(student.lastSession).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next IEP:</span>
                <span className="font-medium">{new Date(student.nextIEP).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Case Manager:</span>
                <span className="font-medium">{student.caseManager}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recent Notes</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{student.notes}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FileText className="w-4 h-4" />
            <span>Session Notes</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Schedule Session</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>View Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentCaseload = () => {
  const [students] = useState(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [progressFilter, setProgressFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');

  // Filter logic
  React.useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.diagnosis.some(dx => dx.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (progressFilter !== 'all') {
      filtered = filtered.filter(student => student.progressLevel === progressFilter);
    }

    if (gradeFilter !== 'all') {
      filtered = filtered.filter(student => student.grade.includes(gradeFilter));
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, progressFilter, gradeFilter]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(selectedStudent?.id === student.id ? null : student);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Caseload</h1>
        <p className="text-gray-600">Manage your therapy students and track their progress</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Progress Levels</option>
            <option value="Excellent">Excellent</option>
            <option value="Progressing">Progressing</option>
            <option value="Needs Support">Needs Support</option>
          </select>
          
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Grades</option>
            <option value="Kindergarten">Kindergarten</option>
            <option value="1st">1st Grade</option>
            <option value="2nd">2nd Grade</option>
            <option value="3rd">3rd Grade</option>
            <option value="4th">4th Grade</option>
            <option value="6th">6th Grade</option>
          </select>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Showing {filteredStudents.length} of {students.length} students</span>
          </div>
        </div>
      </div>

      {/* Student List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student List */}
        <div className="space-y-4">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onSelect={handleStudentSelect}
              isSelected={selectedStudent?.id === student.id}
            />
          ))}
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Student Details */}
        <div className="lg:sticky lg:top-6">
          {selectedStudent ? (
            <StudentDetails
              student={selectedStudent}
              onClose={() => setSelectedStudent(null)}
            />
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Student</h3>
              <p className="text-gray-600">Click on a student card to view detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCaseload;