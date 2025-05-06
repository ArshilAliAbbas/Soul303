
import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

interface MoodSelectorProps {
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
}

const MoodSelector = ({ selectedMood, onSelectMood }: MoodSelectorProps) => {
  const moods = [
    { value: "happy", label: "Happy", icon: <Smile className="h-6 w-6" /> },
    { value: "neutral", label: "Neutral", icon: <Meh className="h-6 w-6" /> },
    { value: "sad", label: "Sad", icon: <Frown className="h-6 w-6" /> }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Which best describes your mood?</h3>
      <div className="grid grid-cols-3 gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelectMood(mood.value)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
              selectedMood === mood.value 
                ? 'bg-mindspace-100 dark:bg-mindspace-900/30 text-mindspace-700 dark:text-mindspace-300 ring-2 ring-mindspace-500'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {mood.icon}
            <span className="mt-1 text-sm">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
