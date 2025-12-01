import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Zap, Target } from 'lucide-react';
import { assets } from '../assets';

const PersonalizedInsights = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="p-4 bg-amber-100 rounded-3xl w-fit mx-auto mb-4">
          <Lightbulb className="w-12 h-12 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Personalized Insights</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get actionable, data-driven recommendations tailored specifically for your farm's unique conditions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.insights.map((insight, index) => {
          const getIcon = () => {
            switch (insight.type) {
              case 'Irrigation': return TrendingUp;
              case 'Marketing': return Target;
              case 'Pest Control': return AlertTriangle;
              default: return Zap;
            }
          };
          const Icon = getIcon();
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${
                  insight.priority === 'High' ? 'bg-red-100' :
                  insight.priority === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    insight.priority === 'High' ? 'text-red-600' :
                    insight.priority === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`} />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  insight.priority === 'High' ? 'bg-red-100 text-red-700' :
                  insight.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {insight.priority} Priority
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">{insight.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{insight.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Action Required:</span>
                  <span className="font-semibold">{insight.actionRequired}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Potential Saving:</span>
                  <span className="font-semibold text-green-600">{insight.potentialSaving}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-semibold text-red-600">{insight.deadline}</span>
                </div>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all">
                Take Action
              </button>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">Weekly Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-2xl p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Actions Completed
            </h3>
            <div className="text-3xl font-bold mb-1">8</div>
            <p className="text-purple-100 text-sm">Out of 12 recommendations</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Savings Generated
            </h3>
            <div className="text-3xl font-bold mb-1">₹75,000</div>
            <p className="text-purple-100 text-sm">This month</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <h3 className="font-bold mb-2 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Optimization Score
            </h3>
            <div className="text-3xl font-bold mb-1">87%</div>
            <p className="text-purple-100 text-sm">Farm efficiency</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalizedInsights;