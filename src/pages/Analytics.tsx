
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Lightbulb, Heart, Clock } from 'lucide-react';

const Analytics = () => {
  // Mock data for analytics
  const weeklyData = [
    { day: 'Mon', journalLength: 450, moodScore: 3.5 },
    { day: 'Tue', journalLength: 320, moodScore: 4.2 },
    { day: 'Wed', journalLength: 500, moodScore: 3.8 },
    { day: 'Thu', journalLength: 350, moodScore: 3.2 },
    { day: 'Fri', journalLength: 420, moodScore: 4.5 },
    { day: 'Sat', journalLength: 600, moodScore: 4.8 },
    { day: 'Sun', journalLength: 480, moodScore: 4.0 },
  ];

  const metricCards = [
    {
      title: 'Journal Streak',
      value: '7 Days',
      description: 'Keep going! You\'re building a healthy habit.',
      icon: <Clock className="h-5 w-5 text-neuro-500" />,
    },
    {
      title: 'Mood Trend',
      value: '+15%',
      description: 'Your overall mood is improving week over week.',
      icon: <Heart className="h-5 w-5 text-mindspace-500" />,
    },
    {
      title: 'Insights Generated',
      value: '12',
      description: 'AI has analyzed your entries and found patterns.',
      icon: <Brain className="h-5 w-5 text-neuro-500" />,
    },
    {
      title: 'Reflection Prompts',
      value: '24',
      description: 'You\'ve completed these prompts to aid growth.',
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((card, index) => (
            <Card key={index} className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                  </div>
                  {card.icon}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8b5cf6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#06b6d4" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="journalLength" name="Journal Length (words)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="moodScore" name="Mood Score" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Analytics;
