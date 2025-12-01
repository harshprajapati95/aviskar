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
    <div className="flex h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Sidebar */}
      <motion.div
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full z-40 lg:relative lg:translate-x-0 lg:transform-none"
      >
        <Sidebar 
          setSidebarOpen={setSidebarOpen}
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
      <div 
        className={`fixed inset-0 z-30 lg:hidden bg-black transition-opacity duration-300 ${
          sidebarOpen ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
        }`}
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
