import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Mic, Globe, Bot } from 'lucide-react';
import { assets } from '../assets';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm your AI farming assistant. Ask me about crops, weather, diseases, or market prices.", time: '10:00 AM' }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user', text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const keywords = input.toLowerCase();
      let response = assets.chatbot.responses.weather; // default
      
      if (keywords.includes('weather')) response = assets.chatbot.responses.weather;
      else if (keywords.includes('fertilizer')) response = assets.chatbot.responses.fertilizer;
      else if (keywords.includes('pest') || keywords.includes('insect')) response = assets.chatbot.responses['pest control'];
      else if (keywords.includes('price') || keywords.includes('market')) response = assets.chatbot.responses['market price'];
      else if (keywords.includes('rotation')) response = assets.chatbot.responses['crop rotation'];
      else if (keywords.includes('irrigation') || keywords.includes('water')) response = assets.chatbot.responses.irrigation;
      else if (keywords.includes('disease')) response = assets.chatbot.responses.disease;
      
      const botMessage = { type: 'bot', text: response, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden h-[600px] flex flex-col"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-pink-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Farming Assistant</h2>
                <p className="text-pink-100">Multilingual Support • Always Available</p>
              </div>
            </div>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/20 text-white rounded-xl px-3 py-2 text-sm"
            >
              {Object.entries(assets.chatbot.languages).map(([code, name]) => (
                <option key={code} value={code} className="text-gray-800">{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 opacity-70`}>{message.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about crops, weather, diseases, market prices..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
            </button>
            <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;