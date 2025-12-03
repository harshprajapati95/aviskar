import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, BarChart3, 
  MapPin, Calendar, Target, AlertCircle
} from 'lucide-react';
import { assets, aiHelpers } from '../assets';

const MarketPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const pred = aiHelpers.predictPrices(selectedCrop, 30);
    setPrediction(pred);
  }, [selectedCrop]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-50 to-amber-50 p-8"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/src/assets/pexels-pixabay-33044.jpg" 
            alt="Agricultural market" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-orange-100/90 backdrop-blur-sm rounded-3xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Market Prices & Trends
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Real-time market prices, future predictions, and optimal selling strategies
            to maximize your crop returns.
          </p>
        </div>
      </motion.div>

      {/* Today's Prices */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <DollarSign className="w-7 h-7 text-green-600 mr-3" />
          Today's Market Prices
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.marketPrices.today.map((price, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCrop(price.crop)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedCrop === price.crop
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{price.crop}</h3>
                <div className={`flex items-center space-x-1 ${
                  price.trend === 'up' ? 'text-green-600' : 
                  price.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {price.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                   price.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
                  <span className="text-sm font-semibold">{price.change}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">₹{price.price}</span>
                  <span className="text-sm text-gray-500">{price.unit}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span>{price.market}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Price Prediction */}
      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart3 className="w-7 h-7 mr-3" />
            Price Prediction for {selectedCrop}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">₹{prediction.currentPrice}</div>
              <div className="text-blue-100">Current Price</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">₹{prediction.predictedPrice}</div>
              <div className="text-blue-100">Predicted Price</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                prediction.change >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {prediction.change >= 0 ? '+' : ''}₹{prediction.change}
              </div>
              <div className="text-blue-100">Expected Change</div>
            </div>
          </div>
          
          <div className="mt-6 bg-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span>Confidence Level</span>
              <span className="font-semibold">{prediction.confidence}%</span>
            </div>
            <div className="bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full" 
                style={{ width: `${prediction.confidence}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Best Markets */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="w-7 h-7 text-green-600 mr-3" />
          Best Markets to Sell
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assets.marketPrices.bestMarkets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-green-50 rounded-2xl p-6 border border-green-200"
            >
              <h3 className="text-lg font-bold text-green-800 mb-2">{market.crop}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Price:</span>
                  <span className="font-semibold text-green-800">₹{market.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Market:</span>
                  <span className="font-semibold text-green-800">{market.market}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Distance:</span>
                  <span className="font-semibold text-green-800">{market.distance}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;