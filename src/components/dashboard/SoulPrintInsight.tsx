
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const SoulPrintInsight = () => {
  // Mock data for the SoulPrint insight
  const mindfulnessScore = 76;
  const resilienceScore = 82;
  const wellbeingScore = 68;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-foreground">SoulPrint Insights</CardTitle>
          <Brain className="h-5 w-5 text-mindspace-500" />
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-foreground">Mindfulness</span>
              <span className="text-xs font-semibold text-mindspace-600">{mindfulnessScore}%</span>
            </div>
            <Progress value={mindfulnessScore} className="h-2 bg-mindspace-100 dark:bg-mindspace-900/30">
              <motion.div 
                className="h-full bg-gradient-to-r from-mindspace-400 to-mindspace-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mindfulnessScore}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </Progress>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-foreground">Resilience</span>
              <span className="text-xs font-semibold text-neuro-600">{resilienceScore}%</span>
            </div>
            <Progress value={resilienceScore} className="h-2 bg-neuro-100 dark:bg-neuro-900/30">
              <motion.div 
                className="h-full bg-gradient-to-r from-neuro-400 to-neuro-600 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${resilienceScore}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </Progress>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-foreground">Well-being</span>
              <span className="text-xs font-semibold text-soul-600">{wellbeingScore}%</span>
            </div>
            <Progress value={wellbeingScore} className="h-2 bg-soul-100 dark:bg-soul-900/30">
              <motion.div 
                className="h-full bg-gradient-to-r from-soul-400 to-soul-600 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${wellbeingScore}%` }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </Progress>
          </motion.div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-soul-500" />
              <span className="text-xs font-medium text-soul-600 dark:text-soul-400">+5% this week</span>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium underline hover-float">
              Complete Analysis
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SoulPrintInsight;
