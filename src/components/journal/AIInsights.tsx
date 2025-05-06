
import React from 'react';
import { Sparkles, Award, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import MoodTrendVisualization from './MoodTrendVisualization';

interface AIInsightsProps {
  isAnalyzing: boolean;
  aiInsights: string | null;
  mood?: string;
}

// Mock data for previous journal entries
const mockPreviousEntries = [
  { date: '6 days ago', mood: 4, moodLabel: 'Happy', entry: 'Had a great day at the park with friends.' },
  { date: '5 days ago', mood: 3, moodLabel: 'Calm', entry: 'Focused on work and made good progress.' },
  { date: '4 days ago', mood: 2, moodLabel: 'Neutral', entry: 'Regular day, nothing special.' },
  { date: '3 days ago', mood: 1, moodLabel: 'Anxious', entry: 'Worried about the upcoming presentation.' },
  { date: '2 days ago', mood: 2.5, moodLabel: 'Reflective', entry: 'Thinking about my goals and progress.' },
  { date: 'Yesterday', mood: 3.5, moodLabel: 'Grateful', entry: 'Thankful for support from my family.' },
  { date: 'Today', mood: 0, moodLabel: '', entry: '' } // Placeholder for today
];

const AIInsights = ({ isAnalyzing, aiInsights, mood = 'Neutral' }: AIInsightsProps) => {
  // Update mock data with today's mood
  const moodValue = {
    "Happy": 5,
    "Excited": 4.5,
    "Grateful": 4,
    "Calm": 3,
    "Reflective": 2.5,
    "Neutral": 2,
    "Tired": 1.5,
    "Anxious": 1,
    "Sad": 0.5
  }[mood || 'Neutral'] || 2;
  
  const moodData = [...mockPreviousEntries.slice(0, 6), {
    date: 'Today',
    mood: moodValue,
    moodLabel: mood || 'Neutral',
    entry: 'Current journal entry'
  }];
  
  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border border-mindspace-100 dark:border-mindspace-800 rounded-lg bg-mindspace-50 dark:bg-mindspace-900/20"
      >
        <div className="flex items-center space-x-3">
          <div className="h-5 w-5 rounded-full bg-mindspace-500 animate-pulse"></div>
          <div className="h-5 w-5 rounded-full bg-mindspace-500 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="h-5 w-5 rounded-full bg-mindspace-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          <p className="text-sm font-medium text-mindspace-700 dark:text-mindspace-300">
            Analyzing your journal entry...
          </p>
        </div>
      </motion.div>
    );
  }

  if (!aiInsights) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <motion.div 
        className="p-4 border border-neuro-100 dark:border-neuro-800 rounded-lg bg-neuro-50 dark:bg-neuro-900/20 shadow-md"
      >
        <div className="flex">
          <div className="mr-4 mt-1">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mindspace-500 to-neuro-500 flex items-center justify-center shadow-inner">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mindspace-500 to-neuro-500 font-semibold">
                NeuroSphere AI
              </span>
              <Badge variant="outline" className="ml-2 text-xs bg-mindspace-50 dark:bg-mindspace-900/30 border-mindspace-200 dark:border-mindspace-700 text-mindspace-700 dark:text-mindspace-300">
                <Award className="h-3 w-3 mr-1" /> Insight
              </Badge>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {aiInsights}
            </p>
          </div>
        </div>
      </motion.div>

      <MoodTrendVisualization moodData={moodData} currentMood={mood || 'Neutral'} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="p-4 border border-soul-100 dark:border-soul-800 rounded-lg bg-soul-50/50 dark:bg-soul-900/20 shadow-md"
      >
        <div className="flex">
          <div className="mr-4 mt-1">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-soul-500 to-neuro-500 flex items-center justify-center shadow-inner">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-soul-500 to-neuro-500 font-semibold">
                Emotional Pattern Analysis
              </span>
              <Badge variant="outline" className="ml-2 text-xs bg-soul-50 dark:bg-soul-900/30 border-soul-200 dark:border-soul-700 text-soul-700 dark:text-soul-300">
                <Award className="h-3 w-3 mr-1" /> Pattern
              </Badge>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Based on your journal entries, your mood has been {moodValue > 3 ? "generally positive" : moodValue > 2 ? "relatively neutral" : "somewhat challenging"} over the past week. 
              {moodValue > 3 ? 
                " You've maintained higher emotional states consistently, which suggests good emotional resilience." : 
                moodValue > 2 ? 
                " Your emotional states have been balanced, with minor fluctuations throughout the week." : 
                " There have been some emotional challenges, but your journaling practice is an excellent tool for processing these feelings."}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIInsights;
