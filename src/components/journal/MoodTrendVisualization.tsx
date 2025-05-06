
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps 
} from 'recharts';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

// Define the mood data type
interface MoodDataPoint {
  date: string;
  mood: number;
  moodLabel: string;
  entry: string;
}

interface MoodTrendVisualizationProps {
  moodData: MoodDataPoint[];
  currentMood: string;
}

// Map mood names to numeric values for visualization
const moodToValueMap: Record<string, number> = {
  "Happy": 5,
  "Excited": 4.5,
  "Grateful": 4,
  "Calm": 3,
  "Reflective": 2.5,
  "Neutral": 2,
  "Tired": 1.5,
  "Anxious": 1,
  "Sad": 0.5
};

// Convert numeric values back to descriptive labels
const valueToDescriptiveLabel = (value: number): string => {
  if (value >= 4.5) return "Very Positive";
  if (value >= 3.5) return "Positive";
  if (value >= 2.5) return "Neutral";
  if (value >= 1.5) return "Negative";
  return "Very Negative";
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as MoodDataPoint;
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="text-xs text-foreground font-medium">{data.date}</p>
        <p className="text-xs text-muted-foreground">Mood: <span className="font-medium">{data.moodLabel}</span></p>
        <p className="text-xs text-muted-foreground line-clamp-2 max-w-[200px]">{data.entry}</p>
      </div>
    );
  }
  return null;
};

const MoodTrendVisualization: React.FC<MoodTrendVisualizationProps> = ({ moodData, currentMood }) => {
  // Calculate the average mood value
  const totalMoodValue = moodData.reduce((acc, item) => acc + item.mood, 0);
  const averageMood = totalMoodValue / moodData.length;
  const averageMoodLabel = valueToDescriptiveLabel(averageMood);
  
  // Determine if the current mood is better, worse, or the same as the average
  const currentMoodValue = moodToValueMap[currentMood] || 2; // Default to neutral if mood not found
  const moodDifference = currentMoodValue - averageMood;
  
  let trendMessage = "";
  if (moodDifference > 0.5) {
    trendMessage = "Your mood today is more positive than your recent average.";
  } else if (moodDifference < -0.5) {
    trendMessage = "Your mood today is more negative than your recent average.";
  } else {
    trendMessage = "Your mood today is consistent with your recent patterns.";
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-4 border border-neuro-100 dark:border-neuro-800 bg-neuro-50/50 dark:bg-neuro-900/20">
        <h4 className="text-sm font-medium mb-1">Your Mood Trends</h4>
        <p className="text-xs text-muted-foreground mb-4">{trendMessage}</p>
        
        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={moodData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }} 
                stroke="#888888" 
                tickLine={false}
              />
              <YAxis 
                domain={[0, 5]} 
                ticks={[0, 1, 2, 3, 4, 5]} 
                tick={{ fontSize: 10 }} 
                stroke="#888888"
                tickLine={false}
                width={25}
                tickFormatter={(value) => {
                  if (value === 5) return "Very +";
                  if (value === 4) return "+";
                  if (value === 3) return "Neutral";
                  if (value === 2) return "-";
                  if (value === 1) return "Very -";
                  return "";
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="mood"
                strokeWidth={2.5}
                stroke="#8b5cf6"
                dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 3, fill: 'white' }}
                activeDot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 5, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};

export default MoodTrendVisualization;
