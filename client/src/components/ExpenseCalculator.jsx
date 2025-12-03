import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, DollarSign, TrendingUp, PieChart, 
  Receipt, Target, BarChart3, Plus, Minus
} from 'lucide-react';
import { assets } from '../assets';

const ExpenseCalculator = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newExpense, setNewExpense] = useState({
    category: 'seeds',
    item: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const totalExpenses = Object.values(assets.expenses.currentSeason)
    .flat()
    .reduce((sum, item) => sum + item.total, 0);
  
  const totalIncome = assets.expenses.income
    .reduce((sum, item) => sum + item.total, 0);
  
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-50 to-blue-50 p-8"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/src/assets/pexels-pixabay-33044.jpg" 
            alt="Financial planning" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-indigo-100/90 backdrop-blur-sm rounded-3xl shadow-lg">
              <Calculator className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Expense & Profit Calculator
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Track your farming expenses, analyze profitability, and make informed
            financial decisions for your agricultural operations.
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-linear-to-br from-red-500 to-red-600 text-white rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Total Expenses</p>
              <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <Minus className="w-8 h-8 text-red-200" />
          </div>
        </div>
        
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Income</p>
              <p className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</p>
            </div>
            <Plus className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className={`bg-linear-to-br ${netProfit >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} text-white rounded-3xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Net Profit</p>
              <p className="text-2xl font-bold">₹{netProfit.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Profit Margin</p>
              <p className="text-2xl font-bold">{profitMargin}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-2 bg-white/90 backdrop-blur-xl rounded-3xl p-2 border border-gray-100 shadow-lg"
      >
        {[
          { id: 'overview', label: 'Overview', icon: PieChart },
          { id: 'expenses', label: 'Detailed Expenses', icon: Receipt },
          { id: 'analysis', label: 'Analysis', icon: BarChart3 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl transition-all duration-300 font-medium ${
              activeTab === tab.id
                ? 'bg-linear-to-r from-indigo-500 to-blue-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <button className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Add Expense</p>
              <p className="text-sm text-gray-600">Record new cost</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Add Income</p>
              <p className="text-sm text-gray-600">Record revenue</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Generate Report</p>
              <p className="text-sm text-gray-600">Export data</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Set Budget</p>
              <p className="text-sm text-gray-600">Plan spending</p>
            </div>
          </div>
        </button>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Expense Breakdown */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Expense Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(assets.expenses.currentSeason).map(([category, items], index) => {
                  const total = calculateTotal(items);
                  const percentage = ((total / totalExpenses) * 100).toFixed(1);
                  return (
                    <div key={category} className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 capitalize">{category}</h4>
                        <span className="text-lg font-bold text-gray-800">₹{total.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Income Sources */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Income Sources</h3>
              <div className="space-y-4">
                {assets.expenses.income.map((income, index) => {
                  const percentage = ((income.total / totalIncome) * 100).toFixed(1);
                  return (
                    <div key={index} className="bg-green-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-green-800">{income.crop}</h4>
                        <span className="text-lg font-bold text-green-800">₹{income.total.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <span>{income.quantity} @ {income.rate}</span>
                        <span>•</span>
                        <span>{percentage}% of total income</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-6">
            {Object.entries(assets.expenses.currentSeason).map(([category, items]) => (
              <div key={category} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 capitalize">{category} Expenses</h3>
                  <div className="text-xl font-bold text-gray-800">
                    Total: ₹{calculateTotal(items).toLocaleString()}
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Rate</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{item.item || item.activity || item.description}</td>
                          <td className="py-3 px-4">{item.quantity || `${item.workers} × ${item.days}d` || '-'}</td>
                          <td className="py-3 px-4">{item.rate || '-'}</td>
                          <td className="py-3 px-4 font-semibold">₹{item.total.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Cost Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Cost per hectare:</span>
                  <span className="font-semibold">₹{(totalExpenses / 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Revenue per hectare:</span>
                  <span className="font-semibold">₹{(totalIncome / 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Break-even point:</span>
                  <span className="font-semibold">{((totalExpenses / totalIncome) * 100).toFixed(1)}% of production</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">ROI (Return on Investment):</span>
                  <span className="font-semibold">{((netProfit / totalExpenses) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Recommendations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Cost Optimization</h4>
                  <p className="text-sm text-yellow-700">
                    Labor costs account for {((calculateTotal(assets.expenses.currentSeason.labor) / totalExpenses) * 100).toFixed(1)}% 
                    of expenses. Consider mechanization for frequently performed tasks.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Revenue Enhancement</h4>
                  <p className="text-sm text-blue-700">
                    Focus on high-value crops like vegetables which show better profit margins 
                    compared to staple grains.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Investment Planning</h4>
                  <p className="text-sm text-green-700">
                    With {profitMargin}% profit margin, consider reinvesting {Math.max(10, profitMargin/2).toFixed(0)}% 
                    of profits in farm infrastructure improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ExpenseCalculator;