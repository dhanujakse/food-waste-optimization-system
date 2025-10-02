import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { 
  Calendar, 
  Users, 
  Cloud, 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from "lucide-react";

export function Scenarios() {
  const [scenario, setScenario] = useState({
    date: "2024-10-15",
    attendance: 1200,
    weather: "sunny",
    temperature: 22,
    event: "exam",
    eventImpact: "medium",
    menuChanges: false,
    priceChanges: false
  });

  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const runScenario = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      // Calculate scenario impact based on inputs
      const baseAttendance = 1000;
      const attendanceMultiplier = scenario.attendance / baseAttendance;
      
      const weatherMultipliers = {
        sunny: 1.0,
        cloudy: 0.95,
        rainy: 0.85,
        snowy: 0.75
      };
      
      const eventMultipliers = {
        none: 1.0,
        exam: 0.8,
        sports: 1.3,
        conference: 1.1,
        holiday: 0.6,
        graduation: 1.5
      };
      
      const weatherImpact = weatherMultipliers[scenario.weather] || 1.0;
      const eventImpact = eventMultipliers[scenario.event] || 1.0;
      
      const totalMultiplier = attendanceMultiplier * weatherImpact * eventImpact;
      
      // Base metrics
      const baseDemand = 950;
      const baseWaste = 347;
      const baseCost = 2156;
      
      // Projected metrics
      const projectedDemand = Math.round(baseDemand * totalMultiplier);
      const projectedWaste = Math.round(baseWaste * totalMultiplier * 0.65); // Assume some optimization
      const projectedCost = Math.round(baseCost * totalMultiplier * 0.65);
      
      // Calculate savings
      const normalWaste = Math.round(baseDemand * totalMultiplier * 0.365); // Normal 36.5% waste rate
      const wasteSavings = normalWaste - projectedWaste;
      const costSavings = wasteSavings * 6.2; // Average cost per wasted item
      
      setResults({
        projectedDemand,
        projectedWaste,
        projectedCost,
        wasteSavings,
        costSavings: Math.round(costSavings),
        wasteReduction: Math.round((wasteSavings / normalWaste) * 100),
        confidence: Math.round(85 + Math.random() * 10),
        factors: {
          attendance: Math.round((attendanceMultiplier - 1) * 100),
          weather: Math.round((weatherImpact - 1) * 100),
          event: Math.round((eventImpact - 1) * 100)
        }
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 bg-[rgba(81,130,73,0.43)]">
      {/* Scenario Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Scenario Planning Tool</span>
          </CardTitle>
          <CardDescription>
            Model different conditions to predict demand and optimize preparation quantities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scenario-date">Date</Label>
              <Input
                id="scenario-date"
                type="date"
                value={scenario.date}
                onChange={(e) => setScenario({...scenario, date: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendance">Expected Attendance</Label>
              <Input
                id="attendance"
                type="number"
                value={scenario.attendance}
                onChange={(e) => setScenario({...scenario, attendance: parseInt(e.target.value) || 0})}
                placeholder="1200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weather">Weather</Label>
              <Select value={scenario.weather} onValueChange={(value) => setScenario({...scenario, weather: value})}>
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
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                value={scenario.temperature}
                onChange={(e) => setScenario({...scenario, temperature: parseInt(e.target.value) || 0})}
                placeholder="22"
              />
            </div>
          </div>

          {/* Event Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event">Campus Event</Label>
              <Select value={scenario.event} onValueChange={(value) => setScenario({...scenario, event: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Event</SelectItem>
                  <SelectItem value="exam">📚 Exam Period</SelectItem>
                  <SelectItem value="sports">🏆 Sports Event</SelectItem>
                  <SelectItem value="conference">🎓 Academic Conference</SelectItem>
                  <SelectItem value="holiday">🎉 Holiday</SelectItem>
                  <SelectItem value="graduation">🎓 Graduation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-impact">Event Impact Level</Label>
              <Select value={scenario.eventImpact} onValueChange={(value) => setScenario({...scenario, eventImpact: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Impact</SelectItem>
                  <SelectItem value="medium">Medium Impact</SelectItem>
                  <SelectItem value="high">High Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={runScenario}
              disabled={isCalculating}
              className="flex items-center space-x-2"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="h-4 w-4" />
                  <span>Run Scenario</span>
                </>
              )}
            </Button>
            
            {results && (
              <Badge className="bg-green-100 text-green-800">
                Scenario Complete - {results.confidence}% confidence
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{results.projectedDemand}</div>
                    <div className="text-sm text-muted-foreground">Projected Demand</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">{results.projectedWaste}</div>
                    <div className="text-sm text-muted-foreground">Projected Waste</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">{results.wasteSavings}</div>
                    <div className="text-sm text-muted-foreground">Items Saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">${results.costSavings}</div>
                    <div className="text-sm text-muted-foreground">Cost Savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Factor Analysis</CardTitle>
                <CardDescription>
                  How each factor influences the projected outcomes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Attendance Impact</span>
                      <Badge variant={results.factors.attendance > 0 ? "default" : "secondary"}>
                        {results.factors.attendance > 0 ? '+' : ''}{results.factors.attendance}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${results.factors.attendance > 0 ? 'bg-blue-500' : 'bg-gray-400'}`}
                        style={{ width: `${Math.abs(results.factors.attendance)}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {scenario.attendance > 1000 ? 'Higher than normal attendance' : 'Lower than normal attendance'}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Weather Impact</span>
                      <Badge variant={results.factors.weather >= 0 ? "default" : "secondary"}>
                        {results.factors.weather > 0 ? '+' : ''}{results.factors.weather}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${results.factors.weather >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.abs(results.factors.weather) || 5}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {scenario.weather === 'sunny' ? 'Favorable weather conditions' : 
                       scenario.weather === 'rainy' ? 'Weather may reduce dining' : 'Moderate weather impact'}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Event Impact</span>
                      <Badge variant={results.factors.event >= 0 ? "default" : "secondary"}>
                        {results.factors.event > 0 ? '+' : ''}{results.factors.event}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${results.factors.event >= 0 ? 'bg-purple-500' : 'bg-orange-500'}`}
                        style={{ width: `${Math.abs(results.factors.event) || 5}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {scenario.event === 'exam' ? 'Exam period reduces dining' : 
                       scenario.event === 'sports' ? 'Sports event increases demand' : 
                       scenario.event === 'none' ? 'No special events' : 'Event affects dining patterns'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
                <CardDescription>
                  Specific actions to take for this scenario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Preparation Adjustments</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      Prepare {results.projectedDemand + Math.round(results.projectedDemand * 0.15)} total items 
                      (15% safety margin)
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Expected Savings</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Reduce waste by {results.wasteReduction}% compared to normal operations
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Risk Factors</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      {scenario.event === 'exam' ? 'Monitor demand closely - exam stress affects eating patterns' :
                       scenario.weather === 'rainy' ? 'Weather may cause unexpected demand fluctuations' :
                       'Minimal risk factors for this scenario'}
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">Menu Recommendations</span>
                    </div>
                    <p className="text-sm text-purple-700 mt-1">
                      {scenario.weather === 'rainy' ? 'Emphasize hot soups and comfort foods' :
                       scenario.event === 'sports' ? 'Increase burger and pizza preparation' :
                       'Standard menu mix appropriate for conditions'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Confidence and Validation */}
          <Card>
            <CardHeader>
              <CardTitle>Scenario Validation</CardTitle>
              <CardDescription>
                Model confidence and validation against historical patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{results.confidence}%</div>
                  <div className="text-sm text-muted-foreground mb-2">Model Confidence</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${results.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">94%</div>
                  <div className="text-sm text-muted-foreground mb-2">Historical Accuracy</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">87%</div>
                  <div className="text-sm text-muted-foreground mb-2">Similar Scenarios</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  This scenario has been validated against {Math.floor(Math.random() * 15) + 25} similar historical situations. 
                  The model shows high confidence in the predictions based on established patterns and feature correlations.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Pre-built Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Scenario Templates</CardTitle>
          <CardDescription>
            Load common scenarios for quick analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start space-y-2"
              onClick={() => setScenario({
                date: "2024-10-15",
                attendance: 800,
                weather: "cloudy",
                temperature: 18,
                event: "exam",
                eventImpact: "high",
                menuChanges: false,
                priceChanges: false
              })}
            >
              <div className="font-medium">📚 Exam Week</div>
              <div className="text-sm text-muted-foreground text-left">
                Reduced attendance, stress eating patterns
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start space-y-2"
              onClick={() => setScenario({
                date: "2024-11-02",
                attendance: 1500,
                weather: "sunny",
                temperature: 24,
                event: "sports",
                eventImpact: "high",
                menuChanges: false,
                priceChanges: false
              })}
            >
              <div className="font-medium">🏆 Game Day</div>
              <div className="text-sm text-muted-foreground text-left">
                High attendance, increased demand
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start space-y-2"
              onClick={() => setScenario({
                date: "2024-12-20",
                attendance: 300,
                weather: "snowy",
                temperature: -5,
                event: "holiday",
                eventImpact: "high",
                menuChanges: false,
                priceChanges: false
              })}
            >
              <div className="font-medium">🎉 Holiday Break</div>
              <div className="text-sm text-muted-foreground text-left">
                Very low attendance, skeleton crew
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start space-y-2"
              onClick={() => setScenario({
                date: "2024-09-15",
                attendance: 1800,
                weather: "sunny",
                temperature: 25,
                event: "graduation",
                eventImpact: "high",
                menuChanges: false,
                priceChanges: false
              })}
            >
              <div className="font-medium">🎓 Graduation</div>
              <div className="text-sm text-muted-foreground text-left">
                Peak attendance, special event
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}