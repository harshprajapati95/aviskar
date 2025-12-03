import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, CheckCircle, DollarSign, Award } from 'lucide-react';
import { assets, aiHelpers } from '../assets';

const LoanRecommendations = () => {
  const [recommendations, setRecommendations] = useState(null);

  const getLoanRecommendations = () => {
    const recs = aiHelpers.recommendLoans(assets.farmProfile, assets.loans.creditScore);
    setRecommendations(recs);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center relative overflow-hidden rounded-3xl bg-linear-to-r from-yellow-50 to-orange-50 p-8"
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
          <div className="p-4 bg-yellow-100/90 backdrop-blur-sm rounded-3xl w-fit mx-auto mb-4 shadow-lg">
            <CreditCard className="w-12 h-12 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Agricultural Loan Assistant</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Find the best agricultural loans, government schemes, and financial assistance for your farming needs.
          </p>
        </div>
      </motion.div>

      {/* Credit Score */}
      <div className="bg-linear-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Digital Credit Score</h2>
            <p className="text-yellow-100">Based on farm performance, payment history, and agricultural practices</p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{assets.loans.creditScore}</div>
            <div className="text-yellow-100">Excellent</div>
          </div>
        </div>
        <div className="mt-6 bg-white/20 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span>Credit Utilization</span>
            <span>Good</span>
          </div>
          <div className="bg-white/30 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
      </div>

      {/* Active Loans */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Loans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assets.loans.active.map((loan, index) => (
            <div key={index} className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-800">{loan.type}</h3>
                <span className="text-2xl font-bold text-blue-600">{loan.amount}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-blue-600">Interest:</span> <span className="font-semibold">{loan.interestRate}</span></div>
                <div><span className="text-blue-600">Tenure:</span> <span className="font-semibold">{loan.tenure}</span></div>
                <div><span className="text-blue-600">EMI:</span> <span className="font-semibold">{loan.emi}</span></div>
                <div><span className="text-blue-600">Outstanding:</span> <span className="font-semibold">{loan.outstanding}</span></div>
              </div>
              <div className="mt-4 text-sm text-blue-700">
                Next Due: <span className="font-semibold">{loan.nextDueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loan Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Crop Loans */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
        >
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🌾</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Crop Loans (KCC)</h3>
            <p className="text-gray-600 text-sm">Short-term credit for crop cultivation</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-semibold text-green-600">7% - 9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Amount:</span>
              <span className="font-semibold">₹3 Lakh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Repayment:</span>
              <span className="font-semibold">After harvest</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
            Apply for KCC
          </button>
        </motion.div>

        {/* Equipment Loans */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-blue-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
        >
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🚜</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Equipment Loans</h3>
            <p className="text-gray-600 text-sm">For tractors, harvesters & farm equipment</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-semibold text-blue-600">8.5% - 12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Amount:</span>
              <span className="font-semibold">₹25 Lakh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tenure:</span>
              <span className="font-semibold">5-7 years</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
            Check Eligibility
          </button>
        </motion.div>

        {/* Land Development */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-purple-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
        >
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Land Development</h3>
            <p className="text-gray-600 text-sm">For irrigation, land leveling & infrastructure</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-semibold text-purple-600">8% - 11%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Amount:</span>
              <span className="font-semibold">₹10 Lakh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tenure:</span>
              <span className="font-semibold">7-10 years</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
            Get Details
          </button>
        </motion.div>
      </div>

      {/* Government Schemes */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-orange-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Award className="w-7 h-7 text-orange-600 mr-3" />
          Government Schemes & Subsidies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-orange-800 mb-2">PM-KISAN Scheme</h3>
            <p className="text-orange-700 text-sm mb-3">₹6,000 per year in 3 installments for all farmers</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-orange-600">Benefit:</span>
                <span className="font-semibold">₹2,000 x 3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-600">Eligibility:</span>
                <span className="font-semibold">All farmers</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors">
              Check Status
            </button>
          </div>
          
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-green-800 mb-2">Interest Subvention</h3>
            <p className="text-green-700 text-sm mb-3">3% interest subvention on crop loans up to ₹3 lakh</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-600">Effective Rate:</span>
                <span className="font-semibold">4% (after subvention)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Additional:</span>
                <span className="font-semibold">2% prompt repayment</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Get Personalized Recommendations */}
      <div className="text-center">
        <button onClick={getLoanRecommendations} className="px-8 py-4 bg-linear-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg">
          Get Personalized Loan Recommendations
        </button>
        <p className="text-gray-600 mt-2 text-sm">Based on your farm size, crop type, and financial profile</p>
      </div>

      {/* Required Documents */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-blue-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Documents Required for Agricultural Loans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-800 mb-3">Identity & Address Proof</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Aadhaar Card</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Voter ID</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Passport (if available)</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Utility Bills</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-800 mb-3">Land & Agricultural Proof</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Land Records (7/12, 8A)</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Revenue Records</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Cultivation Certificate</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Patta/Title Deed</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-800 mb-3">Financial Documents</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Bank Statements (6 months)</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Income Certificate</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Previous Loan Documents</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />PAN Card</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips for Loan Approval */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tips to Improve Loan Approval Chances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Maintain Good Credit History</h3>
                <p className="text-gray-600 text-sm">Repay existing loans on time and maintain a good credit score</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Keep Land Records Updated</h3>
                <p className="text-gray-600 text-sm">Ensure all land documents are current and in your name</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Show Consistent Income</h3>
                <p className="text-gray-600 text-sm">Maintain bank statements showing regular agricultural income</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Demonstrate Farm Profitability</h3>
                <p className="text-gray-600 text-sm">Show crop yield records and market sale receipts</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Apply Through Cooperative Banks</h3>
                <p className="text-gray-600 text-sm">Often have better rates and easier approval for farmers</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Join Farmer Producer Organizations</h3>
                <p className="text-gray-600 text-sm">FPO membership can help with loan guarantees and better rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Recommendations */}
      {recommendations && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((loan, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-green-200 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{loan.bank}</h3>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {loan.approvalProbability}% Approval
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Loan Type:</span>
                  <span className="font-semibold">{loan.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Max Amount:</span>
                  <span className="font-semibold text-green-600">{loan.maxAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">{loan.interestRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Processing:</span>
                  <span className="font-semibold">{loan.processing}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanRecommendations;