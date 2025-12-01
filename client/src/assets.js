// KrishiMitra - Comprehensive Agriculture Data Assets
export const assets = {
  // Weather Data
  weather: {
    current: {
      location: "Pune, Maharashtra",
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      rainfall: 0,
      uvIndex: 6,
      soilMoisture: 45,
      farmingAdvice: "Good conditions for sowing. Consider irrigation for dry areas."
    },
    forecast: [
      { day: "Today", high: 32, low: 22, condition: "Sunny", icon: "sunny", rainfall: 0, humidity: 60, advice: "Perfect for harvesting" },
      { day: "Tomorrow", high: 30, low: 20, condition: "Partly Cloudy", icon: "partly-cloudy", rainfall: 5, humidity: 70, advice: "Good for spraying pesticides" },
      { day: "Tuesday", high: 28, low: 18, condition: "Rainy", icon: "rainy", rainfall: 25, humidity: 85, advice: "Postpone field activities" },
      { day: "Wednesday", high: 31, low: 21, condition: "Cloudy", icon: "cloudy", rainfall: 10, humidity: 75, advice: "Moderate conditions" },
      { day: "Thursday", high: 33, low: 23, condition: "Sunny", icon: "sunny", rainfall: 0, humidity: 55, advice: "Excellent for harvesting" },
      { day: "Friday", high: 29, low: 19, condition: "Thunderstorm", icon: "thunderstorm", rainfall: 40, humidity: 90, advice: "Stay indoors, secure crops" },
      { day: "Saturday", high: 27, low: 17, condition: "Partly Cloudy", icon: "partly-cloudy", rainfall: 8, humidity: 68, advice: "Good for planting" }
    ]
  },

  // Disease Database
  diseases: [
    {
      id: 1,
      name: "Leaf Blight",
      crop: "Rice",
      severity: "High",
      symptoms: ["Brown spots on leaves", "Yellow margins", "Premature leaf drop"],
      treatment: "Apply copper-based fungicide, improve drainage",
      prevention: "Use resistant varieties, proper spacing",
      image: "/api/placeholder/300/200",
      affectedArea: "Leaves",
      season: "Monsoon",
      recoveryTime: "2-3 weeks"
    },
    {
      id: 2,
      name: "Powdery Mildew",
      crop: "Tomato",
      severity: "Medium",
      symptoms: ["White powdery coating", "Leaf curling", "Stunted growth"],
      treatment: "Sulfur spray, neem oil application",
      prevention: "Adequate ventilation, avoid overhead watering",
      image: "/api/placeholder/300/200",
      affectedArea: "Leaves and stems",
      season: "Winter",
      recoveryTime: "1-2 weeks"
    },
    {
      id: 3,
      name: "Root Rot",
      crop: "Wheat",
      severity: "Critical",
      symptoms: ["Yellowing plants", "Wilting", "Black roots"],
      treatment: "Soil treatment with fungicide, improve drainage",
      prevention: "Proper field preparation, seed treatment",
      image: "/api/placeholder/300/200",
      affectedArea: "Root system",
      season: "All seasons",
      recoveryTime: "3-4 weeks"
    }
  ],

  // Crop Recommendations
  crops: {
    kharif: [
      { name: "Rice", profitability: 85, waterReq: "High", duration: "120 days", investment: "₹45,000/acre", expectedReturn: "₹75,000/acre" },
      { name: "Cotton", profitability: 78, waterReq: "Medium", duration: "180 days", investment: "₹35,000/acre", expectedReturn: "₹62,000/acre" },
      { name: "Sugarcane", profitability: 92, waterReq: "High", duration: "365 days", investment: "₹80,000/acre", expectedReturn: "₹150,000/acre" },
      { name: "Maize", profitability: 70, waterReq: "Medium", duration: "90 days", investment: "₹25,000/acre", expectedReturn: "₹42,000/acre" }
    ],
    rabi: [
      { name: "Wheat", profitability: 88, waterReq: "Medium", duration: "150 days", investment: "₹30,000/acre", expectedReturn: "₹55,000/acre" },
      { name: "Barley", profitability: 65, waterReq: "Low", duration: "120 days", investment: "₹20,000/acre", expectedReturn: "₹33,000/acre" },
      { name: "Mustard", profitability: 75, waterReq: "Low", duration: "100 days", investment: "₹15,000/acre", expectedReturn: "₹26,000/acre" },
      { name: "Chickpea", profitability: 82, waterReq: "Low", duration: "110 days", investment: "₹18,000/acre", expectedReturn: "₹32,000/acre" }
    ],
    zaid: [
      { name: "Watermelon", profitability: 95, waterReq: "High", duration: "90 days", investment: "₹40,000/acre", expectedReturn: "₹78,000/acre" },
      { name: "Cucumber", profitability: 87, waterReq: "Medium", duration: "65 days", investment: "₹25,000/acre", expectedReturn: "₹47,000/acre" },
      { name: "Fodder", profitability: 60, waterReq: "Medium", duration: "45 days", investment: "₹12,000/acre", expectedReturn: "₹19,000/acre" }
    ]
  },

  // Farm Profile Data
  farmProfile: {
    farmerId: "KM001",
    name: "Rajesh Kumar",
    location: "Pune, Maharashtra",
    farmSize: 5.5,
    soilType: "Black Cotton Soil",
    irrigationType: "Drip + Sprinkler",
    pastCrops: [
      { year: 2024, season: "Kharif", crop: "Cotton", yield: "18 quintals/acre", profit: "₹27,000" },
      { year: 2024, season: "Rabi", crop: "Wheat", yield: "22 quintals/acre", profit: "₹25,000" },
      { year: 2023, season: "Kharif", crop: "Soybean", yield: "15 quintals/acre", profit: "₹22,000" },
      { year: 2023, season: "Rabi", crop: "Chickpea", yield: "12 quintals/acre", profit: "₹18,000" }
    ],
    fertilizerUsage: [
      { type: "Urea", quantity: "2 bags/acre", cost: "₹600/bag" },
      { type: "DAP", quantity: "1.5 bags/acre", cost: "₹1,200/bag" },
      { type: "Potash", quantity: "1 bag/acre", cost: "₹800/bag" }
    ],
    equipment: ["Tractor", "Thresher", "Sprayer", "Plough"],
    certifications: ["Organic", "Good Agricultural Practices"]
  },

  // Market Prices
  marketPrices: {
    today: [
      { crop: "Rice", price: 2150, market: "Pune APMC", trend: "up", change: "+50", unit: "per quintal" },
      { crop: "Wheat", price: 2450, market: "Mumbai APMC", trend: "down", change: "-30", unit: "per quintal" },
      { crop: "Cotton", price: 6800, market: "Akola APMC", trend: "up", change: "+200", unit: "per quintal" },
      { crop: "Soybean", price: 4200, market: "Indore APMC", trend: "stable", change: "0", unit: "per quintal" },
      { crop: "Onion", price: 1800, market: "Nashik APMC", trend: "up", change: "+150", unit: "per quintal" },
      { crop: "Tomato", price: 2500, market: "Pune APMC", trend: "down", change: "-300", unit: "per quintal" }
    ],
    predictions: [
      { crop: "Rice", currentPrice: 2150, predictedPrice: 2300, timeframe: "Next 30 days", confidence: 85, bestSellingTime: "15-20 days" },
      { crop: "Wheat", currentPrice: 2450, predictedPrice: 2600, timeframe: "Next 45 days", confidence: 78, bestSellingTime: "30-35 days" },
      { crop: "Cotton", currentPrice: 6800, predictedPrice: 7200, timeframe: "Next 60 days", confidence: 92, bestSellingTime: "45-50 days" }
    ],
    bestMarkets: [
      { crop: "Rice", market: "Pune APMC", price: 2150, distance: "25 km" },
      { crop: "Wheat", market: "Mumbai APMC", price: 2450, distance: "120 km" },
      { crop: "Cotton", market: "Akola APMC", price: 6800, distance: "450 km" }
    ]
  },

  // Expenses and Income Data
  expenses: {
    currentSeason: {
      seeds: [
        { item: "Cotton Seeds", quantity: "2 kg", rate: "₹800/kg", total: 1600, date: "2024-06-15" },
        { item: "Wheat Seeds", quantity: "50 kg", rate: "₹35/kg", total: 1750, date: "2024-11-10" }
      ],
      fertilizers: [
        { item: "Urea", quantity: "10 bags", rate: "₹600/bag", total: 6000, date: "2024-07-01" },
        { item: "DAP", quantity: "8 bags", rate: "₹1200/bag", total: 9600, date: "2024-07-01" },
        { item: "Potash", quantity: "5 bags", rate: "₹800/bag", total: 4000, date: "2024-07-15" }
      ],
      labor: [
        { activity: "Sowing", workers: 8, days: 3, rate: "₹350/day", total: 8400, date: "2024-06-20" },
        { activity: "Weeding", workers: 6, days: 2, rate: "₹350/day", total: 4200, date: "2024-08-15" },
        { activity: "Harvesting", workers: 12, days: 4, rate: "₹400/day", total: 19200, date: "2024-11-05" }
      ],
      transport: [
        { item: "Fertilizer Transport", quantity: "23 bags", rate: "₹50/bag", total: 1150, date: "2024-07-01" },
        { item: "Crop Transport", quantity: "180 quintals", rate: "₹15/quintal", total: 2700, date: "2024-11-10" }
      ],
      others: [
        { item: "Fuel", description: "Tractor fuel", total: 8500, date: "2024-10-15" },
        { item: "Equipment Rent", description: "Thresher rent", total: 3500, date: "2024-11-05" }
      ]
    },
    income: [
      { crop: "Cotton", quantity: "85 quintals", rate: "₹6500/quintal", total: 552500, date: "2024-11-10" },
      { crop: "Wheat", quantity: "95 quintals", rate: "₹2300/quintal", total: 218500, date: "2024-04-15" }
    ]
  },

  // Insurance Data
  insurance: {
    policies: [
      {
        id: "INS001",
        name: "Pradhan Mantri Fasal Bima Yojana",
        crop: "Cotton",
        coverage: "₹50,000/acre",
        premium: "₹2,500/acre",
        status: "Active",
        validTill: "2025-03-31"
      },
      {
        id: "INS002", 
        name: "Weather Based Crop Insurance",
        crop: "Wheat",
        coverage: "₹35,000/acre", 
        premium: "₹1,800/acre",
        status: "Active",
        validTill: "2025-04-30"
      }
    ],
    claims: [
      {
        claimId: "CLM001",
        crop: "Cotton",
        damageType: "Hail Storm",
        damagePercent: 35,
        claimAmount: "₹17,500",
        status: "Processing",
        submittedDate: "2024-10-15",
        expectedSettlement: "2024-12-15"
      }
    ]
  },

  // Loan Data
  loans: {
    active: [
      {
        loanId: "LN001",
        type: "Crop Loan",
        amount: "₹2,50,000",
        interestRate: "7%",
        tenure: "12 months",
        emi: "₹21,500",
        nextDueDate: "2025-01-15",
        outstanding: "₹1,85,000"
      },
      {
        loanId: "LN002",
        type: "Equipment Loan", 
        amount: "₹5,00,000",
        interestRate: "9.5%",
        tenure: "60 months",
        emi: "₹10,500",
        nextDueDate: "2025-01-10",
        outstanding: "₹3,45,000"
      }
    ],
    creditScore: 785,
    eligibleLoans: [
      { bank: "SBI", type: "Kisan Credit Card", maxAmount: "₹3,00,000", interestRate: "7%", processing: "₹500" },
      { bank: "HDFC Bank", type: "Farm Equipment Loan", maxAmount: "₹10,00,000", interestRate: "9%", processing: "₹2,000" },
      { bank: "NABARD", type: "Warehouse Receipt Loan", maxAmount: "₹2,50,000", interestRate: "8%", processing: "₹1,000" }
    ]
  },

  // Government Schemes
  schemes: [
    {
      id: "SCH001",
      name: "PM-Kisan Samman Nidhi",
      description: "Direct income support to farmers",
      benefits: "₹6,000 per year",
      eligibility: "Small and marginal farmers",
      documents: ["Aadhaar", "Land Records", "Bank Account"],
      status: "Eligible",
      applicationDeadline: "2025-03-31"
    },
    {
      id: "SCH002",
      name: "Pradhan Mantri Krishi Sinchai Yojana",
      description: "Irrigation facility enhancement",
      benefits: "90% subsidy on drip irrigation",
      eligibility: "All farmers with irrigation needs",
      documents: ["Land Records", "Water Source Proof", "Estimate"],
      status: "Eligible", 
      applicationDeadline: "2025-02-28"
    },
    {
      id: "SCH003",
      name: "Soil Health Card Scheme",
      description: "Free soil testing and health card",
      benefits: "Free soil analysis and recommendations",
      eligibility: "All farmers",
      documents: ["Land Records", "Aadhaar"],
      status: "Applied",
      applicationDeadline: "2025-06-30"
    }
  ],

  // Chatbot Responses
  chatbot: {
    responses: {
      "weather": "Based on current weather conditions, I recommend postponing spraying activities due to expected rainfall in the next 2 days. The humidity is high at 85%, which might reduce pesticide effectiveness.",
      "fertilizer": "For your cotton crop at this stage, apply 50kg DAP and 25kg Urea per acre. The black cotton soil in your region responds well to phosphorus-rich fertilizers.",
      "pest control": "The symptoms you described indicate bollworm attack. Use integrated pest management: Install pheromone traps, spray neem oil in evening hours, and consider biological control agents.",
      "market price": "Current cotton prices are ₹6,800 per quintal at Akola APMC. Prices are expected to rise by ₹400 in the next 45 days. I suggest holding your stock for better returns.",
      "crop rotation": "After cotton, I recommend soybean-wheat rotation. This will improve soil nitrogen content and give you better overall profitability of ₹45,000 per acre annually.",
      "irrigation": "Your soil moisture is at 45%. With the upcoming dry spell, schedule irrigation for tomorrow morning. Drip irrigation would be most efficient for your cotton crop.",
      "disease": "Upload an image of the affected plant for accurate disease identification. Common diseases in your region during this season are leaf blight and powdery mildew."
    },
    languages: {
      "en": "English",
      "hi": "हिंदी", 
      "mr": "मराठी",
      "gu": "ગુજરાતી",
      "kn": "ಕನ್ನಡ",
      "ta": "தமிழ்"
    }
  },

  // Crop Rotation Plans
  rotationPlans: [
    {
      id: "ROT001",
      name: "Cotton-Wheat-Soybean Rotation",
      duration: "3 years",
      seasons: ["Kharif", "Rabi", "Kharif"],
      crops: ["Cotton", "Wheat", "Soybean"],
      projectedProfit: "₹1,35,000/acre",
      soilBenefits: "Improved nitrogen fixation, reduced pest buildup",
      waterRequirement: "Medium",
      recommendation: "Highly Recommended"
    },
    {
      id: "ROT002", 
      name: "Rice-Chickpea-Maize Rotation",
      duration: "2 years",
      seasons: ["Kharif", "Rabi", "Kharif"],
      crops: ["Rice", "Chickpea", "Maize"],
      projectedProfit: "₹95,000/acre",
      soilBenefits: "Enhanced soil fertility, better water retention",
      waterRequirement: "High",
      recommendation: "Suitable for irrigated areas"
    },
    {
      id: "ROT003",
      name: "Sugarcane-Wheat Rotation",
      duration: "2 years", 
      seasons: ["Annual", "Rabi"],
      crops: ["Sugarcane", "Wheat"],
      projectedProfit: "₹1,85,000/acre",
      soilBenefits: "Deep soil cultivation, organic matter addition",
      waterRequirement: "Very High",
      recommendation: "For water-abundant regions"
    }
  ],

  // E-commerce Products
  products: {
    seeds: [
      { id: "S001", name: "Cotton Seeds BT-Cotton", brand: "Mahyco", price: 850, unit: "per kg", rating: 4.5, image: "/api/placeholder/200/200", features: ["High Yield", "Pest Resistant", "Early Maturity"] },
      { id: "S002", name: "Wheat Seeds HD-2967", brand: "IARI", price: 45, unit: "per kg", rating: 4.8, image: "/api/placeholder/200/200", features: ["Disease Resistant", "High Protein", "Dwarf Variety"] },
      { id: "S003", name: "Tomato Seeds Arka Rakshak", brand: "IIHR", price: 2500, unit: "per 100g", rating: 4.3, image: "/api/placeholder/200/200", features: ["Hybrid", "Disease Resistant", "High Yield"] }
    ],
    fertilizers: [
      { id: "F001", name: "Urea 46% N", brand: "IFFCO", price: 600, unit: "per 50kg bag", rating: 4.2, image: "/api/placeholder/200/200", features: ["Quick Release", "High Nitrogen", "Water Soluble"] },
      { id: "F002", name: "DAP 18:46:0", brand: "KRIBHCO", price: 1250, unit: "per 50kg bag", rating: 4.6, image: "/api/placeholder/200/200", features: ["Phosphorus Rich", "Starter Fertilizer", "Granulated"] },
      { id: "F003", name: "Potash MOP", brand: "IPL", price: 850, unit: "per 50kg bag", rating: 4.4, image: "/api/placeholder/200/200", features: ["60% K2O", "Chloride Free", "Water Soluble"] }
    ],
    pesticides: [
      { id: "P001", name: "Imidacloprid 17.8% SL", brand: "Bayer", price: 320, unit: "per 250ml", rating: 4.7, image: "/api/placeholder/200/200", features: ["Systemic", "Long Duration", "Broad Spectrum"] },
      { id: "P002", name: "Chlorpyrifos 20% EC", brand: "Dow Chemicals", price: 280, unit: "per 500ml", rating: 4.3, image: "/api/placeholder/200/200", features: ["Contact Action", "Soil Application", "Persistent"] },
      { id: "P003", name: "Neem Oil", brand: "Organic", price: 180, unit: "per liter", rating: 4.8, image: "/api/placeholder/200/200", features: ["Organic", "Safe", "Multiple Pests"] }
    ],
    tools: [
      { id: "T001", name: "Knapsack Sprayer", brand: "Venus", price: 1850, unit: "per piece", rating: 4.5, image: "/api/placeholder/200/200", features: ["16L Capacity", "Brass Lance", "Pressure Control"] },
      { id: "T002", name: "Garden Hand Tools Set", brand: "Falcon", price: 650, unit: "per set", rating: 4.2, image: "/api/placeholder/200/200", features: ["5 Tools", "Ergonomic", "Rust Resistant"] },
      { id: "T003", name: "Soil pH Meter", brand: "HM Digital", price: 1200, unit: "per piece", rating: 4.6, image: "/api/placeholder/200/200", features: ["Digital Display", "Waterproof", "Auto Calibration"] }
    ]
  },

  // AI Insights and Recommendations
  insights: [
    {
      id: "INS001",
      type: "Irrigation",
      priority: "High",
      title: "Switch to drip irrigation this week",
      description: "Weather forecast shows dry spell for next 10 days. Drip irrigation will save 40% water and increase yield by 15%.",
      actionRequired: "Install drip system",
      potentialSaving: "₹12,000",
      deadline: "2024-12-05"
    },
    {
      id: "INS002", 
      type: "Marketing",
      priority: "Medium",
      title: "Sell tomatoes in 3 days",
      description: "Market analysis shows prices will drop by ₹300/quintal after December 4th due to increased supply from neighboring districts.",
      actionRequired: "Harvest and transport to market",
      potentialSaving: "₹18,000", 
      deadline: "2024-12-04"
    },
    {
      id: "INS003",
      type: "Pest Control", 
      priority: "High",
      title: "Apply bollworm control measures",
      description: "Weather conditions and crop stage indicate high risk of bollworm attack in next week. Early intervention can prevent 60% crop loss.",
      actionRequired: "Spray recommended pesticide",
      potentialSaving: "₹45,000",
      deadline: "2024-12-02"
    }
  ],

  // Yield History and Analytics
  yieldHistory: {
    crops: [
      {
        crop: "Cotton",
        years: ["2020", "2021", "2022", "2023", "2024"],
        yields: [15, 17, 14, 18, 19],
        profits: [22000, 28000, 18000, 32000, 35000],
        expenses: [18000, 19000, 16000, 21000, 22000]
      },
      {
        crop: "Wheat", 
        years: ["2020", "2021", "2022", "2023", "2024"],
        yields: [20, 22, 19, 24, 25],
        profits: [18000, 24000, 15000, 28000, 30000],
        expenses: [12000, 14000, 11000, 16000, 17000]
      },
      {
        crop: "Soybean",
        years: ["2020", "2021", "2022", "2023", "2024"], 
        yields: [12, 14, 11, 15, 16],
        profits: [15000, 19000, 12000, 22000, 24000],
        expenses: [10000, 12000, 9000, 13000, 14000]
      }
    ],
    totalFarmProfit: {
      years: ["2020", "2021", "2022", "2023", "2024"],
      profits: [55000, 71000, 45000, 82000, 89000],
      expenses: [40000, 45000, 36000, 50000, 53000],
      netIncome: [15000, 26000, 9000, 32000, 36000]
    }
  }
};

// Helper functions for AI simulations
export const aiHelpers = {
  // Disease Detection AI Simulation
  detectDisease: (imageFile) => {
    const diseases = assets.diseases;
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    return {
      ...randomDisease,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
      detectionTime: Date.now(),
      recommendations: [
        "Immediate treatment required",
        "Monitor spread to other plants", 
        "Improve field sanitation",
        "Consider resistant varieties next season"
      ]
    };
  },

  // Crop Recommendation AI
  recommendCrops: (soilType, season, region) => {
    const seasonCrops = assets.crops[season.toLowerCase()] || assets.crops.kharif;
    return seasonCrops
      .sort((a, b) => b.profitability - a.profitability)
      .slice(0, 3)
      .map(crop => ({
        ...crop,
        suitabilityScore: Math.floor(Math.random() * 20) + 80,
        riskFactor: Math.floor(Math.random() * 30) + 10
      }));
  },

  // Market Price Prediction
  predictPrices: (crop, duration) => {
    const currentPrice = assets.marketPrices.today.find(p => p.crop === crop)?.price || 2000;
    const volatility = Math.random() * 0.2 - 0.1; // -10% to +10%
    const predictedPrice = Math.floor(currentPrice * (1 + volatility));
    
    return {
      currentPrice,
      predictedPrice,
      change: predictedPrice - currentPrice,
      changePercent: ((predictedPrice - currentPrice) / currentPrice * 100).toFixed(2),
      confidence: Math.floor(Math.random() * 20) + 75,
      factors: ["Weather conditions", "Government policies", "Export demand", "Storage capacity"]
    };
  },

  // Insurance Claim Analysis
  analyzeInsuranceClaim: (images, cropType) => {
    const damagePercent = Math.floor(Math.random() * 60) + 20; // 20-80% damage
    const policy = assets.insurance.policies.find(p => p.crop === cropType);
    const claimAmount = policy ? Math.floor(policy.coverage.replace(/[₹,]/g, '') * damagePercent / 100) : 0;
    
    return {
      damageAssessment: {
        damageType: ["Hail", "Flood", "Pest", "Disease"][Math.floor(Math.random() * 4)],
        damagePercent,
        affectedArea: Math.floor(Math.random() * 50) + 10,
        severity: damagePercent > 60 ? "Severe" : damagePercent > 40 ? "Moderate" : "Minor"
      },
      eligibility: {
        eligible: damagePercent >= 33,
        reason: damagePercent >= 33 ? "Damage exceeds minimum threshold" : "Damage below 33% threshold"
      },
      claimDetails: {
        estimatedAmount: `₹${claimAmount.toLocaleString()}`,
        processingTime: "15-30 days",
        requiredDocuments: ["Damage photos", "FIR copy", "Revenue records", "Bank details"],
        nextSteps: ["Submit claim form", "Schedule field inspection", "Await assessment"]
      }
    };
  },

  // Farm Planning AI
  generateFarmPlan: (cropType, farmSize, season) => {
    const activities = [
      { activity: "Land Preparation", startDay: 1, duration: 5, priority: "High" },
      { activity: "Sowing/Planting", startDay: 6, duration: 3, priority: "Critical" },
      { activity: "First Irrigation", startDay: 10, duration: 1, priority: "High" },
      { activity: "Fertilizer Application", startDay: 15, duration: 2, priority: "Medium" },
      { activity: "Weed Management", startDay: 25, duration: 2, priority: "High" },
      { activity: "Pest Monitoring", startDay: 30, duration: 1, priority: "High" },
      { activity: "Second Irrigation", startDay: 35, duration: 1, priority: "Medium" },
      { activity: "Flowering Care", startDay: 50, duration: 5, priority: "High" },
      { activity: "Harvesting", startDay: 90, duration: 7, priority: "Critical" }
    ];
    
    return activities.map(activity => ({
      ...activity,
      scheduledDate: new Date(Date.now() + activity.startDay * 24 * 60 * 60 * 1000).toLocaleDateString(),
      weatherDependency: ["Sowing/Planting", "Irrigation", "Pest Monitoring"].includes(activity.activity),
      estimatedCost: Math.floor(Math.random() * 5000) + 1000
    }));
  },

  // Crop Failure Prediction
  predictCropFailure: (cropType, currentConditions) => {
    const riskFactors = {
      weather: Math.floor(Math.random() * 40) + 10,
      pest: Math.floor(Math.random() * 30) + 5,
      disease: Math.floor(Math.random() * 35) + 5,
      soil: Math.floor(Math.random() * 25) + 5,
      market: Math.floor(Math.random() * 20) + 5
    };
    
    const overallRisk = Object.values(riskFactors).reduce((a, b) => a + b, 0) / 5;
    
    return {
      riskScore: Math.floor(overallRisk),
      riskLevel: overallRisk > 70 ? "High" : overallRisk > 40 ? "Medium" : "Low",
      factors: riskFactors,
      recommendations: [
        "Monitor weather forecasts daily",
        "Implement integrated pest management", 
        "Ensure proper drainage systems",
        "Consider crop insurance",
        "Maintain soil health through organic matter"
      ],
      preventiveMeasures: [
        "Install weather monitoring systems",
        "Use disease-resistant varieties",
        "Implement precision agriculture",
        "Diversify crop portfolio"
      ]
    };
  },

  // Loan Recommendation
  recommendLoans: (farmProfile, creditScore) => {
    const loans = assets.loans.eligibleLoans;
    return loans.map(loan => ({
      ...loan,
      approvalProbability: Math.min(95, Math.floor(creditScore / 10) + Math.random() * 20),
      recommendedAmount: Math.floor(farmProfile.farmSize * 50000),
      monthlyEMI: Math.floor(Math.random() * 15000) + 5000,
      benefits: ["Lower interest rates", "Flexible repayment", "Quick approval", "Minimal documentation"]
    })).sort((a, b) => b.approvalProbability - a.approvalProbability);
  }
};