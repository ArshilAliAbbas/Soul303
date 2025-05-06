
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const GeneralSettings = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" /> General Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
          custom={2}
        >
          <div>
            <h4 className="font-medium">Daily Reflection Reminders</h4>
            <p className="text-sm text-muted-foreground">Receive a reminder to journal each day</p>
          </div>
          <Switch defaultChecked />
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
          custom={3}
        >
          <div>
            <h4 className="font-medium">Weekly SoulPrint Updates</h4>
            <p className="text-sm text-muted-foreground">Get a weekly analysis of your emotional patterns</p>
          </div>
          <Switch defaultChecked />
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
          custom={4}
        >
          <div>
            <h4 className="font-medium">AI-Powered Journaling Suggestions</h4>
            <p className="text-sm text-muted-foreground">Receive personalized prompts for deeper reflection</p>
          </div>
          <Switch defaultChecked />
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
