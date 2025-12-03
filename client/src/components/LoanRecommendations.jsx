import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, CheckCircle, DollarSign, Award, Calculator, User, IndianRupee } from 'lucide-react';

const LoanRecommendations = () => {
  const [formData, setFormData] = useState({
    farmSize: '',
    cropType: '',
    lastYearIncome: '',
    totalExpenses: '',
    pastLoans: '',
    experience: '',
    irrigationType: 'rainfed',
    landOwnership: 'owned',
    householdExpenses: '',
    loanAmount: '',
    previousDefaults: 'no'
  });
  const [creditScore, setCreditScore] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const calculateCreditScore = () => {
    const {
      farmSize, cropType, lastYearIncome, totalExpenses, pastLoans,
      experience, irrigationType, landOwnership, householdExpenses,
      loanAmount, previousDefaults
    } = formData;
    
    // Convert strings to numbers
    const income = parseFloat(lastYearIncome) || 0;
    const expenses = parseFloat(totalExpenses) || 0;
    const size = parseFloat(farmSize) || 0;
    const loans = parseInt(pastLoans) || 0;
    const exp = parseInt(experience) || 0;
    const householdExp = parseFloat(householdExpenses) || 0;
    const reqAmount = parseFloat(loanAmount) || 0;
    const defaults = previousDefaults === 'yes' ? 1 : 0;
    
    // Calculate profit margin
    const profit = income - expenses - householdExp;
    const profitMargin = income > 0 ? (profit / income) * 100 : 0;
    
    // Enhanced scoring formula with multiple factors
    let score = 400; // Base score
    
    // Income factor (25%)
    score += (income / 10000) * 0.25;
    
    // Farm size factor (15%)
    score += (size * 5);
    
    // Profit margin factor (20%)
    score += (profitMargin * 2);
    
    // Experience factor (10%)
    score += (exp * 2);
    
    // Expense ratio factor (15%)
    const expenseRatio = income > 0 ? (expenses / income) * 100 : 100;
    score -= (expenseRatio - 50); // Penalty if expenses > 50% of income
    
    // Crop type bonus
    const cropBonus = {
      'rice': 10, 'wheat': 10, 'cotton': 15, 'sugarcane': 20,
      'maize': 8, 'vegetables': 12, 'fruits': 18, 'pulses': 10, 'oilseeds': 12
    };
    score += cropBonus[cropType] || 0;
    
    // Irrigation bonus
    const irrigationBonus = {
      'rainfed': 0, 'canal': 15, 'borewell': 10, 'drip': 25, 'sprinkler': 20
    };
    score += irrigationBonus[irrigationType] || 0;
    
    // Land ownership bonus
    const ownershipBonus = {
      'owned': 20, 'leased': 0, 'mixed': 10
    };
    score += ownershipBonus[landOwnership] || 0;
    
    // Past loans penalty
    score -= (loans * 8);
    
    // Default penalty
    score -= (defaults * 120);
    
    // Loan to income ratio check
    if (income > 0 && reqAmount > 0) {
      const loanToIncomeRatio = (reqAmount / income) * 100;
      if (loanToIncomeRatio > 200) score -= 50; // High risk
      else if (loanToIncomeRatio > 100) score -= 25; // Medium risk
    }
    
    // Normalize score to 300-850 range
    score = Math.max(300, Math.min(850, score));
    
    setCreditScore(Math.round(score));
    generateRecommendations(Math.round(score), formData);
  };

  const getCreditRating = (score) => {
    if (score >= 700) return { rating: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 600) return { rating: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 500) return { rating: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { rating: 'Low', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const generateRecommendations = (score, data) => {
    const reqAmount = parseFloat(data.loanAmount) || 0;
    const income = parseFloat(data.lastYearIncome) || 0;
    const farmSize = parseFloat(data.farmSize) || 0;
    
    let loans = [];
    let tips = [];
    let emi = 0;
    let eligibilityReasons = [];

    if (score >= 700) {
      // Excellent credit - all loan types available
      loans = [
        {
          name: 'Kisan Credit Card (KCC)',
          rate: '4-7%',
          amount: `₹${Math.min(reqAmount, Math.max(300000, farmSize * 50000)).toLocaleString()}`,
          tenure: '12 months (renewable)',
          bank: 'All Banks',
          processing: '1-2 weeks',
          features: ['No collateral up to ₹1.6L', 'Flexible repayment', 'Multi-purpose use']
        },
        {
          name: 'Term Loan for Agriculture',
          rate: '8-10%',
          amount: `₹${Math.min(reqAmount, 2000000).toLocaleString()}`,
          tenure: '3-7 years',
          bank: 'Nationalized Banks',
          processing: '2-3 weeks',
          features: ['Asset creation', 'Longer tenure', 'Competitive rates']
        },
        {
          name: 'Machinery Purchase Loan',
          rate: '9-12%',
          amount: `₹${Math.min(reqAmount, 1500000).toLocaleString()}`,
          tenure: '5-8 years',
          bank: 'All Banks + NBFCs',
          processing: '1-3 weeks',
          features: ['Up to 85% financing', 'Manufacturer tie-ups', 'Insurance linked']
        }
      ];
      
      // Calculate EMI for average loan amount
      const avgAmount = reqAmount || 200000;
      const monthlyRate = 0.08 / 12; // 8% annual rate
      const tenure = 60; // 5 years
      emi = Math.round((avgAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1));
      
      eligibilityReasons = [
        'Excellent credit score shows financial discipline',
        'Strong income-to-expense ratio',
        'Good farming experience and practices',
        'Eligible for government interest subvention'
      ];
      
    } else if (score >= 600) {
      // Good credit - moderate loan options
      loans = [
        {
          name: 'Crop Loan (Seasonal)',
          rate: '7-9%',
          amount: `₹${Math.min(reqAmount, Math.max(100000, farmSize * 30000)).toLocaleString()}`,
          tenure: '6-12 months',
          bank: 'Cooperative Banks',
          processing: '1-2 weeks',
          features: ['Seasonal financing', 'Crop insurance linked', 'Flexible repayment']
        },
        {
          name: 'Input Purchase Loan',
          rate: '9-11%',
          amount: `₹${Math.min(reqAmount, 150000).toLocaleString()}`,
          tenure: '12-18 months',
          bank: 'Regional Banks',
          processing: '1-2 weeks',
          features: ['Seeds, fertilizers, pesticides', 'Quick processing', 'Dealer network']
        }
      ];
      
      const avgAmount = reqAmount || 100000;
      const monthlyRate = 0.09 / 12;
      const tenure = 12;
      emi = Math.round((avgAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1));
      
      eligibilityReasons = [
        'Good credit score qualifies for standard rates',
        'Farming experience is valuable',
        'Consider improving financial ratios for better terms'
      ];
      
    } else if (score >= 500) {
      // Average credit - limited options
      loans = [
        {
          name: 'Self Help Group (SHG) Loan',
          rate: '6-8%',
          amount: `₹${Math.min(reqAmount, 50000).toLocaleString()}`,
          tenure: '12-24 months',
          bank: 'Cooperative Banks',
          processing: '2-3 weeks',
          features: ['Group guarantee', 'Lower interest', 'Skill development support']
        },
        {
          name: 'Microfinance Loan',
          rate: '12-18%',
          amount: `₹${Math.min(reqAmount, 25000).toLocaleString()}`,
          tenure: '6-18 months',
          bank: 'MFIs',
          processing: '1 week',
          features: ['Quick approval', 'Minimal documentation', 'Doorstep service']
        }
      ];
      
      const avgAmount = reqAmount || 35000;
      emi = Math.round(avgAmount / 18); // Simple calculation for short-term loans
      
      eligibilityReasons = [
        'Average credit score limits loan options',
        'Consider group lending for better rates',
        'Focus on building credit history'
      ];
      
    } else {
      // Low credit - improvement tips
      tips = [
        'Reduce debt-to-income ratio below 40%',
        'Maintain detailed farm records and accounts',
        'Diversify crops to reduce risk and increase income',
        'Invest in water-efficient irrigation systems',
        'Join Farmer Producer Organizations (FPOs) for better market access',
        'Consider organic certification for premium pricing',
        'Maintain consistent banking transactions',
        'Clear any existing defaults or overdue amounts',
        'Start with small loans and build repayment history',
        'Attend financial literacy programs'
      ];
      
      eligibilityReasons = [
        'Credit score needs improvement for formal lending',
        'High risk profile due to financial indicators',
        'Focus on income generation and expense management'
      ];
    }

    setRecommendations({ loans, tips, emi, eligibilityReasons });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-50 to-indigo-50 p-8"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/src/assets/pexels-pixabay-33044.jpg" 
            alt="Agricultural finance" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <div className="p-4 bg-blue-100/90 backdrop-blur-sm rounded-3xl w-fit mx-auto mb-4 shadow-lg">
            <Calculator className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Loan Recommendation + Farm Credit Score</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Get instant credit score calculation and personalized loan recommendations based on your farm data.
          </p>
        </div>
      </motion.div>

      {/* Farm Data Collection Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <User className="w-7 h-7 text-blue-600 mr-3" />
          Enter Your Farm Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Farm Size (in acres)
            </label>
            <input
              type="number"
              placeholder="e.g., 5"
              value={formData.farmSize}
              onChange={(e) => handleInputChange('farmSize', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Primary Crop Type
            </label>
            <select
              value={formData.cropType}
              onChange={(e) => handleInputChange('cropType', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Crop Type</option>
              <option value="rice">Rice</option>
              <option value="wheat">Wheat</option>
              <option value="cotton">Cotton</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="maize">Maize</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="pulses">Pulses</option>
              <option value="oilseeds">Oilseeds</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Year's Income (₹)
            </label>
            <input
              type="number"
              placeholder="e.g., 200000"
              value={formData.lastYearIncome}
              onChange={(e) => handleInputChange('lastYearIncome', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Expenses (₹)
            </label>
            <input
              type="number"
              placeholder="e.g., 150000"
              value={formData.totalExpenses}
              onChange={(e) => handleInputChange('totalExpenses', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Past Loans
            </label>
            <input
              type="number"
              placeholder="e.g., 2"
              value={formData.pastLoans}
              onChange={(e) => handleInputChange('pastLoans', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Years of Farming Experience
            </label>
            <input
              type="number"
              placeholder="e.g., 10"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Irrigation Type
            </label>
            <select
              value={formData.irrigationType}
              onChange={(e) => handleInputChange('irrigationType', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="rainfed">Rain-fed</option>
              <option value="canal">Canal Irrigation</option>
              <option value="borewell">Borewell</option>
              <option value="drip">Drip Irrigation</option>
              <option value="sprinkler">Sprinkler</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Land Ownership
            </label>
            <select
              value={formData.landOwnership}
              onChange={(e) => handleInputChange('landOwnership', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="owned">Own Land</option>
              <option value="leased">Leased Land</option>
              <option value="mixed">Own + Leased</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monthly Household Expenses (₹)
            </label>
            <input
              type="number"
              placeholder="e.g., 15000"
              value={formData.householdExpenses}
              onChange={(e) => handleInputChange('householdExpenses', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Amount Required (₹)
            </label>
            <input
              type="number"
              placeholder="e.g., 100000"
              value={formData.loanAmount}
              onChange={(e) => handleInputChange('loanAmount', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Any Previous Loan Defaults?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="defaults"
                  value="no"
                  checked={formData.previousDefaults === 'no'}
                  onChange={(e) => handleInputChange('previousDefaults', e.target.value)}
                  className="mr-2"
                />
                No
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="defaults"
                  value="yes"
                  checked={formData.previousDefaults === 'yes'}
                  onChange={(e) => handleInputChange('previousDefaults', e.target.value)}
                  className="mr-2"
                />
                Yes
              </label>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <button 
            onClick={calculateCreditScore}
            disabled={!formData.farmSize || !formData.lastYearIncome || !formData.totalExpenses || !formData.experience || !formData.householdExpenses || !formData.loanAmount}
            className="px-8 py-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate Credit Score & Get Recommendations
          </button>
          {(!formData.farmSize || !formData.lastYearIncome || !formData.totalExpenses || !formData.experience || !formData.householdExpenses || !formData.loanAmount) && (
            <p className="text-red-600 text-sm mt-2">Please fill in all required fields</p>
          )}
        </div>
      </motion.div>      {/* Credit Score Results */}
      {creditScore && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-xl"
        >
          <div className={`text-center p-8 rounded-3xl ${getCreditRating(creditScore).bg} border-2 border-gray-200`}>
            <div className="text-6xl font-bold text-gray-800 mb-2">{creditScore}</div>
            <div className={`text-xl font-semibold ${getCreditRating(creditScore).color} mb-2`}>
              {getCreditRating(creditScore).rating}
            </div>
            <p className="text-gray-600">Your Farm Credit Score</p>
          </div>

          {/* Recommended Loans or Tips */}
          <div className="mt-8">
            {recommendations?.loans?.length > 0 ? (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  🎉 Congratulations! You're eligible for these loans:
                </h3>
                <div className="space-y-4">
                  {recommendations.loans.map((loan, index) => (
                    <div key={index} className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-green-800">{loan.name}</h4>
                        <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                          {loan.rate}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-green-600 font-medium">Amount:</span>
                          <div className="font-bold text-green-800 text-lg">{loan.amount}</div>
                        </div>
                        <div>
                          <span className="text-green-600 font-medium">Rate:</span>
                          <div className="font-bold text-green-800">{loan.rate}</div>
                        </div>
                        <div>
                          <span className="text-green-600 font-medium">Tenure:</span>
                          <div className="font-bold text-green-800">{loan.tenure}</div>
                        </div>
                        <div>
                          <span className="text-green-600 font-medium">Processing:</span>
                          <div className="font-bold text-green-800">{loan.processing}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-green-600 font-medium text-sm">Available at:</span>
                        <div className="font-semibold text-green-800">{loan.bank}</div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-green-600 font-medium text-sm">Key Features:</span>
                        <ul className="mt-1 space-y-1">
                          {loan.features.map((feature, idx) => (
                            <li key={idx} className="text-green-700 text-sm flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-md">
                        Apply for {loan.name}
                      </button>
                    </div>
                  ))}
                </div>
                
                {recommendations.emi > 0 && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-2xl">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <IndianRupee className="w-6 h-6 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-800">₹{recommendations.emi.toLocaleString()}/month</span>
                    </div>
                    <p className="text-blue-600">Estimated EMI for average loan</p>
                  </div>
                  
                  <div className="p-6 bg-indigo-50 rounded-2xl">
                    <h4 className="font-bold text-indigo-800 mb-3">Why You Qualify:</h4>
                    <ul className="space-y-2">
                      {recommendations.eligibilityReasons?.map((reason, idx) => (
                        <li key={idx} className="text-indigo-700 text-sm flex items-start">
                          <CheckCircle className="w-4 h-4 text-indigo-500 mr-2 mt-0.5 shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                )}
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  💡 Tips to Improve Your Credit Score
                </h3>
                <div className="space-y-3">
                  {recommendations?.tips?.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-yellow-50 rounded-2xl p-4">
                      <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <span className="text-yellow-800 font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-yellow-800 font-medium">{tip}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center p-6 bg-orange-50 rounded-2xl">
                  <p className="text-orange-800 font-semibold">
                    💪 Work on these areas and check your score again in 3-6 months!
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Disclaimer and Next Steps */}
      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Next Steps & Important Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">How to Apply:</h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                Visit your nearest bank branch with documents
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                Fill out the loan application form
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                Submit required documents for verification
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                Wait for credit appraisal and approval
              </li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">💡 Pro Tips:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                Apply during the sowing season for faster approval
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                Maintain regular banking transactions
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                Get crop insurance for better loan terms
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                Consider multiple banks for best rates
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This is an indicative credit score and loan recommendations. 
            Actual loan approval depends on bank's credit policy, documentation, and other factors. 
            Interest rates are subject to change and may vary by bank and borrower profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanRecommendations;