
import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/progress-bar';

interface CustomProgressBarProps {
  label?: string;
  value: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  variant?: string; // Add support for the variant prop
}

const CustomProgressBar = ({ label, value, colorFrom, colorTo, variant, delay = 0.2 }: CustomProgressBarProps) => {
  // Map variants to color gradients
  const getColorsFromVariant = (variant?: string): { from: string, to: string } => {
    switch (variant) {
      case 'neuro':
        return { from: 'neuro-400', to: 'neuro-600' };
      case 'soul':
        return { from: 'soul-400', to: 'soul-600' };
      case 'mindspace':
        return { from: 'mindspace-400', to: 'mindspace-600' };
      default:
        return { 
          from: colorFrom || 'mindspace-400', 
          to: colorTo || 'mindspace-600' 
        };
    }
  };

  // Get colors based on the variant or directly provided colors
  const colors = getColorsFromVariant(variant);
  const actualColorFrom = colorFrom || colors.from;
  const actualColorTo = colorTo || colors.to;

  // Map color names to actual gradient classes to use with our new component
  const getColorClass = (from: string, to: string) => {
    return `bg-gradient-to-r from-${from} to-${to}`;
  };

  return (
    <ProgressBar
      label={label}
      value={value}
      colorClass={getColorClass(actualColorFrom, actualColorTo)}
      delay={delay}
    />
  );
};

export default CustomProgressBar;
