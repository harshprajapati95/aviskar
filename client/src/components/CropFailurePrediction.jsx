import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Shield, Target, BarChart3 } from 'lucide-react';
import { aiHelpers } from '../assets';

const CropFailurePrediction = () => {
  const [selectedCrop, setSelectedCrop] = useState('Cotton');
  const [prediction, setPrediction] = useState(null);

  const generatePrediction = () => {
    const pred = aiHelpers.predictCropFailure(selectedCrop, {});
    setPrediction(pred);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="p-4 bg-red-100 rounded-3xl w-fit mx-auto mb-4">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Crop Failure Prediction</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Predict crop failure risks using AI analysis of weather, soil, pests, and market conditions.
        </p>
      </motion.div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Risk Assessment</h2>
          <div className="flex space-x-4">
            <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} className="px-4 py-2 border rounded-2xl">
              <option value="Cotton">Cotton</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Tomato">Tomato</option>
            </select>
            <button onClick={generatePrediction} className="px-6 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600">
              Analyze Risk
            </button>
          </div>
        </div>

        {prediction && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Overall Risk Score */}
            <div className="text-center">
              <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-2xl ${
                getRiskColor(prediction.riskLevel)
              }`}>
                <AlertTriangle className="w-8 h-8" />
                <span>{prediction.riskScore}% Risk - {prediction.riskLevel} Level</span>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(prediction.factors).map(([factor, value]) => (
                <div key={factor} className="bg-gray-50 rounded-2xl p-4 text-center">
                  <h3 className="font-bold text-gray-800 capitalize mb-2">{factor}</h3>
                  <div className="text-2xl font-bold mb-2 text-gray-700">{value}%</div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${
                      value > 70 ? 'bg-red-500' : value > 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`} style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Risk Mitigation Recommendations
                </h3>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-blue-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold text-green-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Preventive Measures
                </h3>
                <ul className="space-y-2">
                  {prediction.preventiveMeasures.map((measure, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CropFailurePrediction;