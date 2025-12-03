import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Activity, Cloud, Sprout, TrendingUp, User, 
  Calculator, BarChart3, MessageCircle, Shield, 
  Calendar, CreditCard, Award, Lightbulb, 
  AlertTriangle, RotateCcw, ShoppingCart, X
} from 'lucide-react';

const Sidebar = ({ setSidebarOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-emerald-600', path: '/dashboard' },
    { id: 'disease-detection', label: 'Disease Detection', icon: Activity, color: 'text-red-600', path: '/disease-detection' },
    { id: 'weather', label: 'Weather Forecast', icon: Cloud, color: 'text-blue-600', path: '/weather' },
    { id: 'crop-recommendation', label: 'Crop Recommendation', icon: Sprout, color: 'text-green-600', path: '/crop-recommendation' },
    { id: 'market-prices', label: 'Market Prices', icon: TrendingUp, color: 'text-orange-600', path: '/market-prices' },
    { id: 'farm-profile', label: 'Farm Profile', icon: User, color: 'text-purple-600', path: '/farm-profile' },
    { id: 'expense-calculator', label: 'Expense Calculator', icon: Calculator, color: 'text-indigo-600', path: '/expense-calculator' },
    { id: 'chatbot', label: 'AI Chatbot', icon: MessageCircle, color: 'text-pink-600', path: '/chatbot' },
    { id: 'insurance', label: 'Insurance Claims', icon: Shield, color: 'text-teal-600', path: '/insurance' },
    { id: 'farm-planning', label: 'Farm Planning', icon: Calendar, color: 'text-lime-600', path: '/farm-planning' },
    { id: 'loans', label: 'Loan Recommendations', icon: CreditCard, color: 'text-yellow-600', path: '/loans' },
    { id: 'schemes', label: 'Government Schemes', icon: Award, color: 'text-rose-600', path: '/schemes' },
    { id: 'insights', label: 'AI Insights', icon: Lightbulb, color: 'text-amber-600', path: '/insights' },
    { id: 'crop-failure', label: 'Failure Prediction', icon: AlertTriangle, color: 'text-red-500', path: '/crop-failure' },
    { id: 'crop-rotation', label: 'Rotation Optimizer', icon: RotateCcw, color: 'text-violet-600', path: '/crop-rotation' },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart, color: 'text-emerald-500', path: '/ecommerce' }
  ];

  return (
    <div className="w-72 h-full bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100/50 shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-11 h-11 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              KrishiMitra
            </h1>
            <p className="text-xs text-gray-500 font-medium">Smart Agriculture AI</p>
          </div>
        </motion.div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                to={item.path}
                onClick={() => {
                  // Only close sidebar on mobile screens
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color} transition-colors group-hover:scale-105`} />
                <span className={`font-medium text-sm ${isActive ? 'text-white' : 'text-gray-700'} group-hover:font-semibold`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100/50 shrink-0">
        <div className="bg-linear-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100/50">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-gray-800 text-sm truncate">Rajesh Kumar</h4>
              <p className="text-xs text-gray-500 font-medium">Premium Farmer</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Profile Completion</span>
              <span className="font-semibold text-gray-800">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-linear-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;