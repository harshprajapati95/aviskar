import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import DiseaseDetection from './components/DiseaseDetection';
import WeatherForecast from './components/WeatherForecast';
import CropRecommendation from './components/CropRecommendation';
import MarketPrices from './components/MarketPrices';
import FarmProfile from './components/FarmProfile';
import ExpenseCalculator from './components/ExpenseCalculator';
import Chatbot from './components/Chatbot';
import InsuranceClaims from './components/InsuranceClaims';
import FarmPlanning from './components/FarmPlanning';
import LoanRecommendations from './components/LoanRecommendations';
import GovernmentSchemes from './components/GovernmentSchemes';
import PersonalizedInsights from './components/PersonalizedInsights';
import CropFailurePrediction from './components/CropFailurePrediction';
import CropRotationOptimizer from './components/CropRotationOptimizer';
import EcommercePlatform from './components/EcommercePlatform';

// Layout component to handle sidebar and content
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Ensure sidebar stays open on desktop after navigation
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        animate={{ x: sidebarOpen ? 0 : -288 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed left-0 top-0 h-full z-40 lg:relative lg:translate-x-0 lg:transform-none w-72 shrink-0"
      >
        <Sidebar 
          setSidebarOpen={setSidebarOpen}
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white/50 backdrop-blur-sm">
        {/* Top Navbar */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30">
          <Navbar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/disease-detection" element={<DiseaseDetection />} />
                <Route path="/weather" element={<WeatherForecast />} />
                <Route path="/crop-recommendation" element={<CropRecommendation />} />
                <Route path="/market-prices" element={<MarketPrices />} />
                <Route path="/farm-profile" element={<FarmProfile />} />
                <Route path="/expense-calculator" element={<ExpenseCalculator />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/insurance" element={<InsuranceClaims />} />
                <Route path="/farm-planning" element={<FarmPlanning />} />
                <Route path="/loans" element={<LoanRecommendations />} />
                <Route path="/schemes" element={<GovernmentSchemes />} />
                <Route path="/insights" element={<PersonalizedInsights />} />
                <Route path="/crop-failure" element={<CropFailurePrediction />} />
                <Route path="/crop-rotation" element={<CropRotationOptimizer />} />
                <Route path="/ecommerce" element={<EcommercePlatform />} />
              </Routes>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      <motion.div 
        initial={false}
        animate={{ 
          opacity: sidebarOpen ? 0.5 : 0,
          pointerEvents: sidebarOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-30 lg:hidden bg-black backdrop-blur-sm"
        onClick={() => setSidebarOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
