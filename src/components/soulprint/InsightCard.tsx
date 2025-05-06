
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ChevronRight, TrendingUp, Lightbulb } from 'lucide-react';

const InsightCard = () => {
  // Mock insights data
  const insights = [
    {
      title: "Emotional Patterns",
      description: "You tend to experience higher mood states in the morning, with a slight dip in the afternoon.",
      icon: <TrendingUp className="h-5 w-5 text-mindspace-500" />
    },
    {
      title: "Growth Opportunity",
      description: "Consider practicing mindfulness during afternoon hours to maintain your energy levels throughout the day.",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Strength Identified",
      description: "Your journaling shows high resilience when facing challenges in your professional life.",
      icon: <Brain className="h-5 w-5 text-neuro-500" />
    }
  ];

  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI-Generated Insights</CardTitle>
        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center">
          <span>More Insights</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-2">
            <div className="flex items-center space-x-2">
              {insight.icon}
              <h3 className="font-medium">{insight.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{insight.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default InsightCard;
