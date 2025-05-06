
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Frown, 
  Meh, 
  ThumbsUp, 
  ZapOff, 
  Brain, 
  Lightbulb, 
  Heart, 
  HeartCrack,
  Coffee
} from 'lucide-react';

interface MoodSelectorProps {
  mood: string;
  setMood: (mood: string) => void;
}

const MoodSelector = ({ mood, setMood }: MoodSelectorProps) => {
  // Define mood options with icons and descriptions
  const moodOptions = [
    { name: "Happy", icon: <Smile className="h-4 w-4" />, description: "Feeling joyful and content" },
    { name: "Calm", icon: <Meh className="h-4 w-4" />, description: "Feeling peaceful and relaxed" },
    { name: "Reflective", icon: <Brain className="h-4 w-4" />, description: "Deep in thought" },
    { name: "Energetic", icon: <Lightbulb className="h-4 w-4" />, description: "Full of energy and ideas" },
    { name: "Anxious", icon: <HeartCrack className="h-4 w-4" />, description: "Feeling worried or uneasy" },
    { name: "Sad", icon: <Frown className="h-4 w-4" />, description: "Feeling down or blue" },
    { name: "Excited", icon: <ThumbsUp className="h-4 w-4" />, description: "Enthusiastic and eager" },
    { name: "Tired", icon: <ZapOff className="h-4 w-4" />, description: "Low energy or exhausted" },
    { name: "Grateful", icon: <Heart className="h-4 w-4" />, description: "Appreciative and thankful" },
    { name: "Neutral", icon: <Coffee className="h-4 w-4" />, description: "Neither positive nor negative" }
  ];

  const getMoodColor = (selectedMood: string) => {
    const moodColors = {
      "Happy": "bg-yellow-500 hover:bg-yellow-600",
      "Calm": "bg-blue-500 hover:bg-blue-600",
      "Reflective": "bg-purple-500 hover:bg-purple-600",
      "Energetic": "bg-green-500 hover:bg-green-600",
      "Anxious": "bg-red-500 hover:bg-red-600",
      "Sad": "bg-indigo-500 hover:bg-indigo-600",
      "Excited": "bg-orange-500 hover:bg-orange-600",
      "Tired": "bg-gray-500 hover:bg-gray-600",
      "Grateful": "bg-pink-500 hover:bg-pink-600",
      "Neutral": "bg-gray-400 hover:bg-gray-500"
    };
    
    return moodColors[selectedMood as keyof typeof moodColors] || "bg-gray-400 hover:bg-gray-500";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">How are you feeling today?</label>
      <div className="flex flex-wrap gap-2">
        {moodOptions.map((moodOption, index) => (
          <motion.div
            key={moodOption.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              type="button"
              onClick={() => setMood(moodOption.name)}
              className={`rounded-full px-4 py-1 ${
                mood === moodOption.name
                  ? `${getMoodColor(moodOption.name)} text-white ring-2 ring-offset-2 ring-offset-background`
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              } transition-all duration-200 flex items-center gap-1.5`}
              title={moodOption.description}
            >
              {moodOption.icon}
              {moodOption.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
