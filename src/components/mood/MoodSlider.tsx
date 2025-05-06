
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  badgeColor: string;
}

const MoodSlider = ({ value, onChange, label, badgeColor }: MoodSliderProps) => {
  const getMoodLabel = (value: number) => {
    if (value <= 1) return "Very Low";
    if (value <= 2) return "Low";
    if (value <= 3) return "Moderate";
    if (value <= 4) return "High";
    return "Very High";
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">{label}</h3>
        <span className={`text-xs font-semibold ${badgeColor} px-2 py-1 rounded`}>
          {getMoodLabel(value)}
        </span>
      </div>
      <Slider 
        value={[value]} 
        min={1} 
        max={5} 
        step={1} 
        onValueChange={(values) => onChange(values[0])} 
        className="py-2"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Very Low</span>
        <span>Very High</span>
      </div>
    </div>
  );
};

export default MoodSlider;
