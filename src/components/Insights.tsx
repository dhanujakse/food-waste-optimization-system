import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Users,
  Calendar,
  Award,
  BarChart3
} from "lucide-react";

export function Insights() {
  const insights = [
    {
      id: 1,
      type: "cost_saving",
      title: "High-Impact Menu Optimization",
      description: "Focus on burger and pizza correlation (0.945) to maximize efficiency",
      impact: "high",
      savings: 1240,
      confidence: 94,
      timeframe: "immediate",
      icon: DollarSign,
      details: [
        "Burgers and pizza show strongest demand correlation",
        "Serving together reduces individual preparation waste",
        "Can reduce combined waste by 32% through coordinated preparation",
        "Implement immediately for maximum impact"
      ]
    },
    {
      id: 2,
      type: "prediction",
      title: "Weather-Based Demand Patterns",
      description: "Rainy days reduce demand by 15%, sunny days increase by 8%",
      impact: "medium",
      accuracy: 89,
      confidence: 87,
      timeframe: "daily",
      icon: TrendingUp,
      details: [
        "Temperature below 10°C reduces salad demand by 40%",
        "Rainy weather increases soup consumption by 65%",
        "Hot weather (>25°C) boosts cold beverage sales by 45%",
        "Integrate weather API for automatic adjustments"
      ]
    },
    {
      id: 3,
      type: "waste_reduction",
      title: "Critical Waste Window",
      description: "70% of waste occurs in the final 30 minutes of each meal period",
      impact: "high",
      reduction: 48,
      confidence: 92,
      timeframe: "immediate",
      icon: AlertTriangle,
      details: [
        "Items prepared in final 30 minutes have 60% waste rate",
        "Implement dynamic pricing 45 minutes before closing",
        "Stop fresh preparation 1 hour before meal end",
        "Could eliminate 180 wasted items daily"
      ]
    },
    {
      id: 4,
      type: "seasonal",
      title: "Academic Calendar Optimization",
      description: "Adjust preparation by 40% during exam weeks and breaks",
      impact: "high",
      savings: 890,
      confidence: 96,
      timeframe: "semester",
      icon: Calendar,
      details: [
        "Exam weeks show 25% reduced dining traffic",
        "First week of semester has 50% higher demand",
        "Spring break eliminates 90% of normal demand",
        "Summer sessions require 70% capacity reduction"
      ]
    },
    {
      id: 5,
      type: "efficiency",
      title: "Menu Popularity Insights",
      description: "5 items generate 80% of revenue but only 45% of waste",
      impact: "medium",
      efficiency: 85,
      confidence: 91,
      timeframe: "ongoing",
      icon: BarChart3,
      details: [
        "Pizza, burgers, fries, soda, and chicken drive revenue",
        "These items have most predictable demand patterns",
        "Focus inventory management on these core items",
        "Reduce variety during low-demand periods"
      ]
    },
    {
      id: 6,
      type: "innovation",
      title: "Smart Preparation Timing",
      description: "Stagger preparation based on historical consumption curves",
      impact: "high",
      reduction: 35,
      confidence: 88,
      timeframe: "weekly",
      icon: Target,
      details: [
        "Lunch demand peaks 20 minutes after opening",
        "Dinner has two peaks: early (5:30) and late (7:15)",
        "Breakfast demand is most consistent throughout period",
        "Implement 3-wave preparation strategy"
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactIcon = (type: string) => {
    switch (type) {
      case 'cost_saving': return DollarSign;
      case 'prediction': return TrendingUp;
      case 'waste_reduction': return AlertTriangle;
      case 'seasonal': return Calendar;
      case 'efficiency': return BarChart3;
      case 'innovation': return Target;
      default: return Lightbulb;
    }
  };

  const summaryStats = {
    totalInsights: insights.length,
    highImpact: insights.filter(i => i.impact === 'high').length,
    averageConfidence: Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length),
    implementable: insights.filter(i => i.timeframe === 'immediate' || i.timeframe === 'daily').length
  };

  return (
    <div className="p-6 space-y-6 bg-[rgba(81,130,73,0.43)]">
      {/* Summary Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>AI-Generated Insights & Recommendations</span>
          </CardTitle>
          <CardDescription>
            Data-driven recommendations to optimize your food service operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{summaryStats.totalInsights}</div>
              <div className="text-sm text-blue-700">Total Insights</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{summaryStats.highImpact}</div>
              <div className="text-sm text-red-700">High Impact</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{summaryStats.averageConfidence}%</div>
              <div className="text-sm text-green-700">Avg Confidence</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{summaryStats.implementable}</div>
              <div className="text-sm text-purple-700">Ready to Implement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const IconComponent = getImpactIcon(insight.type);
          return (
            <Card key={insight.id} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription>{insight.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {insight.savings && (
                    <div>
                      <div className="font-medium text-green-600">${insight.savings}</div>
                      <div className="text-muted-foreground">Daily Savings</div>
                    </div>
                  )}
                  {insight.reduction && (
                    <div>
                      <div className="font-medium text-blue-600">{insight.reduction}%</div>
                      <div className="text-muted-foreground">Waste Reduction</div>
                    </div>
                  )}
                  {insight.accuracy && (
                    <div>
                      <div className="font-medium text-purple-600">{insight.accuracy}%</div>
                      <div className="text-muted-foreground">Accuracy</div>
                    </div>
                  )}
                  {insight.efficiency && (
                    <div>
                      <div className="font-medium text-orange-600">{insight.efficiency}%</div>
                      <div className="text-muted-foreground">Efficiency</div>
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{insight.confidence}%</div>
                    <div className="text-muted-foreground">Confidence</div>
                  </div>
                  <div>
                    <div className="font-medium capitalize">{insight.timeframe}</div>
                    <div className="text-muted-foreground">Timeframe</div>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Implementation Confidence</span>
                    <span>{insight.confidence}%</span>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                </div>

                <Separator />

                {/* Detailed Recommendations */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Detailed Recommendations:</h4>
                  <ul className="space-y-1">
                    {insight.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Implementation Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Priority Matrix</CardTitle>
          <CardDescription>
            Recommended order for implementing insights based on impact and ease
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Immediate Actions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">1</span>
                </div>
                <h4 className="font-medium">Immediate (This Week)</h4>
              </div>
              <div className="space-y-2 ml-10">
                <div className="text-sm p-2 bg-red-50 rounded border-l-2 border-red-500">
                  Critical Waste Window optimization
                </div>
                <div className="text-sm p-2 bg-red-50 rounded border-l-2 border-red-500">
                  Burger-Pizza correlation menu pairing
                </div>
              </div>
            </div>

            {/* Short Term */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-yellow-600 font-bold text-sm">2</span>
                </div>
                <h4 className="font-medium">Short Term (2-4 weeks)</h4>
              </div>
              <div className="space-y-2 ml-10">
                <div className="text-sm p-2 bg-yellow-50 rounded border-l-2 border-yellow-500">
                  Weather API integration
                </div>
                <div className="text-sm p-2 bg-yellow-50 rounded border-l-2 border-yellow-500">
                  Smart preparation timing
                </div>
              </div>
            </div>

            {/* Medium Term */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <h4 className="font-medium">Medium Term (1-2 months)</h4>
              </div>
              <div className="space-y-2 ml-10">
                <div className="text-sm p-2 bg-blue-50 rounded border-l-2 border-blue-500">
                  Academic calendar integration
                </div>
                <div className="text-sm p-2 bg-blue-50 rounded border-l-2 border-blue-500">
                  Menu popularity optimization
                </div>
              </div>
            </div>

            {/* Long Term */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">4</span>
                </div>
                <h4 className="font-medium">Long Term (3+ months)</h4>
              </div>
              <div className="space-y-2 ml-10">
                <div className="text-sm p-2 bg-green-50 rounded border-l-2 border-green-500">
                  Full seasonal model deployment
                </div>
                <div className="text-sm p-2 bg-green-50 rounded border-l-2 border-green-500">
                  Advanced correlation analysis
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Success Metrics & KPIs</span>
          </CardTitle>
          <CardDescription>
            Track these metrics to measure the impact of implemented insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>Waste Reduction</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Target:</span>
                  <span className="font-medium">48.8% reduction</span>
                </div>
                <div className="flex justify-between">
                  <span>Current:</span>
                  <span className="text-red-600">36.5% waste rate</span>
                </div>
                <div className="flex justify-between">
                  <span>Goal:</span>
                  <span className="text-green-600">18.7% waste rate</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span>Cost Savings</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Daily Target:</span>
                  <span className="font-medium">$879</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Target:</span>
                  <span className="font-medium">$26,370</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Target:</span>
                  <span className="font-medium text-green-600">$321,134</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center space-x-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span>Accuracy Metrics</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Prediction Accuracy:</span>
                  <span className="font-medium">82.3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Accuracy:</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Model R² Score:</span>
                  <span className="font-medium">0.823</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span>Operational KPIs</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items/Day:</span>
                  <span className="font-medium">2,850</span>
                </div>
                <div className="flex justify-between">
                  <span>Prep Accuracy:</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Quality:</span>
                  <span className="font-medium text-green-600">Maintained</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}