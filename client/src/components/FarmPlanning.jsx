import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { aiHelpers } from '../assets';

const FarmPlanning = () => {
  const [selectedCrop, setSelectedCrop] = useState('Cotton');
  const [farmPlan, setFarmPlan] = useState(null);

  const generatePlan = () => {
    const plan = aiHelpers.generateFarmPlan(selectedCrop, 5, 'Kharif');
    setFarmPlan(plan);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="p-4 bg-lime-100 rounded-3xl w-fit mx-auto mb-4">
          <Calendar className="w-12 h-12 text-lime-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Farm Planning Calendar</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get AI-generated farming schedules optimized for weather, crop stages, and seasonal requirements.
        </p>
      </motion.div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Generate Farm Plan</h2>
          <div className="flex space-x-4">
            <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} className="px-4 py-2 border rounded-2xl">
              <option value="Cotton">Cotton</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Tomato">Tomato</option>
            </select>
            <button onClick={generatePlan} className="px-6 py-2 bg-lime-500 text-white rounded-2xl hover:bg-lime-600">
              Generate Plan
            </button>
          </div>
        </div>

        {farmPlan && (
          <div className="space-y-4">
            {farmPlan.map((activity, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                className="bg-lime-50 rounded-2xl p-6 border border-lime-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${
                      activity.priority === 'Critical' ? 'bg-red-100' :
                      activity.priority === 'High' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      {activity.priority === 'Critical' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                       activity.priority === 'High' ? <Clock className="w-5 h-5 text-yellow-600" /> :
                       <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-lime-800">{activity.activity}</h3>
                      <p className="text-sm text-lime-600">{activity.scheduledDate} • Duration: {activity.duration} days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      activity.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      activity.priority === 'High' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {activity.priority}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">₹{activity.estimatedCost}</p>
                  </div>
                </div>
                {activity.weatherDependency && (
                  <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 rounded-xl px-3 py-2">
                    <Zap className="w-4 h-4" />
                    <span>Weather dependent activity - Monitor forecast</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmPlanning;