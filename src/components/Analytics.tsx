import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { generateHistoricalData, menuItems } from "../data/mockData";

export function Analytics() {
  const historicalData = generateHistoricalData();
  
  // Process data for visualizations
  const processWasteByItem = () => {
    const wasteByItem = menuItems.map(item => {
      const itemData = historicalData.filter(record => record.menuItemId === item.id);
      const totalWaste = itemData.reduce((sum, record) => sum + record.wasted, 0);
      const totalCost = itemData.reduce((sum, record) => sum + record.cost, 0);
      const wasteRate = itemData.length > 0 ? 
        itemData.reduce((sum, record) => sum + (record.wasted / record.prepared), 0) / itemData.length : 0;
      
      return {
        name: item.name,
        waste: totalWaste,
        cost: Math.round(totalCost),
        rate: Math.round(wasteRate * 100),
        category: item.category
      };
    });
    
    return wasteByItem.sort((a, b) => b.waste - a.waste);
  };

  const processWasteByDay = () => {
    const wasteByDay = [];
    const uniqueDates = [...new Set(historicalData.map(record => record.date))].sort();
    
    uniqueDates.slice(-30).forEach(date => {
      const dayData = historicalData.filter(record => record.date === date);
      const totalWaste = dayData.reduce((sum, record) => sum + record.wasted, 0);
      const totalPrepared = dayData.reduce((sum, record) => sum + record.prepared, 0);
      const totalCost = dayData.reduce((sum, record) => sum + record.cost, 0);
      const wasteRate = totalPrepared > 0 ? (totalWaste / totalPrepared) * 100 : 0;
      
      wasteByDay.push({
        date: new Date(date).toLocaleDateString(),
        waste: totalWaste,
        wasteRate: Math.round(wasteRate),
        cost: Math.round(totalCost),
        prepared: totalPrepared
      });
    });
    
    return wasteByDay;
  };

  const processWasteByMeal = () => {
    const meals = ['breakfast', 'lunch', 'dinner'];
    return meals.map(meal => {
      const mealData = historicalData.filter(record => record.mealPeriod === meal);
      const totalWaste = mealData.reduce((sum, record) => sum + record.wasted, 0);
      const totalCost = mealData.reduce((sum, record) => sum + record.cost, 0);
      
      return {
        meal: meal.charAt(0).toUpperCase() + meal.slice(1),
        waste: totalWaste,
        cost: Math.round(totalCost)
      };
    });
  };

  const processWasteByCategory = () => {
    const categories = ['protein', 'vegetarian', 'sides', 'beverages', 'desserts'];
    return categories.map(category => {
      const categoryItems = menuItems.filter(item => item.category === category);
      const categoryData = historicalData.filter(record => 
        categoryItems.some(item => item.id === record.menuItemId)
      );
      
      const totalWaste = categoryData.reduce((sum, record) => sum + record.wasted, 0);
      const totalCost = categoryData.reduce((sum, record) => sum + record.cost, 0);
      
      return {
        category: category.charAt(0).toUpperCase() + category.slice(1),
        waste: totalWaste,
        cost: Math.round(totalCost),
        percentage: Math.round((totalWaste / historicalData.reduce((sum, r) => sum + r.wasted, 0)) * 100)
      };
    });
  };

  const wasteByItem = processWasteByItem();
  const wasteByDay = processWasteByDay();
  const wasteByMeal = processWasteByMeal();
  const wasteByCategory = processWasteByCategory();

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const totalWaste = historicalData.reduce((sum, record) => sum + record.wasted, 0);
  const totalCost = historicalData.reduce((sum, record) => sum + record.cost, 0);
  const averageDailyWaste = Math.round(totalWaste / 120);
  const currentWasteRate = 36.5; // From dashboard metrics

  return (
    <div className="p-6 space-y-6 bg-[rgba(81,130,73,0.43)]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{totalWaste.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Items Wasted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">${Math.round(totalCost).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Waste Cost</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{averageDailyWaste}</div>
                <div className="text-sm text-muted-foreground">Avg Daily Waste</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{currentWasteRate}%</div>
                <div className="text-sm text-muted-foreground">Current Waste Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Waste Trends</TabsTrigger>
          <TabsTrigger value="items">By Menu Item</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Waste Trend (Last 30 Days)</CardTitle>
                <CardDescription>
                  Number of items wasted per day over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={wasteByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="waste" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Waste Rate Trend</CardTitle>
                <CardDescription>
                  Percentage of prepared food wasted daily
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={wasteByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Waste Rate']} />
                    <Line type="monotone" dataKey="wasteRate" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Waste by Meal Period</CardTitle>
              <CardDescription>
                Total waste distribution across breakfast, lunch, and dinner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={wasteByMeal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="meal" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="waste" fill="#3B82F6" name="Items Wasted" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Waste by Menu Item</CardTitle>
              <CardDescription>
                Items with the highest waste quantities and costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={wasteByItem} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="waste" fill="#EF4444" name="Items Wasted" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waste Rate by Item</CardTitle>
              <CardDescription>
                Percentage of prepared quantity that gets wasted for each item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wasteByItem.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="capitalize">{item.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">{item.rate}%</div>
                        <div className="text-sm text-muted-foreground">${item.cost} lost</div>
                      </div>
                      <div className="w-24">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(item.rate, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Waste Distribution by Category</CardTitle>
                <CardDescription>
                  Breakdown of waste across food categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={wasteByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="waste"
                    >
                      {wasteByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Impact by Category</CardTitle>
                <CardDescription>
                  Financial impact of waste across food categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={wasteByCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                    <Bar dataKey="cost" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>
                  Important patterns discovered in the waste data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-800">High Waste Items</span>
                  </div>
                  <p className="text-sm text-red-700 mt-2">
                    Salads and sandwiches show highest waste rates (40%+) due to short shelf life
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Peak Waste Periods</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    Lunch period generates 45% of daily waste, suggesting over-preparation
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Improvement Opportunities</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    Pizza and burgers have consistent demand patterns, easier to optimize
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Cost Concentration</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-2">
                    70% of waste costs come from protein items (burgers, chicken, etc.)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Patterns</CardTitle>
                <CardDescription>
                  How waste varies throughout the academic year
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Fall Semester</span>
                      <Badge className="bg-red-100 text-red-800">High Waste</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Peak enrollment leads to over-preparation
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Spring Semester</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Medium Waste</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Better prediction accuracy from fall data
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Summer Break</span>
                      <Badge className="bg-green-100 text-green-800">Low Waste</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Reduced service matches lower demand
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}