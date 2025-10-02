import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  Settings, 
  Target, 
  TrendingDown, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Lightbulb
} from "lucide-react";
import { menuItems, menuCorrelations, generatePredictions } from "../data/mockData";

export function Optimization() {
  const [optimizationRunning, setOptimizationRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const predictions = generatePredictions();
  const todayPredictions = predictions.filter(p => p.date === "2024-09-27");

  const runOptimization = () => {
    setOptimizationRunning(true);
    setTimeout(() => {
      setOptimizationRunning(false);
      setShowResults(true);
    }, 2000);
  };

  // Calculate optimization results
  const optimizationResults = menuItems.map(item => {
    const itemPredictions = todayPredictions.filter(p => p.menuItemId === item.id);
    const totalDemand = itemPredictions.reduce((sum, p) => sum + p.predictedDemand, 0);
    const averageConfidence = itemPredictions.reduce((sum, p) => {
      const range = p.confidenceInterval.upper - p.confidenceInterval.lower;
      return sum + (1 - (range / p.predictedDemand));
    }, 0) / itemPredictions.length;
    
    const safetyStockMultiplier = averageConfidence > 0.8 ? 1.1 : averageConfidence > 0.6 ? 1.2 : 1.3;
    const recommendedQuantity = Math.round(totalDemand * safetyStockMultiplier);
    const currentWaste = Math.round(totalDemand * 0.365); // Current 36.5% waste rate
    const projectedWaste = Math.round(totalDemand * 0.12); // Optimized 12% waste rate
    const costSavings = (currentWaste - projectedWaste) * item.cost;
    
    return {
      menuItemId: item.id,
      itemName: item.name,
      predictedDemand: totalDemand,
      recommendedQuantity,
      safetyStock: recommendedQuantity - totalDemand,
      currentWaste,
      projectedWaste,
      wasteReduction: ((currentWaste - projectedWaste) / currentWaste) * 100,
      costSavings,
      confidence: Math.round(averageConfidence * 100)
    };
  });

  const totalCurrentWaste = optimizationResults.reduce((sum, r) => sum + r.currentWaste, 0);
  const totalProjectedWaste = optimizationResults.reduce((sum, r) => sum + r.projectedWaste, 0);
  const totalCostSavings = optimizationResults.reduce((sum, r) => sum + r.costSavings, 0);
  const overallReduction = ((totalCurrentWaste - totalProjectedWaste) / totalCurrentWaste) * 100;

  return (
    <div className="p-6 space-y-6 bg-[rgba(81,130,73,0.43)]">
      {/* Optimization Engine Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Menu Optimization Engine</span>
          </CardTitle>
          <CardDescription>
            Generate optimal procurement and preparation recommendations to minimize waste while preventing shortages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={runOptimization}
              disabled={optimizationRunning}
              className="flex items-center space-x-2"
            >
              {optimizationRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Running Optimization...</span>
                </>
              ) : (
                <>
                  <Target className="h-4 w-4" />
                  <span>Run Optimization</span>
                </>
              )}
            </Button>
            
            {showResults && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-700 font-medium">Optimization Complete</span>
                <Badge className="bg-green-100 text-green-800">
                  {Math.round(overallReduction)}% waste reduction
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(overallReduction)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Waste Reduction</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{Math.round(totalCostSavings).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Daily Savings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {totalCurrentWaste}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Waste</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {totalProjectedWaste}
                  </div>
                  <div className="text-sm text-muted-foreground">Projected Waste</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Optimization Results */}
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Recommendations</CardTitle>
            <CardDescription>
              Detailed preparation quantities and waste projections for each menu item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Menu Item</TableHead>
                  <TableHead>Predicted Demand</TableHead>
                  <TableHead>Recommended Prep</TableHead>
                  <TableHead>Safety Stock</TableHead>
                  <TableHead>Current Waste</TableHead>
                  <TableHead>Projected Waste</TableHead>
                  <TableHead>Reduction</TableHead>
                  <TableHead>Daily Savings</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {optimizationResults.map((result) => (
                  <TableRow key={result.menuItemId}>
                    <TableCell className="font-medium">{result.itemName}</TableCell>
                    <TableCell>{result.predictedDemand}</TableCell>
                    <TableCell className="font-medium text-blue-600">
                      {result.recommendedQuantity}
                    </TableCell>
                    <TableCell>{result.safetyStock}</TableCell>
                    <TableCell className="text-red-600">{result.currentWaste}</TableCell>
                    <TableCell className="text-green-600">{result.projectedWaste}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {Math.round(result.wasteReduction)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      ₹{Math.round(result.costSavings)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={result.confidence > 80 ? "default" : result.confidence > 60 ? "secondary" : "destructive"}
                        className={
                          result.confidence > 80 
                            ? "bg-green-100 text-green-800"
                            : result.confidence > 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {result.confidence}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Menu Correlation Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>Menu Correlation Analysis</span>
          </CardTitle>
          <CardDescription>
            Items that complement each other for optimal menu planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuCorrelations.map((correlation, index) => {
              const item1 = menuItems.find(m => m.id === correlation.item1);
              const item2 = menuItems.find(m => m.id === correlation.item2);
              
              if (!item1 || !item2) return null;
              
              return (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item1.name}</span>
                      <span className="text-muted-foreground">+</span>
                      <span className="font-medium">{item2.name}</span>
                    </div>
                    <Badge 
                      className={
                        correlation.correlation > 0.8 
                          ? "bg-green-100 text-green-800"
                          : correlation.correlation > 0.6
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {correlation.correlation.toFixed(3)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Correlation Strength</span>
                      <span className="font-medium">
                        {correlation.correlation > 0.8 ? 'Very Strong' : 
                         correlation.correlation > 0.6 ? 'Strong' : 'Moderate'}
                      </span>
                    </div>
                    <Progress value={correlation.correlation * 100} className="h-2" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 capitalize">
                      {correlation.recommendation} items - serve together for optimal demand
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Implementation Guidelines</CardTitle>
            <CardDescription>
              Step-by-step process to implement optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h4 className="font-medium">Morning Preparation</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-10">
                  <li>• Review daily predictions at 6 AM</li>
                  <li>• Adjust preparation quantities based on recommendations</li>
                  <li>• Consider weather and event impacts</li>
                  <li>• Set up safety stock for high-uncertainty items</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h4 className="font-medium">Real-time Monitoring</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-10">
                  <li>• Track consumption vs predictions</li>
                  <li>• Adjust during service based on actual demand</li>
                  <li>• Implement dynamic repricing for excess items</li>
                  <li>• Monitor complementary item pairings</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h4 className="font-medium">Daily Review</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-10">
                  <li>• Record actual waste vs projections</li>
                  <li>• Update model with new consumption data</li>
                  <li>• Calculate daily cost savings achieved</li>
                  <li>• Plan menu adjustments for next day</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}