import React, { useState, useEffect } from "react";
import axios from "axios";
const BaseURL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes] = await Promise.all([
        axios.get(`${BaseURL}/api/dashboard/stats`),
        axios.get(`${BaseURL}/api/dashboard/activities`),
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }

      if (activitiesRes.data.success) {
        // Add validation for activities data
        const validActivities = activitiesRes.data.activities.filter(
          (activity) => activity && activity.id && activity.title
        );
        setActivities(validActivities);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Set empty arrays as fallback
      setStats([]);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {stat.title}
            </h3>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span
                className={`text-sm font-medium ${
                  stat.color === "green"
                    ? "text-green-600"
                    : stat.color === "red"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="text-lg">{activity.icon}</div>
              <span className="text-gray-700 flex-1">{activity.title}</span>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
