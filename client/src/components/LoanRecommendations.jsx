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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="p-4 bg-yellow-100 rounded-3xl w-fit mx-auto mb-4">
          <CreditCard className="w-12 h-12 text-yellow-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Loan Recommendations & Credit Score</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get personalized loan recommendations based on your farm profile and digital credit score.
        </p>
      </motion.div>

      {/* Credit Score */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl">
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

      {/* Get Recommendations */}
      <div className="text-center">
        <button onClick={getLoanRecommendations} className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all">
          Get Loan Recommendations
        </button>
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
                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
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