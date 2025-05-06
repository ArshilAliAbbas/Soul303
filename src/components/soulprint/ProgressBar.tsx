
import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/progress-bar';

interface CustomProgressBarProps {
  label: string;
  value: number;
  colorFrom: string;
  colorTo: string;
  delay?: number;
}

const CustomProgressBar = ({ label, value, colorFrom, colorTo, delay = 0.2 }: CustomProgressBarProps) => {
  // Map color names to actual gradient classes to use with our new component
  const getColorClass = (from: string, to: string) => {
    return `bg-gradient-to-r from-${from} to-${to}`;
  };

  return (
    <ProgressBar
      label={label}
      value={value}
      colorClass={getColorClass(colorFrom, colorTo)}
      delay={delay}
    />
  );
};

export default CustomProgressBar;
