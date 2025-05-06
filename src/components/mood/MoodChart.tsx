
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Mock data for the mood chart
const moodData = [
  { date: '04/01', mood: 3, energy: 2 },
  { date: '04/02', mood: 4, energy: 3 },
  { date: '04/03', mood: 2, energy: 2 },
  { date: '04/04', mood: 3, energy: 4 },
  { date: '04/05', mood: 5, energy: 3 },
  { date: '04/06', mood: 4, energy: 5 },
  { date: '04/07', mood: 3, energy: 4 },
];

const MoodChart = () => {
  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
      <CardHeader>
        <CardTitle>Mood & Energy Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={moodData}
              margin={{
                top: 5,
                right: 10,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                stroke="#888888" 
                tickLine={false}
              />
              <YAxis 
                domain={[0, 5]} 
                ticks={[1, 2, 3, 4, 5]} 
                tick={{ fontSize: 12 }} 
                stroke="#888888"
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                strokeWidth={3}
                stroke="#8b5cf6"
                dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 6, fill: 'white' }}
              />
              <Line
                type="monotone"
                dataKey="energy"
                strokeWidth={3}
                stroke="#06b6d4"
                dot={{ stroke: '#06b6d4', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ stroke: '#06b6d4', strokeWidth: 2, r: 6, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-mindspace-500 mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Mood</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-neuro-500 mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Energy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChart;
