import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, TrendingUp, Droplets, CheckCircle, Star } from 'lucide-react';
import { assets } from '../assets';

const CropRotationOptimizer = () => {
  const [selectedRotation, setSelectedRotation] = useState(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center relative overflow-hidden rounded-3xl bg-linear-to-r from-violet-50 to-purple-50 p-8"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/src/assets/pexels-pixabay-259280.jpg" 
            alt="Crop rotation" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <div className="p-4 bg-violet-100/90 backdrop-blur-sm rounded-3xl w-fit mx-auto mb-4 shadow-lg">
            <RotateCcw className="w-12 h-12 text-violet-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Crop Rotation Optimizer</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Optimize your crop rotation cycles for maximum profitability, soil health, and sustainable farming.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.rotationPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden group"
          >
            {/* Subtle background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
              <img 
                src="/src/assets/pexels-nc-farm-bureau-mark-2749165.jpg" 
                alt="Rotation pattern" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="relative z-10"
            onClick={() => setSelectedRotation(plan)}>
            </div>
            {index === 0 && (
              <div className="flex items-center justify-center mb-4">
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>RECOMMENDED</span>
                </div>
              </div>
            )}
            
            <h3 className="text-xl font-bold text-gray-800 mb-3">{plan.name}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{plan.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Projected Profit:</span>
                <span className="font-semibold text-green-600">{plan.projectedProfit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Water Requirement:</span>
                <span className={`font-semibold ${
                  plan.waterRequirement === 'High' ? 'text-blue-600' :
                  plan.waterRequirement === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {plan.waterRequirement}
                </span>
              </div>
            </div>
            
            <div className="bg-violet-50 rounded-2xl p-4 mb-4">
              <h4 className="font-semibold text-violet-800 mb-2">Crop Sequence:</h4>
              <div className="flex items-center space-x-2">
                {plan.crops.map((crop, cropIndex) => (
                  <React.Fragment key={cropIndex}>
                    <span className="bg-violet-200 text-violet-800 px-2 py-1 rounded-lg text-xs font-semibold">
                      {crop}
                    </span>
                    {cropIndex < plan.crops.length - 1 && (
                      <RotateCcw className="w-3 h-3 text-violet-600" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Soil Benefits:
              </h4>
              <p className="text-sm text-green-700">{plan.soilBenefits}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedRotation && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{selectedRotation.name}</h2>
            <button onClick={() => setSelectedRotation(null)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-violet-50 rounded-2xl p-6">
                <h3 className="font-bold text-violet-800 mb-4">Rotation Timeline</h3>
                <div className="space-y-4">
                  {selectedRotation.crops.map((crop, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center font-bold text-violet-800">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-violet-800">{crop}</div>
                        <div className="text-sm text-violet-600">{selectedRotation.seasons[index]} Season</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold text-green-800 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Financial Benefits
                </h3>
                <div className="text-2xl font-bold text-green-700 mb-2">{selectedRotation.projectedProfit}</div>
                <p className="text-sm text-green-600">Expected profit over {selectedRotation.duration}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                  <Droplets className="w-5 h-5 mr-2" />
                  Resource Requirements
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600">Water Requirement:</span>
                    <span className="font-semibold text-blue-800">{selectedRotation.waterRequirement}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600">Duration:</span>
                    <span className="font-semibold text-blue-800">{selectedRotation.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="font-bold text-amber-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Soil Health Benefits
                </h3>
                <p className="text-sm text-amber-700 leading-relaxed">{selectedRotation.soilBenefits}</p>
              </div>
              
              <button className="w-full py-4 bg-linear-to-r from-violet-500 to-purple-500 text-white rounded-2xl font-semibold text-lg hover:from-violet-600 hover:to-purple-600 transition-all">
                Implement Rotation Plan
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CropRotationOptimizer;