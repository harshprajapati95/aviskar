import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Sprout, Droplets, Award,
  BarChart3, Calendar, Settings, Edit3
} from 'lucide-react';
import { assets } from '../assets';

const FarmProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(assets.farmProfile);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 bg-purple-100 rounded-3xl">
            <User className="w-12 h-12 text-purple-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Farm Profile Management
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your farm information, track historical data, and optimize
          your agricultural operations with detailed insights.
        </p>
      </motion.div>

      {/* Profile Overview */}
      <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{profile.name}</h2>
              <p className="text-green-100">Farmer ID: {profile.farmerId}</p>
              <div className="flex items-center space-x-2 mt-2">
                <MapPin className="w-4 h-4" />
                <span className="text-green-100">{profile.location}</span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 hover:bg-white/30 rounded-2xl p-3 transition-colors"
          >
            <Edit3 className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{profile.farmSize}</div>
            <div className="text-green-100">Acres</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{profile.pastCrops.length}</div>
            <div className="text-green-100">Crop Seasons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{profile.equipment.length}</div>
            <div className="text-green-100">Equipment</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{profile.certifications.length}</div>
            <div className="text-green-100">Certifications</div>
          </div>
        </div>
      </div>

      {/* Farm Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Settings className="w-6 h-6 text-gray-600 mr-3" />
            Farm Details
          </h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Soil Type</h4>
              <p className="text-blue-700">{profile.soilType}</p>
            </div>
            
            <div className="bg-cyan-50 rounded-2xl p-4">
              <h4 className="font-semibold text-cyan-800 mb-2 flex items-center">
                <Droplets className="w-4 h-4 mr-2" />
                Irrigation System
              </h4>
              <p className="text-cyan-700">{profile.irrigationType}</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Equipment & Assets</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {profile.equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-200"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-semibold text-purple-800">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Data */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 text-green-600 mr-3" />
          Crop History & Performance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.pastCrops.map((crop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-green-800">{crop.crop}</h4>
                <div className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">
                  {crop.season}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Year:</span>
                  <span className="font-semibold text-green-800">{crop.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Yield:</span>
                  <span className="font-semibold text-green-800">{crop.yield}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Profit:</span>
                  <span className="font-semibold text-green-800">{crop.profit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fertilizer Usage */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Sprout className="w-6 h-6 text-yellow-600 mr-3" />
          Fertilizer Usage Pattern
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.fertilizerUsage.map((fertilizer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200"
            >
              <h4 className="text-lg font-bold text-yellow-800 mb-4">{fertilizer.type}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600">Quantity:</span>
                  <span className="font-semibold text-yellow-800">{fertilizer.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600">Cost:</span>
                  <span className="font-semibold text-yellow-800">{fertilizer.cost}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmProfile;