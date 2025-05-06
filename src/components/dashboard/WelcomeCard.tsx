
import React from 'react';
import { Sparkles, ArrowRight, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const WelcomeCard = () => {
  const navigate = useNavigate();
  // Get user from localStorage
  const userString = localStorage.getItem('neurosphere_user');
  const user = userString ? JSON.parse(userString) : null;
  const isDemo = user?.isDemo;
  
  // Get current time to display appropriate greeting
  const hour = new Date().getHours();
  let greeting = 'Good Morning';
  
  if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon';
  } else if (hour >= 17) {
    greeting = 'Good Evening';
  }
  
  const handleStartJournaling = () => {
    navigate('/journal');
    toast.success("Opening Journal", {
      description: "Ready to capture your thoughts and feelings"
    });
  };
  
  const handleCheckIn = () => {
    navigate('/mood');
    toast.success("Mood Check-In", {
      description: "Let's record how you're feeling today"
    });
  };

  // Floating particles for background effect
  const particles = Array.from({ length: 8 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-mindspace-400/20 dark:bg-mindspace-400/10"
      style={{
        width: Math.random() * 15 + 5,
        height: Math.random() * 15 + 5,
      }}
      initial={{ 
        x: Math.random() * 300, 
        y: Math.random() * 150, 
        opacity: 0.3 
      }}
      animate={{
        x: Math.random() * 300,
        y: Math.random() * 150,
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 8 + Math.random() * 7,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-100 dark:border-gray-800 overflow-hidden neumorph-card dark:neumorph-card-dark glowing-border">
        <CardContent className="p-6 relative">
          {/* Dynamic background effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-mindspace-200/20 to-neuro-300/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute -bottom-20 -left-10 w-48 h-48 bg-gradient-to-tr from-neuro-200/10 to-mindspace-300/10 rounded-full blur-3xl -z-10" />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden -z-5 opacity-70">
            {particles}
          </div>
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="flex-1">
              <motion.h2 
                className="text-2xl font-bold text-balance text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {greeting}, {user?.name || "Mindful Explorer"}
                {isDemo && (
                  <span className="ml-2 text-xs bg-mindspace-100 dark:bg-mindspace-900/40 text-mindspace-700 dark:text-mindspace-300 px-2 py-0.5 rounded-full">
                    Demo Mode
                  </span>
                )}
              </motion.h2>
              
              <motion.p 
                className="mt-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Welcome to your personal NeuroSphere. What would you like to explore today?
              </motion.p>
              
              <motion.div 
                className="mt-6 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button 
                  className="bg-gradient-to-r from-mindspace-500 to-mindspace-600 hover:from-mindspace-600 hover:to-mindspace-700 hover-float group"
                  onClick={handleStartJournaling}
                >
                  <Sparkles size={16} className="mr-2 group-hover:rotate-12 transition-transform" /> 
                  Start Journaling
                </Button>
                <Button 
                  variant="outline" 
                  className="border-mindspace-200 dark:border-mindspace-800 hover:bg-mindspace-50 dark:hover:bg-mindspace-900/20 hover-float group"
                  onClick={handleCheckIn}
                >
                  <Calendar size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                  Check-in
                </Button>
              </motion.div>
            </div>
            
            <div className="hidden md:block relative w-24 h-24">
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-br from-mindspace-500 to-neuro-500"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-br from-mindspace-500 to-neuro-500 animate-ripple opacity-60"
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WelcomeCard;
