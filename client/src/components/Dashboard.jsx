import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, Sprout, 
  Cloud, AlertTriangle, CheckCircle, Calendar,
  BarChart3, Activity, Zap, Target
} from 'lucide-react';
import { assets } from '../assets';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹8.95L',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      description: 'This season earnings'
    },
    {
      title: 'Active Crops',
      value: '3',
      change: '+1',
      trend: 'up',
      icon: Sprout,
      color: 'from-green-500 to-lime-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Cotton, Wheat, Tomato'
    },
    {
      title: 'Weather Score',
      value: '85%',
      change: '-5%',
      trend: 'down',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Favorable conditions'
    },
    {
      title: 'Efficiency',
      value: '92%',
      change: '+8.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
      description: 'Above industry average'
    }
  ];

  const quickActions = [
    { title: 'Check Disease', icon: Activity, color: 'red', path: 'disease-detection' },
    { title: 'Weather Alert', icon: Cloud, color: 'blue', path: 'weather' },
    { title: 'Market Prices', icon: TrendingUp, color: 'orange', path: 'market-prices' },
    { title: 'AI Insights', icon: Zap, color: 'yellow', path: 'insights' },
    { title: 'Crop Plan', icon: Calendar, color: 'green', path: 'farm-planning' },
    { title: 'Expenses', icon: BarChart3, color: 'purple', path: 'expenses' }
  ];

  const recentActivities = [
    { action: 'Disease detected in cotton field', time: '2 hours ago', status: 'warning', icon: AlertTriangle },
    { action: 'Weather alert: Rain expected tomorrow', time: '4 hours ago', status: 'info', icon: Cloud },
    { action: 'Market price increased for wheat', time: '6 hours ago', status: 'success', icon: TrendingUp },
    { action: 'Fertilizer application completed', time: '1 day ago', status: 'success', icon: CheckCircle },
    { action: 'New government scheme available', time: '2 days ago', status: 'info', icon: Target }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute right-0 top-0 w-64 h-full opacity-20">
          <img 
            src="/src/assets/pexels-pixabay-259280.jpg" 
            alt="Farm background" 
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {assets.farmProfile.name}! 🌾
            </h1>
            <p className="text-green-100 text-lg">
              Your farm is thriving. Here's today's overview for {assets.farmProfile.location}.
            </p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-100">Farm Size: {assets.farmProfile.farmSize} acres</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-100">Weather: {assets.weather.current.condition}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{assets.weather.current.temperature}°C</div>
            <div className="text-green-100">{currentTime.toLocaleDateString()}</div>
            <div className="text-green-100">{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-2xl`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Zap className="w-7 h-7 text-yellow-500 mr-3" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-3xl border-2 border-${action.color}-200 hover:border-${action.color}-400 transition-all duration-300 group bg-linear-to-br from-${action.color}-50 to-${action.color}-100`}
              >
                <Icon className={`w-8 h-8 text-${action.color}-600 mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                <p className="text-sm font-semibold text-gray-700">{action.title}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weather Widget */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-linear-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Today's Weather</h3>
            <Cloud className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold">{assets.weather.current.temperature}°C</div>
              <div>
                <p className="text-lg font-semibold">{assets.weather.current.condition}</p>
                <p className="text-blue-100">Humidity: {assets.weather.current.humidity}%</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-2xl p-4">
              <p className="text-sm text-blue-100 mb-2">Farming Advice:</p>
              <p className="font-medium">{assets.weather.current.farmingAdvice}</p>
            </div>
          </div>
        </motion.div>

        {/* Market Prices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Market Prices</h3>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-4">
            {assets.marketPrices.today.slice(0, 3).map((price, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-semibold text-gray-800">{price.crop}</p>
                  <p className="text-sm text-gray-600">{price.market}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">₹{price.price}</p>
                  <p className={`text-sm flex items-center ${
                    price.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {price.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {price.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-xl ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      activity.status === 'success' ? 'text-green-600' :
                      activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* AI Insights Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">AI-Powered Insights</h3>
              <p className="text-purple-100">Smart recommendations tailored for your farm</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-semibold hover:bg-purple-50 transition-colors"
          >
            View All Insights
          </motion.button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {assets.insights.slice(0, 3).map((insight, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                insight.priority === 'High' ? 'bg-red-100 text-red-700' :
                insight.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {insight.priority} Priority
              </div>
              <h4 className="font-semibold mb-2">{insight.title}</h4>
              <p className="text-sm text-purple-100">{insight.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;