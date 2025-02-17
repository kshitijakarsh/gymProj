import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar"
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 10,
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        color: '#E5E7EB'
      },
      ticks: {
        font: {
          size: 12
        }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12
        }
      }
    }
  }
};

// Simple SVG icons as components
const Icons = {
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Weight: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  Target: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Activity: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md border border-gray-100 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ icon: Icon, title, value, unit = "" }) => (
  <Card>
    <div className="p-6">
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <Icon />
        <span className="font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">
        {value || '--'} {unit}
      </div>
    </div>
  </Card>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-950 focus:border-slate-950"
    />
  </div>
);

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="w-full bg-slate-950 text-white py-2 px-4 rounded-lg hover:bg-slate-950 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
  >
    {children}
  </button>
);

const GymDashboard = () => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [calorieTarget, setCalorieTarget] = useState("");
  const [height, setHeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams()

  const chartData = {
    labels: monthlyData.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight (kg)',
        data: monthlyData.map(data => data.weight),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#FFFFFF',
        pointHoverRadius: 6,
        tension: 0.4
      }
    ]
  };

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data...");
  
      try {
        const response = await axios.get(`http://localhost:3000/api/gym-dashboard/${userId}`);
        console.log(response);
  
        // Use response.data to access the actual data
        setMonthlyData(response.data.monthlyData || []);
        setAttendance(response.data.attendance || {});
        setTargetWeight(response.data.targetWeight || "");
        setHeight(response.data.height || "");
        setCalorieTarget(response.data.calorieTarget || "");
        setCurrentWeight(response.data.currentWeight || "");
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    };
  
    if (userId) {
      fetchUserData();
    } else {
      console.warn("No userId provided, skipping request.");
    }
  }, [userId]);
  

  const handleWeightSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentWeight) {
      console.warn("No weight entered, skipping update.");
      return;
    }
  
    // Extract the current month
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' }); // Example: "February"
  
    console.log(`[INFO] Updating weight for userId: ${userId} in month: ${currentMonth}, weight: ${currentWeight}`);
  
    try {
      const response = await axios.post(`http://localhost:3000/api/gym-dashboard/${userId}/weight`, {
        month: currentMonth,
        weight: parseFloat(currentWeight),
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log("[SUCCESS] Weight updated successfully:", response.data);
        
        // Update UI state: Check if the month already exists
        const updatedMonthlyData = monthlyData.map(entry => 
          entry.date.includes(currentMonth) ? { ...entry, weight: parseFloat(currentWeight) } : entry
        );
  
        // If month entry is not found, add a new one
        if (!updatedMonthlyData.some(entry => entry.date.includes(currentMonth))) {
          updatedMonthlyData.push({
            date: currentDate.toISOString(),
            weight: parseFloat(currentWeight),
          });
        }
  
        setMonthlyData(updatedMonthlyData);
      } else {
        console.warn("[WARNING] Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("[ERROR] Error updating weight:", error.response?.data || error.message);
    }
  };
  

  const handleDateClick = async (dateKey) => {
    setIsLoading(true);
    console.log(`[INFO] Toggling attendance for date: ${dateKey}`);
  
    // Parse the month and day from dateKey (format: "month-day")
    const [monthNum, day] = dateKey.split('-').map(num => parseInt(num));
    
    // Convert month number to month name
    const monthName = new Date(2025, monthNum - 1).toLocaleString('default', { month: 'long' });
  
    try {
      console.log("[INFO] Updating attendance...");
      const response = await axios.post(`http://localhost:3000/api/gym-dashboard/${userId}/attendance`, {
        month: monthName,
        day: parseInt(day)
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log("[SUCCESS] Attendance updated successfully:", response.data);
        
        // Update state only if the request succeeds
        setAttendance((prevAttendance) => ({
          ...prevAttendance,
          [dateKey]: !prevAttendance[dateKey],
        }));
      } else {
        console.warn("[WARNING] Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("[ERROR] Error updating attendance:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  const calculateBMI = () => {
    if (!currentWeight || !height) return null;
    const heightInMeters = height / 100;
    return (currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getMonthDays = (month) => {
    const year = new Date().getFullYear();
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Fitness Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Icons.Weight} title="Current Weight" value={currentWeight} unit="kg" />
          <StatCard icon={Icons.Target} title="Target Weight" value={targetWeight} unit="kg" />
          <StatCard icon={Icons.Weight} title="BMI" value={calculateBMI()} />
          <StatCard icon={Icons.Activity} title="Daily Calories" value={calorieTarget} />
        </div>

        {/* Weight Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h2>
          <div className="h-[400px] w-full">
            <Line options={chartOptions} data={chartData} />
          </div>
        </Card>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Track Progress</h2>
            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <Input
                label="Current Weight (kg)"
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                placeholder="Enter weight"
              />
              <Input
                label="Height (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height"
              />
              <Button type="submit">Update Progress</Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Set Goals</h2>
            <div className="space-y-4">
              <Input
                label="Target Weight (kg)"
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                placeholder="Enter target weight"
              />
              <Input
                label="Daily Calorie Target"
                type="number"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(e.target.value)}
                placeholder="Enter calorie target"
              />
              <Button>Save Goals</Button>
            </div>
          </Card>
        </div>

        {/* Attendance Calendar */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Icons.Calendar />
            <h2 className="text-lg font-semibold text-gray-900">Attendance Tracker</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }, (_, month) => (
              <div key={month} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  {new Date(2025, month).toLocaleString('default', { month: 'long' })}
                </h3>
                <div className="grid grid-cols-7 gap-1">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-xs text-gray-500 text-center mb-1">
                      {day}
                    </div>
                  ))}
                  
                  {Array.from({ length: new Date(2025, month, 1).getDay() }, (_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  
                  {Array.from({ length: getMonthDays(month) }, (_, day) => {
                    const dateKey = `${month + 1}-${day + 1}`;
                    const isSelected = attendance[dateKey];
                    
                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(dateKey)}
                        disabled={isLoading}
                        className={`
                          aspect-square rounded-md flex items-center justify-center
                          text-sm transition-colors duration-200
                          ${isSelected 
                            ? "bg-green-500 text-white hover:bg-green-600" 
                            : "bg-white hover:bg-gray-100 text-gray-700"}
                          ${isLoading ? "cursor-wait opacity-50" : "cursor-pointer"}
                          focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-opacity-50
                          shadow-sm
                        `}
                      >
                        {day + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
    </>
  );
};

export default GymDashboard;