import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, Search, Bell, Settings, User, Sun, Moon,
  MapPin, Wifi, Battery, Clock
} from 'lucide-react';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [isDark, setIsDark] = useState(false);

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-green-100 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-green-50 transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6 text-green-600" />
          </motion.button>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-green-400" />
            </div>
            <motion.input
              initial={{ width: 300 }}
              whileFocus={{ width: 400 }}
              type="text"
              placeholder="Search crops, diseases, market prices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-green-50/50 border border-green-200 rounded-2xl text-sm placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Center Section - Status Indicators */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <MapPin className="w-4 h-4" />
            <span>Pune, Maharashtra</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Clock className="w-4 h-4" />
            <span>{currentTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Wifi className="w-4 h-4" />
            <span>Online</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Weather Widget */}
          <div className="hidden sm:flex items-center space-x-2 bg-blue-50/80 rounded-2xl px-4 py-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <div className="text-sm">
              <span className="font-semibold text-blue-800">28°C</span>
              <span className="text-blue-600 ml-1">Sunny</span>
            </div>
          </div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 rounded-2xl hover:bg-green-50 transition-colors"
          >
            <Bell className="w-5 h-5 text-green-600" />
            {notifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-2xl hover:bg-green-50 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-green-600" />
            )}
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-2xl hover:bg-green-50 transition-colors"
          >
            <Settings className="w-5 h-5 text-green-600" />
          </motion.button>

          {/* Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-green-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-green-800">Rajesh Kumar</p>
              <p className="text-xs text-green-600">Farmer ID: KM001</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer"
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-6 pb-4 md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-green-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-green-50/50 border border-green-200 rounded-2xl text-sm placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;