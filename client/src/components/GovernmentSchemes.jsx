import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import { assets } from '../assets';

const GovernmentSchemes = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="p-4 bg-rose-100 rounded-3xl w-fit mx-auto mb-4">
          <Award className="w-12 h-12 text-rose-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Government Schemes & Subsidies</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and apply for government schemes, subsidies, and benefits tailored for your farm.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.schemes.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            onClick={() => setSelectedScheme(scheme)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">{scheme.name}</h3>
              <div className={`p-2 rounded-xl ${
                scheme.status === 'Eligible' ? 'bg-green-100' :
                scheme.status === 'Applied' ? 'bg-blue-100' : 'bg-yellow-100'
              }`}>
                {scheme.status === 'Eligible' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                 scheme.status === 'Applied' ? <Clock className="w-5 h-5 text-blue-600" /> :
                 <AlertCircle className="w-5 h-5 text-yellow-600" />}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{scheme.description}</p>
            
            <div className="space-y-2">
              <div className="bg-green-50 rounded-xl p-3">
                <span className="text-green-800 font-semibold text-sm">Benefits: </span>
                <span className="text-green-700 text-sm">{scheme.benefits}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Deadline:</span>
                <span className="font-semibold">{scheme.applicationDeadline}</span>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${
                scheme.status === 'Eligible' ? 'bg-green-100 text-green-700' :
                scheme.status === 'Applied' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {scheme.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedScheme && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{selectedScheme.name}</h2>
            <button onClick={() => setSelectedScheme(null)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 mb-3">Scheme Details</h3>
                <p className="text-blue-700 text-sm leading-relaxed">{selectedScheme.description}</p>
                <div className="mt-4 p-3 bg-blue-100 rounded-xl">
                  <span className="font-semibold text-blue-800">Benefits: </span>
                  <span className="text-blue-700">{selectedScheme.benefits}</span>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold text-green-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Eligibility Criteria
                </h3>
                <p className="text-green-700 text-sm">{selectedScheme.eligibility}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-2xl p-6">
                <h3 className="font-bold text-yellow-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Required Documents
                </h3>
                <ul className="space-y-2">
                  {selectedScheme.documents.map((doc, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-yellow-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="font-bold text-red-800 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Important Dates
                </h3>
                <div className="text-sm text-red-700">
                  Application Deadline: <span className="font-semibold">{selectedScheme.applicationDeadline}</span>
                </div>
              </div>
              
              <button className="w-full py-4 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:from-rose-600 hover:to-pink-600 transition-all">
                Apply for Scheme
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GovernmentSchemes;