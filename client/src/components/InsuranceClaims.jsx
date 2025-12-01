import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { assets, aiHelpers } from '../assets';

const InsuranceClaims = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [claimAnalysis, setClaimAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeClaim = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = aiHelpers.analyzeInsuranceClaim([selectedImage], 'Cotton');
      setClaimAnalysis(analysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="p-4 bg-teal-100 rounded-3xl w-fit mx-auto mb-4">
          <Shield className="w-12 h-12 text-teal-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Insurance Claims</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload crop damage photos for instant AI analysis, automatic claim form filling, and eligibility verification.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Damage Photos</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Drop damage photos here</h3>
            <p className="text-gray-500 mb-6">or click to select from device</p>
            <input type="file" multiple accept="image/*" className="hidden" id="damage-upload" />
            <label htmlFor="damage-upload" className="px-6 py-3 bg-teal-500 text-white rounded-2xl font-semibold cursor-pointer hover:bg-teal-600 transition-colors inline-block">
              Choose Files
            </label>
          </div>
          {selectedImage && (
            <button onClick={analyzeClaim} disabled={isAnalyzing} className="w-full mt-6 px-6 py-3 bg-blue-500 text-white rounded-2xl font-semibold disabled:opacity-50">
              {isAnalyzing ? 'Analyzing...' : 'Analyze Damage'}
            </button>
          )}
        </div>

        {/* Active Policies */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Insurance Policies</h2>
          <div className="space-y-4">
            {assets.insurance.policies.map((policy, index) => (
              <div key={index} className="bg-green-50 rounded-2xl p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-green-800">{policy.name}</h3>
                  <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-green-600">Crop:</span> <span className="font-semibold">{policy.crop}</span></div>
                  <div><span className="text-green-600">Coverage:</span> <span className="font-semibold">{policy.coverage}</span></div>
                  <div><span className="text-green-600">Premium:</span> <span className="font-semibold">{policy.premium}</span></div>
                  <div><span className="text-green-600">Valid Till:</span> <span className="font-semibold">{policy.validTill}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Claim Analysis Results */}
      {claimAnalysis && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Damage Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-2xl p-6">
              <h3 className="font-bold text-red-800 mb-2">Damage Analysis</h3>
              <div className="space-y-2 text-sm">
                <div>Type: <span className="font-semibold">{claimAnalysis.damageAssessment.damageType}</span></div>
                <div>Severity: <span className="font-semibold">{claimAnalysis.damageAssessment.severity}</span></div>
                <div>Damage: <span className="font-semibold">{claimAnalysis.damageAssessment.damagePercent}%</span></div>
                <div>Area: <span className="font-semibold">{claimAnalysis.damageAssessment.affectedArea} acres</span></div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">Eligibility Status</h3>
              <div className="flex items-center space-x-2 mb-2">
                {claimAnalysis.eligibility.eligible ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-red-600" />}
                <span className={`font-semibold ${claimAnalysis.eligibility.eligible ? 'text-green-600' : 'text-red-600'}`}>
                  {claimAnalysis.eligibility.eligible ? 'Eligible' : 'Not Eligible'}
                </span>
              </div>
              <p className="text-sm text-blue-700">{claimAnalysis.eligibility.reason}</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-bold text-green-800 mb-2">Claim Details</h3>
              <div className="space-y-2 text-sm">
                <div>Estimated Amount: <span className="font-semibold">{claimAnalysis.claimDetails.estimatedAmount}</span></div>
                <div>Processing Time: <span className="font-semibold">{claimAnalysis.claimDetails.processingTime}</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InsuranceClaims;