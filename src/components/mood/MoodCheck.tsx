
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import MoodSlider from './MoodSlider';
import MoodSelector from './MoodSelector';
import FactorSelector from './FactorSelector';

const MoodCheck = () => {
  const [moodValue, setMoodValue] = useState<number>(3);
  const [energyValue, setEnergyValue] = useState<number>(3);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  
  // Check if we have a mood from the homepage
  useEffect(() => {
    const storedMood = localStorage.getItem('selected_mood');
    
    if (storedMood) {
      // Map the basic moods from homepage to detailed moods here
      if (storedMood === 'Great') {
        setSelectedMood('happy');
        setMoodValue(5);
      } else if (storedMood === 'Okay') {
        setSelectedMood('neutral');
        setMoodValue(3);
      } else if (storedMood === 'Not Good') {
        setSelectedMood('sad');
        setMoodValue(1);
      }
      
      // Clear the stored mood
      localStorage.removeItem('selected_mood');
    }
  }, []);
  
  const toggleFactor = (factor: string) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter(f => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };
  
  const handleSave = () => {
    if (!selectedMood) {
      toast.error("Please select a mood");
      return;
    }
    
    const moodData = {
      mood: {
        type: selectedMood,
        value: moodValue
      },
      energy: energyValue,
      factors: selectedFactors,
      date: new Date().toISOString()
    };
    
    // Save to local storage for demo
    const moods = JSON.parse(localStorage.getItem('mood_data') || '[]');
    moods.unshift(moodData);
    localStorage.setItem('mood_data', JSON.stringify(moods));
    
    toast.success("Mood check-in saved", {
      description: "Your mood has been recorded"
    });
    
    // Reset form for next entry
    setSelectedMood(null);
    setMoodValue(3);
    setEnergyValue(3);
    setSelectedFactors([]);
  };
  
  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
      <CardHeader>
        <CardTitle className="text-xl">How are you feeling?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MoodSlider 
            value={moodValue}
            onChange={setMoodValue}
            label="Overall Mood"
            badgeColor="bg-mindspace-100 dark:bg-mindspace-900/30 text-mindspace-700 dark:text-mindspace-300"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MoodSlider 
            value={energyValue}
            onChange={setEnergyValue}
            label="Energy Level"
            badgeColor="bg-neuro-100 dark:bg-neuro-900/30 text-neuro-700 dark:text-neuro-300"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <MoodSelector 
            selectedMood={selectedMood}
            onSelectMood={setSelectedMood}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <FactorSelector 
            selectedFactors={selectedFactors}
            onToggleFactor={toggleFactor}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-mindspace-500 to-neuro-600 hover:from-mindspace-600 hover:to-neuro-700"
          >
            <Save className="mr-2 h-4 w-4" /> Save Mood Check
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default MoodCheck;
