import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, MapPin, Calendar, DollarSign, TrendingUp, 
  Droplets, Target, CheckCircle, AlertTriangle, BarChart3
} from 'lucide-react';
import { assets, aiHelpers } from '../assets';

const CropRecommendation = () => {
  const [selectedSeason, setSelectedSeason] = useState('kharif');
  const [recommendations, setRecommendations] = useState(null);
  const [filters, setFilters] = useState({
    soilType: 'Black Cotton Soil',
    region: 'Maharashtra',
    budget: '50000',
    experience: 'intermediate'
  });

  const generateRecommendations = () => {
    const recs = aiHelpers.recommendCrops(filters.soilType, selectedSeason, filters.region);
    setRecommendations(recs);
  };

  const seasons = [
    { key: 'kharif', name: 'Kharif', period: 'Jun-Oct', icon: '🌧️' },
    { key: 'rabi', name: 'Rabi', period: 'Nov-Apr', icon: '❄️' },
    { key: 'zaid', name: 'Zaid', period: 'May-Jun', icon: '☀️' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative overflow-hidden rounded-3xl bg-linear-to-r from-green-50 to-emerald-50 p-8"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/src/assets/pexels-nc-farm-bureau-mark-2749165.jpg" 
            alt="Crop farming" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-green-100/90 backdrop-blur-sm rounded-3xl shadow-lg">
              <Sprout className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Smart Crop Recommendation
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Get AI-powered crop suggestions based on your soil, climate, and market conditions
            to maximize profitability and minimize risks.
          </p>
        </div>
      </motion.div>

      {/* Season Selection */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Calendar className="w-7 h-7 text-green-600 mr-3" />
          Select Growing Season
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasons.map((season, index) => (
            <motion.button
              key={season.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSeason(season.key)}
              className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
                selectedSeason === season.key
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-4">{season.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${
                selectedSeason === season.key ? 'text-green-800' : 'text-gray-700'
              }`}>
                {season.name} Season
              </h3>
              <p className={`text-sm ${
                selectedSeason === season.key ? 'text-green-600' : 'text-gray-500'
              }`}>
                {season.period}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="w-7 h-7 text-blue-600 mr-3" />
          Customize Recommendations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Soil Type</label>
            <select
              value={filters.soilType}
              onChange={(e) => setFilters({...filters, soilType: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Black Cotton Soil">Black Cotton Soil</option>
              <option value="Red Soil">Red Soil</option>
              <option value="Alluvial Soil">Alluvial Soil</option>
              <option value="Sandy Soil">Sandy Soil</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
            <select
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Budget (₹/acre)</label>
            <select
              value={filters.budget}
              onChange={(e) => setFilters({...filters, budget: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="25000">₹25,000</option>
              <option value="50000">₹50,000</option>
              <option value="75000">₹75,000</option>
              <option value="100000">₹1,00,000+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => setFilters({...filters, experience: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateRecommendations}
            className="px-8 py-4 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center space-x-2"
          >
            <Sprout className="w-5 h-5" />
            <span>Get Recommendations</span>
          </motion.button>
        </div>
      </div>

      {/* Available Crops for Selected Season */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {seasons.find(s => s.key === selectedSeason)?.name} Season Crops
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.crops[selectedSeason].map((crop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{crop.name}</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  crop.profitability >= 85 ? 'bg-green-100 text-green-700' :
                  crop.profitability >= 75 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {crop.profitability}% Profit
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{crop.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Water Req:</span>
                  <span className={`font-semibold ${
                    crop.waterReq === 'High' ? 'text-blue-600' :
                    crop.waterReq === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {crop.waterReq}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Investment:</span>
                  <span className="font-semibold text-red-600">{crop.investment}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expected Return:</span>
                  <span className="font-semibold text-green-600">{crop.expectedReturn}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      {recommendations && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Target className="w-7 h-7 mr-3" />
              AI-Powered Recommendations
            </h2>
            <p className="text-purple-100 text-lg">
              Based on your soil type, region, budget, and market analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-green-200 shadow-xl relative overflow-hidden"
              >
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    BEST MATCH
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Sprout className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{rec.name}</h3>
                  <div className="flex justify-center space-x-2">
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {rec.suitabilityScore}% Match
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      rec.riskFactor <= 20 ? 'bg-green-100 text-green-700' :
                      rec.riskFactor <= 35 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {rec.riskFactor}% Risk
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Financial</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-blue-600">Investment</p>
                        <p className="font-semibold text-blue-800">{rec.investment}</p>
                      </div>
                      <div>
                        <p className="text-blue-600">Return</p>
                        <p className="font-semibold text-blue-800">{rec.expectedReturn}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Droplets className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Requirements</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-green-600">Water</p>
                        <p className="font-semibold text-green-800">{rec.waterReq}</p>
                      </div>
                      <div>
                        <p className="text-green-600">Duration</p>
                        <p className="font-semibold text-green-800">{rec.duration}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Profitability</span>
                    </div>
                    <div className="flex items-center space-between">
                      <div className="flex-1 bg-purple-200 rounded-full h-3">
                        <div 
                          className="bg-purple-600 h-3 rounded-full" 
                          style={{ width: `${rec.profitability}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-semibold text-purple-700">
                        {rec.profitability}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {rec.suitabilityScore >= 85 && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {rec.riskFactor <= 20 && <CheckCircle className="w-5 h-5 text-blue-600" />}
                      {rec.profitability >= 80 && <TrendingUp className="w-5 h-5 text-purple-600" />}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
                    >
                      Select Crop
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CropRecommendation;