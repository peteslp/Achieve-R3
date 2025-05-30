// This file contains all the components that were previously working
// We'll import the ScheduleGrid from the main components.js file

export { Login, ScheduleGrid } from './components';

// Re-export all the other components here
// Dashboard, Caseload, Schedule, StudentDetail, LiveSession

// Mock Data (same as before)
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentWeek = [];
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay());
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfCurrentWeek);
    date.setDate(startOfCurrentWeek.getDate() + i);
    currentWeek.push(date);
  }
  return currentWeek;
};

const formatDateForSessions = (date) => {
  return date.toISOString();
};

const getProgressColor = (level) => {
  switch(level) {
    case 'Excellent': return 'text-green-600 bg-green-100';
    case 'Progressing': return 'text-blue-600 bg-blue-100';
    case 'Needs Support': return 'text-orange-600 bg-orange-100';
    default: return 'text-slate-600 bg-slate-100';
  }
};

const currentWeekDates = getCurrentWeekDates();

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
  // ... other students
];

// We'll add the rest of the components here
// But for now, let's just test the 5-minute schedule grid