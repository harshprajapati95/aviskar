import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Filter, Star, Heart, Eye } from 'lucide-react';
import { assets } from '../assets';

const EcommercePlatform = () => {
  const [activeCategory, setActiveCategory] = useState('seeds');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'seeds', name: 'Seeds', icon: '🌱' },
    { id: 'fertilizers', name: 'Fertilizers', icon: '🌿' },
    { id: 'pesticides', name: 'Pesticides', icon: '🛡️' },
    { id: 'tools', name: 'Tools', icon: '🔧' }
  ];
  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  
  const filteredProducts = assets.products[activeCategory].filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="p-4 bg-emerald-100 rounded-3xl w-fit mx-auto mb-4">
          <ShoppingCart className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AgriCommerce Platform</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse and purchase high-quality seeds, fertilizers, pesticides, and farming tools at competitive prices.
        </p>
      </motion.div>

      {/* Search and Cart */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-6">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-emerald-600">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
          <button className="relative p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`p-6 rounded-2xl text-center transition-all ${
                activeCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-emerald-50 text-gray-700'
              }`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <div className="font-semibold">{category.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="relative mb-4">
              <div className="w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">{categories.find(c => c.id === activeCategory)?.icon}</div>
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.brand}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating})</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">₹{product.price}</div>
                  <div className="text-sm text-gray-500">{product.unit}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {product.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => addToCart(product)}
                className="w-full py-3 bg-linear-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default EcommercePlatform;