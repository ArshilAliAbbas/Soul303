
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  label?: string;
  value: number;
  max?: number;
  colorClass?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  delay?: number;
  showLabel?: boolean;
  labelClassName?: string;
  valueClassName?: string;
}

const ProgressBar = ({
  label,
  value,
  max = 100,
  colorClass = "bg-mindspace-500",
  showValue = true,
  size = 'md',
  className,
  delay = 0.2,
  showLabel = true,
  labelClassName,
  valueClassName
}: ProgressBarProps) => {
  // Calculate percentage
  const percentage = (value / max) * 100;
  
  // Size height mapping
  const heightClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3"
  };

  return (
    <div className={cn("space-y-2", className)}>
      {(showLabel || showValue) && (
        <div className="flex justify-between items-center">
          {showLabel && label && (
            <span className={cn("text-sm font-medium text-foreground", labelClassName)}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn("text-sm text-muted-foreground", valueClassName)}>
              {value}{max !== 100 ? `/${max}` : '%'}
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden", heightClasses[size])}>
        <motion.div 
          className={cn("h-full rounded-full", colorClass)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
