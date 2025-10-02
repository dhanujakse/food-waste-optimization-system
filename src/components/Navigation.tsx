import { Button } from "./ui/button";
import { 
  BarChart3, 
  Brain, 
  Settings, 
  TrendingUp, 
  Calendar, 
  Lightbulb,
  ChefHat 
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'predictions', label: 'Predictions', icon: Brain },
  { id: 'optimization', label: 'Optimization', icon: Settings },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'scenarios', label: 'Scenarios', icon: Calendar },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="bg-[rgba(63,121,47,1)] border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[rgba(0,0,0,1)] p-2 rounded-lg">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[rgba(255,255,255,1)]">Campus Dining Intelligence</h1>
            <p className="text-sm text-[rgba(173,206,172,1)]">Food Waste Optimization System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className="flex items-center space-x-2 text-[rgba(255,255,255,1)]"
              >
                <Icon className="h-4 w-4" />
                <span className="text-[rgba(255,255,255,1)]">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}