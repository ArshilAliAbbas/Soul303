
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SoulprintVisual = () => {
  // Mock data for the SoulPrint visualization
  const traits = [
    { name: 'Resilience', value: 0.75 },
    { name: 'Mindfulness', value: 0.85 },
    { name: 'Creativity', value: 0.6 },
    { name: 'Empathy', value: 0.9 },
    { name: 'Focus', value: 0.65 },
    { name: 'Gratitude', value: 0.8 },
    { name: 'Adaptability', value: 0.7 },
    { name: 'Optimism', value: 0.65 },
  ];

  // Calculate positions for a circular radar chart
  const calculatePosition = (index: number, total: number, radius: number, value: number) => {
    const angle = (Math.PI * 2 * index) / total;
    const adjustedRadius = radius * value;
    
    const x = adjustedRadius * Math.cos(angle - Math.PI / 2) + radius;
    const y = adjustedRadius * Math.sin(angle - Math.PI / 2) + radius;
    
    return { x, y };
  };

  const radius = 150;
  const centerX = radius;
  const centerY = radius;

  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
      <CardHeader>
        <CardTitle>Your SoulPrint</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <svg width={radius * 2} height={radius * 2} className="overflow-visible">
            {/* Background circles */}
            {[0.25, 0.5, 0.75, 1].map((circle, i) => (
              <circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={radius * circle}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeWidth={1}
              />
            ))}
            
            {/* Axes */}
            {traits.map((trait, i) => {
              const position = calculatePosition(i, traits.length, radius, 1);
              return (
                <line
                  key={i}
                  x1={centerX}
                  y1={centerY}
                  x2={position.x}
                  y2={position.y}
                  stroke="currentColor"
                  strokeOpacity={0.2}
                  strokeWidth={1}
                />
              );
            })}
            
            {/* SoulPrint shape */}
            <polygon
              points={traits.map((trait, i) => {
                const pos = calculatePosition(i, traits.length, radius, trait.value);
                return `${pos.x},${pos.y}`;
              }).join(' ')}
              fill="url(#soulprint-gradient)"
              fillOpacity={0.5}
              stroke="url(#soulprint-stroke)"
              strokeWidth={2}
            />
            
            {/* Points on the shape */}
            {traits.map((trait, i) => {
              const pos = calculatePosition(i, traits.length, radius, trait.value);
              return (
                <circle
                  key={i}
                  cx={pos.x}
                  cy={pos.y}
                  r={4}
                  fill="white"
                  stroke="url(#soulprint-stroke)"
                  strokeWidth={2}
                />
              );
            })}
            
            {/* Trait labels */}
            {traits.map((trait, i) => {
              const pos = calculatePosition(i, traits.length, radius, 1.15);
              return (
                <text
                  key={i}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={12}
                  fontWeight={500}
                  fill="currentColor"
                >
                  {trait.name}
                </text>
              );
            })}
            
            {/* Gradients */}
            <defs>
              <linearGradient id="soulprint-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#843dff" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#1698e9" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="soulprint-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#843dff" />
                <stop offset="100%" stopColor="#1698e9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <p className="text-sm text-center text-muted-foreground mt-4">
          Your SoulPrint represents your unique emotional and behavioral patterns based on your journal entries and mood data.
        </p>
      </CardContent>
    </Card>
  );
};

export default SoulprintVisual;
