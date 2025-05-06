
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown, ArrowUpRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Mock data for mood trends
const moodData = [
  { date: '2023-04-01', value: 5 },
  { date: '2023-04-02', value: 4 },
  { date: '2023-04-03', value: 3 },
  { date: '2023-04-04', value: 4 },
  { date: '2023-04-05', value: 5 },
  { date: '2023-04-06', value: 6 },
  { date: '2023-04-07', value: 7 },
];

const MoodTracker = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const moods = [
    { icon: <Smile className="w-8 h-8 text-soul-500" />, label: 'Great', value: 5 },
    { icon: <Meh className="w-8 h-8 text-amber-500" />, label: 'Okay', value: 3 },
    { icon: <Frown className="w-8 h-8 text-red-500" />, label: 'Not Good', value: 1 },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    
    // Store selected mood in localStorage
    localStorage.setItem('selected_mood', mood);
    
    // Show toast notification
    toast.success(`Mood recorded: ${mood}`, {
      description: "Your mood has been logged for today"
    });
    
    // Give feedback that the user can now navigate to the journal
    toast.info("Want to journal about your mood?", {
      description: "Click 'Write Now' to start journaling",
      action: {
        label: "Write Now",
        onClick: () => navigate('/journal')
      }
    });
  };
  
  const handleViewDetails = () => {
    navigate('/mood');
    toast.success("Opening mood tracker", {
      description: "View your detailed mood history and trends"
    });
  };

  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Mood Check-in</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleViewDetails}>
          <Calendar className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground mb-4">How are you feeling today?</p>
          
          <div className="grid grid-cols-3 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => handleMoodSelect(mood.label)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                  selectedMood === mood.label 
                    ? 'bg-mindspace-100 dark:bg-mindspace-900/30 ring-2 ring-mindspace-500'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {mood.icon}
                <span className="mt-2 text-sm">{mood.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Weekly Trend</h4>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600 dark:text-blue-400" onClick={handleViewDetails}>
                <span>View Details</span>
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            
            <div className="h-12 flex items-end space-x-1">
              {moodData.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-mindspace-200 to-mindspace-400 dark:from-mindspace-700 dark:to-mindspace-500 rounded-sm"
                    style={{ 
                      height: `${(day.value / 7) * 100}%`,
                      opacity: 0.5 + ((day.value / 7) * 0.5)
                    }}
                  />
                  <span className="text-[10px] mt-1 text-gray-500">
                    {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' }).charAt(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
