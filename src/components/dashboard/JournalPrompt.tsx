
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenLine, Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const prompts = [
  "What made you feel most alive today?",
  "Describe a moment of peace you experienced recently.",
  "What's a challenge you're currently facing, and what might it be teaching you?",
  "Write about something you're grateful for today.",
  "If your emotions had colors, what color are you feeling now and why?",
  "What's one small thing you could do today to nurture yourself?"
];

const JournalPrompt = () => {
  const navigate = useNavigate();
  const [promptIndex, setPromptIndex] = useState(() => 
    Math.floor(Math.random() * prompts.length)
  );
  
  const [isRotating, setIsRotating] = useState(false);

  const refreshPrompt = () => {
    setIsRotating(true);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * prompts.length);
      } while (newIndex === promptIndex);
      
      setPromptIndex(newIndex);
      setIsRotating(false);
      toast.success("New reflection prompt generated");
    }, 500);
  };
  
  const handleWriteNow = () => {
    // Store the selected prompt in localStorage to use it in the journal page
    const selectedPrompt = prompts[promptIndex];
    localStorage.setItem('selected_prompt', selectedPrompt);
    
    // Navigate to journal page with the prompt
    navigate('/journal');
    
    toast.success("Opening Journal", {
      description: "Let's write about: " + selectedPrompt
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-foreground">Reflection Prompt</CardTitle>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <RefreshCw 
                className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
                onClick={refreshPrompt}
              />
            </motion.div>
            <Lightbulb className="h-5 w-5 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={promptIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800"
            >
              <p className="text-sm italic text-amber-800 dark:text-amber-200">"{prompts[promptIndex]}"</p>
            </motion.div>
          </AnimatePresence>
          <Button 
            className="w-full bg-gradient-to-r from-neuro-500 to-neuro-600 hover:from-neuro-600 hover:to-neuro-700 hover-float"
            onClick={handleWriteNow}
          >
            <PenLine className="h-4 w-4 mr-2" /> Write Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JournalPrompt;
