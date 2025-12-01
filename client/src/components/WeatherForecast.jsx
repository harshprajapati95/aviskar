import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, Sun, CloudRain, CloudSnow, Zap, Wind, 
  Droplets, Eye, Thermometer, Gauge, MapPin,
  Calendar, TrendingUp, AlertTriangle, CheckCircle
} from 'lucide-react';
import { assets } from '../assets';

const WeatherForecast = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return Sun;
      case 'partly cloudy': return Cloud;
      case 'cloudy': return Cloud;
      case 'rainy': return CloudRain;
      case 'thunderstorm': return Zap;
      case 'snow': return CloudSnow;
      default: return Sun;
    }
  };

  const getWeatherGradient = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return 'from-yellow-400 to-orange-500';
      case 'partly cloudy': return 'from-blue-400 to-cyan-500';
      case 'cloudy': return 'from-gray-400 to-slate-500';
      case 'rainy': return 'from-blue-600 to-indigo-700';
      case 'thunderstorm': return 'from-purple-600 to-indigo-800';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  const getCurrentWeatherIcon = () => {
    const IconComponent = getWeatherIcon(assets.weather.current.condition);
    return <IconComponent className="w-16 h-16 text-white" />;
  };

  const farmingAdviceColor = (advice) => {
    if (advice.includes('Perfect') || advice.includes('Excellent')) return 'text-green-600 bg-green-100';
    if (advice.includes('Good')) return 'text-blue-600 bg-blue-100';
    if (advice.includes('Postpone') || advice.includes('Stay indoors')) return 'text-red-600 bg-red-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 bg-blue-100 rounded-3xl">
            <Cloud className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Weather Forecast & Farming Advice
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get real-time weather updates and AI-powered farming recommendations
          for optimal crop management decisions.
        </p>
      </motion.div>

      {/* Current Weather Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-linear-to-br ${getWeatherGradient(assets.weather.current.condition)} rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative`}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-semibold">{assets.weather.current.location}</span>
              </div>
              <p className="text-sm opacity-90">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm opacity-75">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            <div className="text-right">
              {getCurrentWeatherIcon()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{assets.weather.current.temperature}°C</div>
              <div className="text-xl font-semibold opacity-90">{assets.weather.current.condition}</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Droplets className="w-6 h-6" />
                <div>
                  <p className="text-sm opacity-75">Humidity</p>
                  <p className="text-lg font-semibold">{assets.weather.current.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Wind className="w-6 h-6" />
                <div>
                  <p className="text-sm opacity-75">Wind Speed</p>
                  <p className="text-lg font-semibold">{assets.weather.current.windSpeed} km/h</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6" />
                <div>
                  <p className="text-sm opacity-75">UV Index</p>
                  <p className="text-lg font-semibold">{assets.weather.current.uvIndex}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Gauge className="w-6 h-6" />
                <div>
                  <p className="text-sm opacity-75">Soil Moisture</p>
                  <p className="text-lg font-semibold">{assets.weather.current.soilMoisture}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Today's Advice
              </h4>
              <p className="text-sm leading-relaxed">
                {assets.weather.current.farmingAdvice}
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          {getCurrentWeatherIcon()}
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Calendar className="w-7 h-7 text-green-600 mr-3" />
          7-Day Forecast
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {assets.weather.forecast.map((day, index) => {
            const IconComponent = getWeatherIcon(day.condition);
            const isActive = activeDay === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveDay(index)}
                className={`p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? 'bg-linear-to-br from-blue-500 to-cyan-500 text-white shadow-lg' 
                    : 'bg-gray-50 hover:bg-blue-50 hover:shadow-md'
                }`}
              >
                <p className={`text-sm font-semibold mb-2 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                  {day.day}
                </p>
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <p className={`text-xs mb-1 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                  {day.condition}
                </p>
                <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-800'}`}>
                  {day.high}° / {day.low}°
                </div>
                {day.rainfall > 0 && (
                  <div className={`flex items-center justify-center mt-2 text-xs ${isActive ? 'text-blue-100' : 'text-blue-600'}`}>
                    <CloudRain className="w-3 h-3 mr-1" />
                    <span>{day.rainfall}mm</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detailed Day View */}
      {activeDay !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Weather Details */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Weather Details - {assets.weather.forecast[activeDay].day}
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Thermometer className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Temperature</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">
                    {assets.weather.forecast[activeDay].high}° / {assets.weather.forecast[activeDay].low}°
                  </p>
                </div>
                
                <div className="bg-cyan-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <CloudRain className="w-5 h-5 text-cyan-600" />
                    <span className="font-semibold text-cyan-800">Rainfall</span>
                  </div>
                  <p className="text-2xl font-bold text-cyan-700">
                    {assets.weather.forecast[activeDay].rainfall}mm
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Droplets className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Humidity</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {assets.weather.forecast[activeDay].humidity}%
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    {(() => {
                      const IconComponent = getWeatherIcon(assets.weather.forecast[activeDay].condition);
                      return <IconComponent className="w-5 h-5 text-purple-600" />;
                    })()}
                    <span className="font-semibold text-purple-800">Condition</span>
                  </div>
                  <p className="text-lg font-bold text-purple-700">
                    {assets.weather.forecast[activeDay].condition}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Farming Advice */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              Farming Advice
            </h3>
            
            <div className={`rounded-2xl p-6 mb-6 ${farmingAdviceColor(assets.weather.forecast[activeDay].advice)}`}>
              <p className="font-semibold text-lg mb-2">Recommended Actions:</p>
              <p className="leading-relaxed">
                {assets.weather.forecast[activeDay].advice}
              </p>
            </div>

            {/* Recommendations based on weather */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 mb-3">Detailed Recommendations:</h4>
              
              {assets.weather.forecast[activeDay].rainfall > 20 ? (
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-2xl">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Heavy Rain Alert</p>
                    <p className="text-sm text-red-700">Postpone spraying and field activities. Ensure proper drainage.</p>
                  </div>
                </div>
              ) : assets.weather.forecast[activeDay].rainfall > 5 ? (
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-2xl">
                  <CloudRain className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-800">Light Rain Expected</p>
                    <p className="text-sm text-yellow-700">Good for transplanting. Avoid fertilizer application.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-2xl">
                  <Sun className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800">Clear Weather</p>
                    <p className="text-sm text-green-700">Perfect for harvesting, spraying, and field operations.</p>
                  </div>
                </div>
              )}

              {assets.weather.forecast[activeDay].humidity > 80 && (
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-2xl">
                  <Droplets className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-800">High Humidity</p>
                    <p className="text-sm text-blue-700">Monitor for fungal diseases. Ensure good air circulation.</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3 p-4 bg-indigo-50 rounded-2xl">
                <TrendingUp className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-indigo-800">Crop Management</p>
                  <p className="text-sm text-indigo-700">
                    Temperature range of {assets.weather.forecast[activeDay].high}°-{assets.weather.forecast[activeDay].low}° 
                    is {assets.weather.forecast[activeDay].high > 35 ? 'high' : assets.weather.forecast[activeDay].high < 15 ? 'low' : 'optimal'} for most crops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Weather Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              <AlertTriangle className="w-7 h-7 mr-3" />
              Weather Alerts & Warnings
            </h3>
            <p className="text-orange-100 text-lg">
              Stay informed about critical weather conditions affecting your crops
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Thunderstorm Alert</span>
            </div>
            <p className="text-sm text-orange-100">
              Severe thunderstorms expected on Friday. Secure loose equipment and avoid field work.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="w-5 h-5" />
              <span className="font-semibold">High Wind Warning</span>
            </div>
            <p className="text-sm text-orange-100">
              Strong winds up to 45 km/h may affect spraying operations mid-week.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Thermometer className="w-5 h-5" />
              <span className="font-semibold">Heat Advisory</span>
            </div>
            <p className="text-sm text-orange-100">
              High temperatures above 35°C expected. Increase irrigation frequency.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherForecast;