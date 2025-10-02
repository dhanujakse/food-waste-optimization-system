import { MenuItem, DemandPrediction, WasteRecord, WeatherData, CampusEvent, MenuCorrelation, MLModelMetrics, DashboardMetrics } from '../types';

// Menu Items
export const menuItems: MenuItem[] = [
  { id: 'burger', name: 'Classic Burger', category: 'protein', cost: 180, shelfLife: 4, popularityScore: 0.85 },
  { id: 'pizza', name: 'Margherita Pizza', category: 'protein', cost: 150, shelfLife: 6, popularityScore: 0.92 },
  { id: 'salad', name: 'Garden Salad', category: 'vegetarian', cost: 120, shelfLife: 2, popularityScore: 0.65 },
  { id: 'chicken', name: 'Grilled Chicken', category: 'protein', cost: 200, shelfLife: 4, popularityScore: 0.78 },
  { id: 'pasta', name: 'Penne Pasta', category: 'vegetarian', cost: 140, shelfLife: 8, popularityScore: 0.82 },
  { id: 'sandwich', name: 'Club Sandwich', category: 'protein', cost: 160, shelfLife: 3, popularityScore: 0.71 },
  { id: 'soup', name: 'Tomato Soup', category: 'vegetarian', cost: 80, shelfLife: 12, popularityScore: 0.68 },
  { id: 'fries', name: 'French Fries', category: 'sides', cost: 60, shelfLife: 1, popularityScore: 0.88 },
  { id: 'soda', name: 'Soft Drinks', category: 'beverages', cost: 40, shelfLife: 24, popularityScore: 0.90 },
  { id: 'dessert', name: 'Chocolate Cake', category: 'desserts', cost: 100, shelfLife: 48, popularityScore: 0.75 }
];

// Generate realistic historical data for 120 days
export const generateHistoricalData = (): WasteRecord[] => {
  const records: WasteRecord[] = [];
  const startDate = new Date('2024-06-01');
  
  for (let day = 0; day < 120; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendMultiplier = isWeekend ? 0.6 : 1.0;
    
    // Academic calendar effects
    const month = currentDate.getMonth();
    const academicMultiplier = (month >= 5 && month <= 7) ? 0.3 : 1.0; // Summer break
    
    const mealPeriods = ['breakfast', 'lunch', 'dinner'];
    
    menuItems.forEach(item => {
      mealPeriods.forEach(meal => {
        const baseDemand = item.popularityScore * 100;
        const mealMultiplier = meal === 'lunch' ? 1.4 : meal === 'dinner' ? 1.2 : 0.8;
        
        const expectedDemand = Math.round(
          baseDemand * 
          mealMultiplier * 
          weekendMultiplier * 
          academicMultiplier * 
          (0.8 + Math.random() * 0.4)
        );
        
        const prepared = Math.round(expectedDemand * (1.2 + Math.random() * 0.3));
        const consumed = Math.min(prepared, Math.round(expectedDemand * (0.85 + Math.random() * 0.3)));
        const wasted = prepared - consumed;
        
        records.push({
          date: dateStr,
          menuItemId: item.id,
          mealPeriod: meal,
          prepared,
          consumed,
          wasted,
          cost: wasted * item.cost
        });
      });
    });
  }
  
  return records;
};

// Weather data for predictions
export const weatherData: WeatherData[] = [
  { date: '2024-09-27', temperature: 22, precipitation: 0, condition: 'sunny' },
  { date: '2024-09-28', temperature: 18, precipitation: 5, condition: 'rainy' },
  { date: '2024-09-29', temperature: 25, precipitation: 0, condition: 'sunny' },
  { date: '2024-09-30', temperature: 20, precipitation: 2, condition: 'cloudy' },
];

// Campus events
export const campusEvents: CampusEvent[] = [
  { date: '2024-09-30', type: 'sports', impact: 'high', attendanceMultiplier: 1.3 },
  { date: '2024-10-15', type: 'exam', impact: 'medium', attendanceMultiplier: 0.8 },
  { date: '2024-10-31', type: 'holiday', impact: 'low', attendanceMultiplier: 0.6 },
];

// Menu correlations (found through ML analysis)
export const menuCorrelations: MenuCorrelation[] = [
  { item1: 'burger', item2: 'fries', correlation: 0.945, recommendation: 'complement' },
  { item1: 'pizza', item2: 'soda', correlation: 0.823, recommendation: 'complement' },
  { item1: 'salad', item2: 'chicken', correlation: 0.756, recommendation: 'complement' },
  { item1: 'soup', item2: 'sandwich', correlation: 0.689, recommendation: 'complement' },
  { item1: 'pasta', item2: 'salad', correlation: 0.612, recommendation: 'complement' },
  { item1: 'burger', item2: 'chicken', correlation: -0.445, recommendation: 'substitute' },
];

// ML Model Performance Metrics
export const mlMetrics: MLModelMetrics = {
  accuracy: 82.3,
  r2Score: 0.823,
  meanAbsoluteError: 12.4,
  featureImportance: [
    { feature: 'Day of Week', importance: 0.18 },
    { feature: 'Meal Period', importance: 0.16 },
    { feature: 'Historical Avg', importance: 0.15 },
    { feature: 'Weather Temp', importance: 0.12 },
    { feature: 'Campus Events', importance: 0.11 },
    { feature: 'Academic Calendar', importance: 0.10 },
    { feature: 'Seasonality', importance: 0.09 },
    { feature: 'Menu Popularity', importance: 0.09 }
  ]
};

// Current dashboard metrics
export const dashboardMetrics: DashboardMetrics = {
  currentWasteRate: 0.365, // 36.5%
  projectedSavings: 25691000, // ₹25.69 lakhs
  wasteReduction: 0.488, // 48.8%
  dailyWasteItems: 367,
  annualWasteCost: 17395600, // ₹1.74 crores
  roiPaybackMonths: 3
};

// Generate predictions for next 7 days
export const generatePredictions = (): DemandPrediction[] => {
  const predictions: DemandPrediction[] = [];
  const today = new Date('2024-09-27');
  
  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + day);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const mealPeriods = ['breakfast', 'lunch', 'dinner'];
    
    menuItems.forEach(item => {
      mealPeriods.forEach(meal => {
        const baseDemand = item.popularityScore * 100;
        const mealMultiplier = meal === 'lunch' ? 1.4 : meal === 'dinner' ? 1.2 : 0.8;
        const weekendMultiplier = isWeekend ? 0.6 : 1.0;
        
        const predicted = Math.round(
          baseDemand * mealMultiplier * weekendMultiplier * (0.9 + Math.random() * 0.2)
        );
        
        const variance = predicted * 0.15;
        
        predictions.push({
          menuItemId: item.id,
          mealPeriod: meal,
          date: dateStr,
          predictedDemand: predicted,
          confidenceInterval: {
            lower: Math.round(predicted - variance),
            upper: Math.round(predicted + variance)
          },
          factors: {
            weather: 0.8 + Math.random() * 0.4,
            events: 0.7 + Math.random() * 0.6,
            seasonality: 0.9 + Math.random() * 0.2,
            dayOfWeek: isWeekend ? 0.6 : 1.0
          }
        });
      });
    });
  }
  
  return predictions;
};