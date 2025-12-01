import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Camera, Image, AlertTriangle, CheckCircle, 
  Clock, Target, Zap, Activity, FileImage, X
} from 'lucide-react';
import { aiHelpers } from '../assets';

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFiles = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const result = aiHelpers.detectDisease(selectedImage);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview('');
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-700 bg-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 bg-red-100 rounded-3xl">
            <Activity className="w-12 h-12 text-red-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI Crop Disease Detection
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload an image of your crop to get instant AI-powered disease analysis, 
          treatment recommendations, and prevention strategies.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Image Upload Area */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Upload className="w-7 h-7 text-blue-600 mr-3" />
              Upload Crop Image
            </h2>
            
            <div
              className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : selectedImage 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-64 mx-auto rounded-2xl shadow-lg"
                  />
                  <div className="flex items-center justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetAnalysis}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Remove</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Analyze Disease</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="mx-auto">
                    <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Drop your image here
                    </h3>
                    <p className="text-gray-500 mb-6">
                      or click to select from your device
                    </p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold cursor-pointer hover:from-green-600 hover:to-emerald-600 transition-all flex items-center space-x-2"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Choose File</span>
                      </motion.div>
                    </label>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Take Photo</span>
                    </motion.button>
                  </div>
                  
                  <p className="text-sm text-gray-400">
                    Supported formats: JPG, PNG, WebP (Max: 10MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-linear-to-br from-amber-50 to-yellow-100 rounded-3xl p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              Photography Tips
            </h3>
            <div className="space-y-3 text-sm text-amber-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <span>Take clear, well-lit photos of affected plant parts</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <span>Focus on leaves, stems, or fruits showing symptoms</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <span>Include healthy parts for better comparison</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <span>Avoid shadows and blurry images</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-200 shadow-xl text-center"
              >
                <div className="animate-pulse space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                    <Activity className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">AI Analysis in Progress</h3>
                  <p className="text-blue-600">
                    Our advanced AI is analyzing your crop image...
                  </p>
                  <div className="w-64 bg-blue-100 rounded-full h-2 mx-auto">
                    <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Disease Identification */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <AlertTriangle className="w-7 h-7 text-red-600 mr-3" />
                      Disease Detected
                    </h3>
                    <div className={`px-4 py-2 rounded-2xl font-semibold text-sm ${getSeverityColor(analysisResult.severity)}`}>
                      {analysisResult.severity} Severity
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-red-800 mb-2">{analysisResult.name}</h4>
                      <p className="text-red-700 mb-4">Crop: {analysisResult.crop}</p>
                      <div className="flex items-center space-x-4 text-sm text-red-600">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Confidence: {analysisResult.confidence}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Recovery: {analysisResult.recoveryTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Symptoms */}
                      <div className="bg-yellow-50 rounded-2xl p-6">
                        <h5 className="font-bold text-yellow-800 mb-3 flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          Symptoms
                        </h5>
                        <ul className="space-y-2">
                          {analysisResult.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-yellow-700">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Treatment */}
                      <div className="bg-green-50 rounded-2xl p-6">
                        <h5 className="font-bold text-green-800 mb-3 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Treatment
                        </h5>
                        <p className="text-sm text-green-700 leading-relaxed">
                          {analysisResult.treatment}
                        </p>
                      </div>
                    </div>

                    {/* Prevention */}
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h5 className="font-bold text-blue-800 mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Prevention
                      </h5>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        {analysisResult.prevention}
                      </p>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-purple-50 rounded-2xl p-6">
                      <h5 className="font-bold text-purple-800 mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        AI Recommendations
                      </h5>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-purple-700">
                            <CheckCircle className="w-4 h-4 mt-0.5 text-purple-500" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center space-x-2"
                  >
                    <Image className="w-5 h-5" />
                    <span>Analyze Another Image</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center space-x-2"
                  >
                    <Clock className="w-5 h-5" />
                    <span>Track Treatment Progress</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* When no analysis is happening */}
          {!selectedImage && !analysisResult && !isAnalyzing && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <Activity className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Ready for Disease Detection
              </h3>
              <p className="text-gray-600 mb-6">
                Upload an image of your crop to get started with AI-powered disease analysis
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl mx-auto flex items-center justify-center">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Instant Analysis</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl mx-auto flex items-center justify-center">
                    <Target className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Accurate Detection</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl mx-auto flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Treatment Plan</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DiseaseDetection;