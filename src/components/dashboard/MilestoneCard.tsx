
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MilestoneCard = () => {
  // Mock data for milestones
  const milestones = [
    { 
      name: '7-Day Journal Streak', 
      progress: 5,
      total: 7,
      icon: <Award className="h-4 w-4 text-amber-500" />
    },
    { 
      name: 'Mindfulness Explorer', 
      progress: 3,
      total: 5,
      icon: <Award className="h-4 w-4 text-indigo-500" />
    },
    { 
      name: 'Emotion Mastery', 
      progress: 2,
      total: 10,
      icon: <Award className="h-4 w-4 text-teal-500" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-foreground">Your Journey</CardTitle>
          <button className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center hover-float">
            <span>All Milestones</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </CardHeader>
        <CardContent className="space-y-3">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index} 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {milestone.icon}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">{milestone.name}</p>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-mindspace-500 to-neuro-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(milestone.progress / milestone.total) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {milestone.progress} of {milestone.total} completed
                </p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MilestoneCard;
