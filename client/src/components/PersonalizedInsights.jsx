import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Zap, Target, DollarSign } from 'lucide-react';
import { assets } from '../assets';

const PersonalizedInsights = () => {
  const insights = [
    {
      id: 1,
      title: 'Switch to drip irrigation this week',
      description: 'Weather forecast shows dry spell for next 10 days. Drip irrigation will save 40% water and increase yield by 15%.',
      priority: 'High Priority',
      type: 'Irrigation'
    },
    {
      id: 2,
      title: 'Sell tomatoes in 3 days',
      description: 'Market analysis shows prices will drop by ₹300/quintal after December 4th due to increased supply from neighboring districts.',
      priority: 'Medium Priority',
      type: 'Marketing'
    },
    {
      id: 3,
      title: 'Apply bollworm control measures',
      description: 'Weather conditions and crop stage indicate high risk of bollworm attack in next week. Early intervention can prevent 60% crop loss.',
      priority: 'High Priority',
      type: 'Pest Control'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-500 via-pink-500 to-purple-600 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-3xl shadow-lg">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">AI-Powered Insights</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Smart recommendations tailored for your farm based on real-time data analysis
            </p>
          </div>
          <div className="flex space-x-4 mt-6">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Generate New Insights</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 border border-white/20">
              View History
            </button>
          </div>
        </div>
      </motion.div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/30 transition-all duration-300 group"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    insight.priority === 'High Priority' ? 'bg-red-500/80 text-white' :
                    insight.priority === 'Medium Priority' ? 'bg-yellow-500/80 text-white' :
                    'bg-green-500/80 text-white'
                  }`}>
                    {insight.priority}
                  </div>
                  <div className={`p-2 rounded-lg ${
                    insight.type === 'Irrigation' ? 'bg-blue-500/20' :
                    insight.type === 'Marketing' ? 'bg-green-500/20' :
                    'bg-red-500/20'
                  }`}>
                    {insight.type === 'Irrigation' ? <TrendingUp className="w-4 h-4 text-blue-300" /> :
                     insight.type === 'Marketing' ? <DollarSign className="w-4 h-4 text-green-300" /> :
                     <AlertTriangle className="w-4 h-4 text-red-300" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{insight.title}</h3>
                <p className="text-purple-100 text-sm leading-relaxed mb-4">
                  {insight.description}
                </p>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium border border-white/20">
                  View Details
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Insights Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Today's Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-8 h-8 text-red-300" />
            </div>
            <h3 className="text-xl font-bold text-white">2</h3>
            <p className="text-purple-100">High Priority Tasks</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-300" />
            </div>
            <h3 className="text-xl font-bold text-white">5</h3>
            <p className="text-purple-100">Completed Actions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-white">85%</h3>
            <p className="text-purple-100">Efficiency Score</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalizedInsights;