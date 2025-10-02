import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { Predictions } from "./components/Predictions";
import { Optimization } from "./components/Optimization";
import { Analytics } from "./components/Analytics";
import { Scenarios } from "./components/Scenarios";
import { Insights } from "./components/Insights";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "predictions":
        return <Predictions />;
      case "optimization":
        return <Optimization />;
      case "analytics":
        return <Analytics />;
      case "scenarios":
        return <Scenarios />;
      case "insights":
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="h-[calc(100vh-80px)] overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}