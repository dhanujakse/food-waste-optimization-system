import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  TrendingDown, 
  IndianRupee, 
  Target, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Brain,
  Lightbulb
} from "lucide-react";
import { dashboardMetrics } from "../data/mockData";

export function Dashboard() {
  const {
    currentWasteRate,
    projectedSavings,
    wasteReduction,
    dailyWasteItems,
    annualWasteCost,
    roiPaybackMonths
  } = dashboardMetrics;

  const currentWastePercentage = Math.round(currentWasteRate * 100);
  const projectedWastePercentage = Math.round(currentWastePercentage * (1 - wasteReduction));
  const dailyWasteAfter = Math.round(dailyWasteItems * (1 - wasteReduction));

  return (
    <div className="p-6 space-y-6 bg-[rgba(81,130,73,0.43)]">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[rgba(255,255,255,1)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Waste Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWastePercentage}%</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={currentWastePercentage} className="flex-1" />
              <Badge variant="destructive">High</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {dailyWasteItems} items wasted daily
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Waste Cost</CardTitle>
            <IndianRupee className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(annualWasteCost / 100000).toFixed(2)} Lakhs</div>
            <p className="text-xs text-muted-foreground mt-2">
              44,008 items annually
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projected Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{(projectedSavings / 100000).toFixed(2)} Lakhs</div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                {Math.round(wasteReduction * 100)}% reduction
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {dailyWasteAfter} items daily after optimization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Payback</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roiPaybackMonths} months</div>
            <div className="flex items-center space-x-2 mt-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <Badge variant="default" className="bg-blue-100 text-blue-800">
                Fast ROI
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Impact Comparison</CardTitle>
            <CardDescription>Current vs. Optimized Daily Operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[rgba(0,0,0,0)]">
              <div className="flex justify-between text-sm mb-2">
                <span>Current Daily Waste</span>
                <span className="font-medium">{dailyWasteItems} items</span>
              </div>
              <Progress value={100} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Optimized Daily Waste</span>
                <span className="font-medium text-green-600">{dailyWasteAfter} items</span>
              </div>
              <Progress value={Math.round((1 - wasteReduction) * 100)} className="h-3" />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">
                  Daily Reduction: {dailyWasteItems - dailyWasteAfter} items
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                ₹{Math.round((dailyWasteItems - dailyWasteAfter) * 120).toLocaleString()} saved per day
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ML Model Performance</CardTitle>
            <CardDescription>Random Forest Prediction Accuracy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Model Accuracy</span>
                  <span className="font-medium">82.3%</span>
                </div>
                <Progress value={82.3} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>R² Score</span>
                  <span className="font-medium">0.823</span>
                </div>
                <Progress value={82.3} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Confidence Level</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <Progress value={94.2} className="h-3" />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">High Accuracy Model</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                26 engineered features across weather, events, and historical patterns
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap</CardTitle>
          <CardDescription>5-Minute Demo Flow for Stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-medium">Problem</h4>
              <p className="text-sm text-muted-foreground">₹1.74 Cr waste problem</p>
              <Badge variant="outline" className="mt-1">30s</Badge>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium">Live Prediction</h4>
              <p className="text-sm text-muted-foreground">Demand forecasts</p>
              <Badge variant="outline" className="mt-1">90s</Badge>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium">Optimization</h4>
              <p className="text-sm text-muted-foreground">Menu recommendations</p>
              <Badge variant="outline" className="mt-1">90s</Badge>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium">ROI Impact</h4>
              <p className="text-sm text-muted-foreground">₹25.7 Lakh savings</p>
              <Badge variant="outline" className="mt-1">60s</Badge>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="font-medium">Q&A</h4>
              <p className="text-sm text-muted-foreground">Interactive demo</p>
              <Badge variant="outline" className="mt-1">60s</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}