// Core types for the Food Waste Optimization System

export interface MenuItem {
  id: string;
  name: string;
  category: 'protein' | 'vegetarian' | 'sides' | 'beverages' | 'desserts';
  cost: number;
  shelfLife: number; // hours
  popularityScore: number;
}

export interface MealPeriod {
  id: string;
  name: 'breakfast' | 'lunch' | 'dinner';
  startTime: string;
  endTime: string;
}

export interface DemandPrediction {
  menuItemId: string;
  mealPeriod: string;
  date: string;
  predictedDemand: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  factors: {
    weather: number;
    events: number;
    seasonality: number;
    dayOfWeek: number;
  };
}

export interface WasteRecord {
  date: string;
  menuItemId: string;
  mealPeriod: string;
  prepared: number;
  consumed: number;
  wasted: number;
  cost: number;
}

export interface WeatherData {
  date: string;
  temperature: number;
  precipitation: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
}

export interface CampusEvent {
  date: string;
  type: 'exam' | 'holiday' | 'sports' | 'conference' | 'graduation';
  impact: 'low' | 'medium' | 'high';
  attendanceMultiplier: number;
}

export interface OptimizationResult {
  menuItemId: string;
  mealPeriod: string;
  recommendedQuantity: number;
  safetyStock: number;
  projectedWaste: number;
  costSavings: number;
  confidence: number;
}

export interface MenuCorrelation {
  item1: string;
  item2: string;
  correlation: number;
  recommendation: 'complement' | 'substitute' | 'neutral';
}

export interface MLModelMetrics {
  accuracy: number;
  r2Score: number;
  meanAbsoluteError: number;
  featureImportance: Array<{
    feature: string;
    importance: number;
  }>;
}

export interface DashboardMetrics {
  currentWasteRate: number;
  projectedSavings: number;
  wasteReduction: number;
  dailyWasteItems: number;
  annualWasteCost: number;
  roiPaybackMonths: number;
}