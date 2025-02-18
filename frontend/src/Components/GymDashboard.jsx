import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Icons object (you can replace with your actual icons)
const Icons = {
  Weight: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  Target: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Activity: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  Save: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>,
  Trophy: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>,
  Fire: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  Star: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>,
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ icon: Icon, title, value, unit = "", className = "" }) => (
  <Card className={`transform hover:scale-105 transition-all duration-300 ${className}`}>
    <div className="p-6">
      <div className="flex items-center gap-2 text-gray-950 mb-2">
        <Icon />
        <span className="font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">
        {value || '--'} {unit}
      </div>
    </div>
  </Card>
);

// Add chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Weight Progress',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: 'Weight (kg)'
      }
    }
  }
};

const MonthlyCalendar = ({ month, attendance, onToggle }) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month) => {
    const year = new Date().getFullYear();
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(month);
  const currentDate = new Date();
  const isCurrentMonth = month === currentDate.getMonth();
  const isPastMonth = month < currentDate.getMonth();

  // Add weekday headers
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{monthNames[month]}</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-xs text-gray-500 font-medium text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Add empty cells for proper day alignment */}
          {Array.from({ length: new Date(2024, month, 1).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dateKey = `${month + 1}-${day}`;
            const canToggle = isPastMonth || (isCurrentMonth && day <= currentDate.getDate());
            
            return (
              <button
                key={day}
                onClick={() => canToggle && onToggle(dateKey)}
                disabled={!canToggle}
                className={`
                  aspect-square rounded-lg text-sm font-medium
                  transition-all duration-200 flex items-center justify-center
                  ${canToggle ? 'hover:bg-gray-100' : 'cursor-not-allowed opacity-50'}
                  ${attendance[dateKey] ? 'bg-green-500 text-white hover:bg-green-950' : 'bg-white'}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

const MotivationCard = ({ icon: Icon, title, message }) => (
  <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-100 shadow-sm">
    <div className="flex items-center gap-2 text-slate-950 mb-2">
      <Icon />
      <h3 className="font-semibold">{title}</h3>
    </div>
    <p className="text-gray-950 text-sm">{message}</p>
  </div>
);

// Add this styled input component
const StyledInput = ({ label, value, onChange, placeholder, unit, type = "number", min, step }) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 
                 transition-all duration-200 bg-white
                 placeholder-gray-400 text-gray-700"
      />
      {unit && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 
                      text-gray-400 bg-white px-2 text-sm font-medium">
          {unit}
        </span>
      )}
    </div>
  </div>
);

const GymDashboard = () => {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [calorieTarget, setCalorieTarget] = useState("");
  const [height, setHeight] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Simplified data fetching on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        console.log(`[INFO] Fetching data for user: ${userId}`);

        const response = await axios.get(`http://localhost:3000/api/gym-dashboard/${userId}`);

        if (response.data) {
          const { 
            targetWeight, 
            height, 
            calorieTarget, 
            currentWeight, 
            monthlyData,
            attendance: attendanceData,
            userName 
          } = response.data;

          console.log('[INFO] Dashboard data received:', response.data);
          
          // Set basic user data
          setName(userName || "");
          setTargetWeight(targetWeight?.toString() || "");
          setHeight(height?.toString() || "");
          setCalorieTarget(calorieTarget?.toString() || "");
          setCurrentWeight(currentWeight?.toString() || "");
          setMonthlyData(monthlyData || []);

          // Format and set attendance data
          const formattedAttendance = {};
          if (attendanceData && Array.isArray(attendanceData)) {
            attendanceData.forEach(monthData => {
              if (monthData.daysPresent) {
                const monthIndex = new Date(Date.parse(`${monthData.month} 1, 2024`)).getMonth() + 1;
                monthData.daysPresent.forEach(day => {
                  formattedAttendance[`${monthIndex}-${day}`] = true;
                });
              }
            });
          }
          setAttendance(formattedAttendance);

          console.log('[SUCCESS] User data loaded successfully');
        }
      } catch (error) {
        console.error('[ERROR] Failed to fetch user data:', error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleWeightSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentWeight) {
      console.warn("No weight entered, skipping update.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/gym-dashboard/${userId}/weight`, {
        weight: parseFloat(currentWeight),
        date: new Date().toISOString()
      });

      if (response.status === 200) {
        console.log("[SUCCESS] Weight updated successfully");
        setCurrentWeight(response.data.currentWeight?.toString() || "");
        setMonthlyData(response.data.monthlyData || []);
      }
    } catch (error) {
      console.error("[ERROR] Error updating weight:", error);
    }
  };

  const handleGoalsSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:3000/api/gym-dashboard/${userId}/goals`, {
        targetWeight: parseFloat(targetWeight),
        calorieTarget: parseInt(calorieTarget),
        height: parseFloat(height)
      });

      if (response.status === 200) {
        console.log("[SUCCESS] Goals updated successfully");
        setTargetWeight(response.data.targetWeight?.toString() || "");
        setCalorieTarget(response.data.calorieTarget?.toString() || "");
        setHeight(response.data.height?.toString() || "");
      }
    } catch (error) {
      console.error("[ERROR] Error updating goals:", error);
    }
  };

  const handleAttendanceToggle = async (dateKey) => {
    try {
      const [monthNum, day] = dateKey.split('-').map(num => parseInt(num));
      const monthName = new Date(2024, monthNum - 1).toLocaleString('default', { month: 'long' });

      const response = await axios.post(`http://localhost:3000/api/gym-dashboard/${userId}/attendance`, {
        month: monthName,
        day: day
      });

      if (response.status === 200) {
        setAttendance(prevAttendance => {
          const newAttendance = { ...prevAttendance };
          if (newAttendance[dateKey]) {
            delete newAttendance[dateKey];
          } else {
            newAttendance[dateKey] = true;
          }
          return newAttendance;
        });
      }
    } catch (error) {
      console.error("[ERROR] Error updating attendance:", error);
    }
  };

  const calculateBMI = () => {
    if (currentWeight && height) {
      const heightInMeters = parseFloat(height) / 100;
      return (parseFloat(currentWeight) / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '--';
  };

  // Calculate chart data
  const weightChartData = {
    labels: monthlyData.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight Progress',
        data: monthlyData.map(data => data.weight),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3
      }
    ]
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-500 mx-auto"></div>
          <p className="mt-4 text-gray-950">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center text-red-950">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-950 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header Section */}
          <Card className="p-6 bg-gradient-to-r from-slate-500 to-slate-950 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, {name || 'User'} 👋
                </h1>
                <p className="text-slate-100 mt-2">
                  Your fitness journey continues! 💪
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-slate-50">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </Card>

          {/* Motivation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MotivationCard 
              icon={Icons.Trophy}
              title="Goal Progress"
              message={`${currentWeight && targetWeight ? Math.abs(currentWeight - targetWeight).toFixed(1) + 'kg to go!' : 'Set your goals!'}`}
            />
            <MotivationCard 
              icon={Icons.Fire}
              title="Calories Target"
              message={`Targeting ${calorieTarget || '---'} calories daily`}
            />
            <MotivationCard 
              icon={Icons.Chart}
              title="BMI Status"
              message={`Current BMI: ${calculateBMI() || '---'}`}
            />
            <MotivationCard 
              icon={Icons.Star}
              title="Streak"
              message={`${Object.keys(attendance).length} days attended! 🎉`}
            />
          </div>

          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              icon={Icons.Weight} 
              title="Current Weight" 
              value={currentWeight} 
              unit="kg"
              className="bg-gradient-to-br from-purple-50 to-white"
            />
            <StatCard 
              icon={Icons.Target} 
              title="Target Weight" 
              value={targetWeight} 
              unit="kg"
              className="bg-gradient-to-br from-green-50 to-white"
            />
            <StatCard 
              icon={Icons.Weight} 
              title="BMI" 
              value={calculateBMI()}
              className="bg-gradient-to-br from-yellow-50 to-white"
            />
            <StatCard 
              icon={Icons.Activity} 
              title="Daily Calories" 
              value={calorieTarget}
              className="bg-gradient-to-br from-red-50 to-white"
            />
          </div>

          {/* Enhanced Weight Progress Chart */}
          <div className="max-w-4xl mx-auto"> {/* Wrapper for centering */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Icons.Chart className="text-slate-500" />
                Weight Progress Journey 📈
              </h2>
              <div className="h-[400px] w-full">
                <Line options={chartOptions} data={weightChartData} />
              </div>
            </Card>
          </div>

          {/* Forms Section with Enhanced Styling */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-50 via-white to-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Icons.Weight className="text-slate-500" />
                Track Today's Progress 📝
              </h2>
              <form onSubmit={handleWeightSubmit} className="space-y-6">
                <StyledInput
                  label="Current Weight"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="Enter your current weight"
                  unit="kg"
                  min="0"
                  step="0.1"
                />
                
                {currentWeight && (
                  <div className="text-sm text-gray-950 bg-slate-50 p-3 rounded-lg flex items-center gap-2">
                    <Icons.Calendar className="text-slate-500 w-4 h-4" />
                    Last recorded: {new Date().toLocaleDateString()}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-slate-500 text-white py-3 px-4 rounded-lg
                           hover:bg-slate-950 active:bg-slate-700
                           transition-colors duration-200
                           flex items-center justify-center gap-2
                           focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  <Icons.Save />
                  Update Weight
                </button>
              </form>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 via-white to-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Icons.Target className="text-purple-500" />
                Set Your Goals 🎯
              </h2>
              <form onSubmit={handleGoalsSubmit} className="space-y-6">
                <StyledInput
                  label="Target Weight"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  placeholder="Enter target weight"
                  unit="kg"
                  min="0"
                  step="0.1"
                />
                
                <StyledInput
                  label="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height"
                  unit="cm"
                  min="0"
                  step="0.1"
                />
                
                <StyledInput
                  label="Daily Calorie Target"
                  value={calorieTarget}
                  onChange={(e) => setCalorieTarget(e.target.value)}
                  placeholder="Enter daily calorie target"
                  unit="kcal"
                  min="0"
                />

                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg
                           hover:bg-purple-950 active:bg-purple-700
                           transition-colors duration-200
                           flex items-center justify-center gap-2
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <Icons.Save />
                  Save Goals
                </button>
              </form>
            </Card>
          </div>

          {/* Enhanced Calendar Section */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Icons.Calendar className="text-slate-500" />
              Attendance Tracker 📅
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }, (_, i) => (
                <MonthlyCalendar
                  key={i}
                  month={i}
                  attendance={attendance}
                  onToggle={handleAttendanceToggle}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GymDashboard;