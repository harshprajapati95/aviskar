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
    <div className="w-72 h-full bg-white/80 backdrop-blur-xl border-r border-green-200 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-green-100">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              KrishiMitra
            </h1>
            <p className="text-xs text-green-600/80">Smart Agriculture AI</p>
          </div>
        </motion.div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-xl hover:bg-green-100 transition-colors"
        >
          <X className="w-5 h-5 text-green-600" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
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
                  w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 group
                  ${isActive 
                    ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 scale-105' 
                    : 'text-green-700 hover:bg-green-50 hover:scale-105 hover:shadow-md'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color} transition-colors`} />
                <span className={`font-medium text-sm ${isActive ? 'text-white' : 'text-green-800'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-green-100">
        <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-800 text-sm">Rajesh Kumar</h4>
              <p className="text-xs text-green-600">Premium Farmer</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex-1 bg-green-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-xs text-green-600 font-medium">75%</span>
          </div>
          <p className="text-xs text-green-600 mt-1">Profile Completion</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;