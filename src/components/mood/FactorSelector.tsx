
import React from 'react';
import { ThumbsUp, ThumbsDown, Sun, Cloud, CloudRain } from 'lucide-react';

interface FactorSelectorProps {
  selectedFactors: string[];
  onToggleFactor: (factor: string) => void;
}

const FactorSelector = ({ selectedFactors, onToggleFactor }: FactorSelectorProps) => {
  const factors = [
    { value: "productive", label: "Productive", icon: <ThumbsUp className="h-5 w-5" /> },
    { value: "unproductive", label: "Unproductive", icon: <ThumbsDown className="h-5 w-5" /> },
    { value: "energetic", label: "Energetic", icon: <Sun className="h-5 w-5" /> },
    { value: "tired", label: "Tired", icon: <Cloud className="h-5 w-5" /> },
    { value: "stressed", label: "Stressed", icon: <CloudRain className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Contributing factors (select all that apply)</h3>
      <div className="flex flex-wrap gap-2">
        {factors.map((factor) => (
          <button
            key={factor.value}
            onClick={() => onToggleFactor(factor.value)}
            className={`flex items-center px-3 py-2 rounded-full transition-colors ${
              selectedFactors.includes(factor.value)
                ? 'bg-neuro-100 dark:bg-neuro-900/30 text-neuro-700 dark:text-neuro-300 ring-1 ring-neuro-300'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {factor.icon}
            <span className="ml-1.5 text-sm">{factor.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FactorSelector;
