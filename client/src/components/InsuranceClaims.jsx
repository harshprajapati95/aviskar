import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, FileText, CheckCircle, Clock, AlertTriangle, Camera, Leaf, AlertCircle, Send } from 'lucide-react';
import { assets, aiHelpers } from '../assets';

const InsuranceClaims = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [claimForm, setClaimForm] = useState({
    cropType: '',
    areaAffected: '',
    damageDescription: '',
    farmerName: '',
    phoneNumber: '',
    farmLocation: '',
    dateOfDamage: ''
  });
  const [claimAnalysis, setClaimAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [claimId, setClaimId] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    const imageUrls = imageFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setSelectedImages(imageUrls);
  };

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const handleFormChange = (field, value) => {
    setClaimForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeClaim = () => {
    if (selectedImages.length === 0 || !claimForm.cropType) {
      alert('Please upload at least one image and select crop type');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Enhanced AI damage detection simulation
    setTimeout(() => {
      const analysis = simulateAIDamageDetection(selectedImages, claimForm.cropType);
      setClaimAnalysis(analysis);
      
      // Auto-fill form based on AI analysis
      if (analysis.autoFillSuggestions) {
        setClaimForm(prev => ({
          ...prev,
          damageDescription: analysis.autoFillSuggestions.description,
          areaAffected: analysis.autoFillSuggestions.estimatedArea
        }));
      }
      
      setIsAnalyzing(false);
    }, 3000);
  };

  const simulateAIDamageDetection = (images, cropType) => {
    // Simulate different damage types based on crop type
    const damageTypes = {
      'rice': ['Blast Disease', 'Brown Spot', 'Bacterial Leaf Blight'],
      'wheat': ['Rust Disease', 'Powdery Mildew', 'Septoria Leaf Spot'],
      'cotton': ['Bollworm Damage', 'Leaf Curl Virus', 'Bacterial Blight'],
      'sugarcane': ['Red Rot', 'Smut Disease', 'Grassy Shoot'],
      'maize': ['Leaf Blight', 'Stem Borer', 'Fall Armyworm']
    };
    
    const cropDamages = damageTypes[cropType.toLowerCase()] || ['General Crop Damage', 'Pest Attack', 'Disease Infection'];
    const selectedDamage = cropDamages[Math.floor(Math.random() * cropDamages.length)];
    const damagePercentage = Math.floor(Math.random() * 60) + 20; // 20-80% damage
    const affectedArea = Math.floor(Math.random() * 5) + 1; // 1-6 acres
    const severity = damagePercentage > 60 ? 'Severe' : damagePercentage > 35 ? 'Moderate' : 'Mild';
    
    const claimAmount = calculateClaimAmount(cropType, damagePercentage, affectedArea);
    
    return {
      damageAssessment: {
        damageType: selectedDamage,
        severity: severity,
        damagePercent: damagePercentage,
        affectedArea: affectedArea,
        confidence: Math.floor(Math.random() * 15) + 85 // 85-100% confidence
      },
      eligibility: {
        eligible: damagePercentage >= 15, // Minimum 15% damage for eligibility
        reason: damagePercentage >= 15 ? 
          `Damage exceeds minimum threshold (${damagePercentage}% > 15%)` : 
          `Damage below minimum threshold (${damagePercentage}% < 15%)`
      },
      claimDetails: {
        estimatedAmount: `₹${claimAmount.toLocaleString()}`,
        processingTime: '7-14 days',
        claimType: 'Crop Loss Insurance'
      },
      autoFillSuggestions: {
        description: `${selectedDamage} detected in ${cropType} crop causing ${severity.toLowerCase()} damage. Affected plants show typical symptoms consistent with ${selectedDamage.toLowerCase()}.`,
        estimatedArea: affectedArea.toString()
      },
      aiInsights: {
        recommendations: [
          'Consider applying organic fungicide for prevention',
          'Improve drainage to prevent waterlogging',
          'Use disease-resistant varieties in next season'
        ],
        preventiveMeasures: [
          'Regular crop monitoring',
          'Proper spacing between plants',
          'Timely application of fertilizers'
        ]
      }
    };
  };

  const calculateClaimAmount = (cropType, damagePercent, area) => {
    const baseCostPerAcre = {
      'rice': 25000,
      'wheat': 20000,
      'cotton': 35000,
      'sugarcane': 45000,
      'maize': 18000
    };
    
    const costPerAcre = baseCostPerAcre[cropType.toLowerCase()] || 22000;
    const totalLoss = costPerAcre * area * (damagePercent / 100);
    const insuranceCoverage = 0.8; // 80% coverage
    
    return Math.floor(totalLoss * insuranceCoverage);
  };

  const submitClaim = () => {
    if (!claimForm.farmerName || !claimForm.phoneNumber || !claimForm.farmLocation) {
      alert('Please fill in all required personal details');
      return;
    }
    
    // Generate unique claim ID
    const newClaimId = 'CIC-' + Date.now().toString().slice(-8);
    
    // Simulate claim submission
    const claimData = {
      claimId: newClaimId,
      ...claimForm,
      images: selectedImages,
      damageAnalysis: claimAnalysis,
      submissionDate: new Date().toISOString(),
      status: 'Submitted',
      estimatedAmount: claimAnalysis?.claimDetails?.estimatedAmount
    };
    
    // In real implementation, this would be sent to backend
    console.log('Claim submitted:', claimData);
    
    setClaimId(newClaimId);
    setClaimSubmitted(true);
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

      {!claimSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📸 Upload Damage Photos</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center mb-6">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Drop damage photos here</h3>
              <p className="text-gray-500 mb-6">Upload up to 5 images (JPG, PNG)</p>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden" 
                id="damage-upload" 
              />
              <label htmlFor="damage-upload" className="px-6 py-3 bg-teal-500 text-white rounded-2xl font-semibold cursor-pointer hover:bg-teal-600 transition-colors inline-block">
                Choose Files
              </label>
            </div>
            
            {/* Image Preview */}
            {selectedImages.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">Selected Images ({selectedImages.length}/5):</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image.url} 
                        alt={`Damage ${index + 1}`}
                        className="w-full h-24 object-cover rounded-2xl border-2 border-gray-200"
                      />
                      <button 
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-2xl truncate">
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Crop Selection */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🌾 Crop Type *
              </label>
              <select 
                value={claimForm.cropType}
                onChange={(e) => handleFormChange('cropType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select Crop Type</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="cotton">Cotton</option>
                <option value="sugarcane">Sugarcane</option>
                <option value="maize">Maize</option>
                <option value="vegetables">Vegetables</option>
                <option value="pulses">Pulses</option>
                <option value="oilseeds">Oilseeds</option>
              </select>
            </div>
            
            {selectedImages.length > 0 && claimForm.cropType && (
              <button 
                onClick={analyzeClaim} 
                disabled={isAnalyzing} 
                className="w-full mt-6 px-6 py-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold disabled:opacity-50 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>🤖 AI Analyzing Damage...</span>
                  </div>
                ) : (
                  '🔍 Analyze Crop Damage with AI'
                )}
              </button>
            )}
          </div>

          {/* Claim Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Claim Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 Farmer Name *
                  </label>
                  <input 
                    type="text"
                    value={claimForm.farmerName}
                    onChange={(e) => handleFormChange('farmerName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📱 Phone Number *
                  </label>
                  <input 
                    type="tel"
                    value={claimForm.phoneNumber}
                    onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 Farm Location *
                </label>
                <input 
                  type="text"
                  value={claimForm.farmLocation}
                  onChange={(e) => handleFormChange('farmLocation', e.target.value)}
                  placeholder="Village, District, State"
                  className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Date of Damage
                  </label>
                  <input 
                    type="date"
                    value={claimForm.dateOfDamage}
                    onChange={(e) => handleFormChange('dateOfDamage', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📐 Area Affected (acres)
                  </label>
                  <input 
                    type="number"
                    step="0.1"
                    value={claimForm.areaAffected}
                    onChange={(e) => handleFormChange('areaAffected', e.target.value)}
                    placeholder="e.g., 2.5"
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📝 Damage Description
                </label>
                <textarea 
                  value={claimForm.damageDescription}
                  onChange={(e) => handleFormChange('damageDescription', e.target.value)}
                  placeholder="Describe the damage in detail (this will be auto-filled after AI analysis)"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              {claimAnalysis && (
                <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">AI Analysis Complete</span>
                  </div>
                  <p className="text-green-700 text-sm">Form has been auto-filled based on damage analysis. Review and modify if needed.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Claim Submission Success */
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-green-100 shadow-xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-green-800 mb-4">🎉 Claim Submitted Successfully!</h2>
            <p className="text-xl text-gray-600 mb-6">Your insurance claim has been submitted and is under review.</p>
            
            <div className="bg-green-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-green-800 mb-4">📋 Claim Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div><span className="font-semibold text-green-700">Claim ID:</span> <span className="font-mono bg-green-200 px-2 py-1 rounded">{claimId}</span></div>
                <div><span className="font-semibold text-green-700">Status:</span> <span className="text-blue-600 font-semibold">Under Review</span></div>
                <div><span className="font-semibold text-green-700">Estimated Amount:</span> <span className="font-semibold">{claimAnalysis?.claimDetails?.estimatedAmount}</span></div>
                <div><span className="font-semibold text-green-700">Processing Time:</span> <span className="font-semibold">{claimAnalysis?.claimDetails?.processingTime}</span></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setClaimSubmitted(false);
                  setClaimAnalysis(null);
                  setSelectedImages([]);
                  setClaimForm({
                    cropType: '',
                    areaAffected: '',
                    damageDescription: '',
                    farmerName: '',
                    phoneNumber: '',
                    farmLocation: '',
                    dateOfDamage: ''
                  });
                }}
                className="px-8 py-3 bg-linear-to-r from-teal-500 to-green-600 text-white rounded-2xl font-semibold hover:from-teal-600 hover:to-green-700 transition-all shadow-lg"
              >
                Submit Another Claim
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
              <p className="text-blue-800 text-sm">
                <strong>📞 Need Help?</strong> Contact our support team at 1800-XXX-XXXX or visit your nearest branch for updates on your claim.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Active Policies */}
      {!claimSubmitted && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Your Insurance Policies</h2>
          <div className="space-y-4">
            {assets?.insurance?.policies?.map((policy, index) => (
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
            )) || (
              <div className="text-center py-8 text-gray-500">
                <Shield className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No active insurance policies found.</p>
                <p className="text-sm">Contact your insurance provider to activate policies.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced AI Analysis Results */}
      {claimAnalysis && !claimSubmitted && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🤖 AI Damage Assessment Report</h2>
          
          {/* Main Assessment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-3xl p-6 border border-red-200">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="font-bold text-red-800 text-lg">🔍 Damage Analysis</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-red-600 font-medium">Type:</span>
                  <span className="font-bold text-red-800">{claimAnalysis.damageAssessment.damageType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 font-medium">Severity:</span>
                  <span className={`font-bold px-2 py-1 rounded-full text-xs ${
                    claimAnalysis.damageAssessment.severity === 'Severe' ? 'bg-red-200 text-red-800' :
                    claimAnalysis.damageAssessment.severity === 'Moderate' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>{claimAnalysis.damageAssessment.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 font-medium">Damage:</span>
                  <span className="font-bold text-red-800 text-xl">{claimAnalysis.damageAssessment.damagePercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 font-medium">Area:</span>
                  <span className="font-bold text-red-800">{claimAnalysis.damageAssessment.affectedArea} acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 font-medium">AI Confidence:</span>
                  <span className="font-bold text-red-800">{claimAnalysis.damageAssessment.confidence}%</span>
                </div>
              </div>
              
              {/* Progress bar for damage percentage */}
              <div className="mt-4">
                <div className="w-full bg-red-200 rounded-full h-3">
                  <div 
                    className="bg-linear-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${claimAnalysis.damageAssessment.damagePercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-200">
              <div className="flex items-center space-x-2 mb-4">
                {claimAnalysis.eligibility.eligible ? 
                  <CheckCircle className="w-6 h-6 text-green-600" /> : 
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                }
                <h3 className="font-bold text-blue-800 text-lg">✅ Eligibility Status</h3>
              </div>
              <div className="text-center mb-4">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-2xl font-bold text-lg ${
                  claimAnalysis.eligibility.eligible ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}>
                  <span>{claimAnalysis.eligibility.eligible ? '✅ ELIGIBLE' : '❌ NOT ELIGIBLE'}</span>
                </div>
              </div>
              <p className="text-sm text-blue-700 leading-relaxed">{claimAnalysis.eligibility.reason}</p>
              
              {claimAnalysis.eligibility.eligible && (
                <div className="mt-4 p-3 bg-green-100 rounded-2xl">
                  <p className="text-green-800 text-sm font-semibold">🎉 Great! You qualify for insurance compensation.</p>
                </div>
              )}
            </div>
            
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-200">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-green-800 text-lg">💰 Claim Details</h3>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-green-600 font-medium text-sm">Estimated Compensation</p>
                  <p className="font-bold text-green-800 text-3xl">{claimAnalysis.claimDetails.estimatedAmount}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">Processing:</span>
                  <span className="font-bold text-green-800">{claimAnalysis.claimDetails.processingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">Claim Type:</span>
                  <span className="font-bold text-green-800 text-sm">{claimAnalysis.claimDetails.claimType}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Insights and Recommendations */}
          {claimAnalysis.aiInsights && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 rounded-3xl p-6 border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-4 flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  🌱 Treatment Recommendations
                </h4>
                <ul className="space-y-2">
                  {claimAnalysis.aiInsights.recommendations.map((rec, index) => (
                    <li key={index} className="text-purple-700 text-sm flex items-start">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-200">
                <h4 className="font-bold text-indigo-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  🛡️ Prevention Tips
                </h4>
                <ul className="space-y-2">
                  {claimAnalysis.aiInsights.preventiveMeasures.map((measure, index) => (
                    <li key={index} className="text-indigo-700 text-sm flex items-start">
                      <CheckCircle className="w-4 h-4 text-indigo-500 mr-2 mt-0.5 shrink-0" />
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Submit Claim Button */}
          {claimAnalysis.eligibility.eligible && (
            <div className="text-center">
              <button 
                onClick={submitClaim}
                className="px-12 py-4 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-3xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <Send className="w-6 h-6" />
                  <span>🚀 Submit Insurance Claim</span>
                </div>
              </button>
              <p className="text-gray-600 text-sm mt-3">Click to submit your claim for review and processing</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default InsuranceClaims;