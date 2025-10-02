import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Brain, 
  Calendar, 
  Cloud, 
  Users, 
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { generatePredictions, menuItems, weatherData } from "../data/mockData";

export function Predictions() {
  const [selectedDate, setSelectedDate] = useState("2024-09-27");
  const [selectedWeather, setSelectedWeather] = useState("sunny");
  const [eventType, setEventType] = useState("none");
  const [attendanceMultiplier, setAttendanceMultiplier] = useState("1.0");
  
  const predictions = generatePredictions();
  const todayPredictions = predictions.filter(p => p.date === selectedDate);

  const getConfidenceColor = (demand: number, interval: any) => {
    const range = interval.upper - interval.lower;
    const confidence = 1 - (range / demand);
    if (confidence > 0.8) return "text-green-600";
    if (confidence > 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceBadge = (demand: number, interval: any) => {
    const range = interval.upper - interval.lower;
    const confidence = Math.round((1 - (range / demand)) * 100);
    
    if (confidence > 80) return <Badge className="bg-green-100 text-green-800">High ({confidence}%)</Badge>;
    if (confidence > 60) return <Badge className="bg-yellow-100 text-yellow-800">Medium ({confidence}%)</Badge>;
    return <Badge className="bg-red-100 text-red-800">Low ({confidence}%)</Badge>;
  };

  return (
    <div className="p-6 space-y-6 bg-[rgba(81,130,73,0.43)]">
      {/* Prediction Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>ML Demand Prediction Engine</span>
          </CardTitle>
          <CardDescription>
            Configure conditions to generate accurate demand forecasts using our Random Forest model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Prediction Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weather">Weather Condition</Label>
              <Select value={selectedWeather} onValueChange={setSelectedWeather}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunny">☀️ Sunny</SelectItem>
                  <SelectItem value="cloudy">☁️ Cloudy</SelectItem>
                  <SelectItem value="rainy">🌧️ Rainy</SelectItem>
                  <SelectItem value="snowy">❄️ Snowy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event">Campus Event</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Event</SelectItem>
                  <SelectItem value="sports">🏆 Sports Event</SelectItem>
                  <SelectItem value="exam">📚 Exam Period</SelectItem>
                  <SelectItem value="conference">🎓 Conference</SelectItem>
                  <SelectItem value="holiday">🎉 Holiday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendance">Attendance Factor</Label>
              <Select value={attendanceMultiplier} onValueChange={setAttendanceMultiplier}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.6">Low (0.6x)</SelectItem>
                  <SelectItem value="1.0">Normal (1.0x)</SelectItem>
                  <SelectItem value="1.3">High (1.3x)</SelectItem>
                  <SelectItem value="1.5">Very High (1.5x)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictions by Meal Period */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {['breakfast', 'lunch', 'dinner'].map(mealPeriod => {
          const mealPredictions = todayPredictions.filter(p => p.mealPeriod === mealPeriod);
          const totalDemand = mealPredictions.reduce((sum, p) => sum + p.predictedDemand, 0);
          
          return (
            <Card key={mealPeriod}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="capitalize">{mealPeriod}</span>
                  <Badge variant="outline">{totalDemand} total items</Badge>
                </CardTitle>
                <CardDescription>
                  Predicted demand with confidence intervals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mealPredictions.map(prediction => {
                  const item = menuItems.find(m => m.id === prediction.menuItemId);
                  if (!item) return null;
                  
                  return (
                    <div key={`${prediction.menuItemId}-${mealPeriod}`} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        {getConfidenceBadge(prediction.predictedDemand, prediction.confidenceInterval)}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Demand:</span>
                        <span className="font-medium">{prediction.predictedDemand}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Range:</span>
                        <span>
                          {prediction.confidenceInterval.lower} - {prediction.confidenceInterval.upper}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Weather: {Math.round(prediction.factors.weather * 100)}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Events: {Math.round(prediction.factors.events * 100)}%
                        </Badge>
                      </div>
                      
                      {mealPredictions.indexOf(prediction) < mealPredictions.length - 1 && (
                        <Separator />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Model Performance and Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Importance Analysis</CardTitle>
            <CardDescription>
              Key factors driving demand predictions in our Random Forest model
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { feature: 'Day of Week', importance: 18, description: 'Weekday vs weekend patterns' },
              { feature: 'Meal Period', importance: 16, description: 'Breakfast, lunch, dinner preferences' },
              { feature: 'Historical Average', importance: 15, description: 'Past consumption patterns' },
              { feature: 'Weather Temperature', importance: 12, description: 'Temperature impact on food choices' },
              { feature: 'Campus Events', importance: 11, description: 'Special events and activities' },
              { feature: 'Academic Calendar', importance: 10, description: 'Semester vs break periods' },
              { feature: 'Seasonality', importance: 9, description: 'Monthly and seasonal trends' },
              { feature: 'Menu Popularity', importance: 9, description: 'Historical item popularity' }
            ].map(item => (
              <div key={item.feature} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.feature}</span>
                  <span className="text-sm text-muted-foreground">{item.importance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.importance}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Performance Metrics</CardTitle>
            <CardDescription>
              Statistical performance of our ML prediction system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">82.3%</div>
                <div className="text-sm text-green-700">Model Accuracy</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">0.823</div>
                <div className="text-sm text-blue-700">R² Score</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Multi-output regression for 10 menu items</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">26 engineered features from historical data</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Real-time weather and event integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Confidence intervals for risk management</span>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Model trained on 3,600 records (120 days)
                </span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Includes seasonal patterns, weather effects, and campus event impacts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}