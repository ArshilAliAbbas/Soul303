
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { motion } from 'framer-motion';

const Login = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Check if user is already logged in
  const userString = localStorage.getItem('neurosphere_user');
  if (userString) {
    return <Navigate to="/" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Fixed the logoVariants type issue by separating the animations
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Separate animation for the pulse effect
  const logoPulse = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const // Type assertion to fix the error
    }
  };

  const handleFormSuccess = () => {
    setIsAnimating(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4 overflow-hidden">
      <motion.div 
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          animate={isAnimating ? { y: -1000, opacity: 0, transition: { duration: 0.8 } } : {}}
        >
          <div className="mb-8 text-center">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              initial="initial"
              animate="animate"
              whileHover={logoPulse}
              variants={logoVariants}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mindspace-600 to-neuro-500"></div>
                <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-mindspace-600 to-neuro-500 animate-ripple opacity-60"></div>
              </div>
              <h1 className="text-3xl font-bold">NeuroSphere</h1>
            </motion.div>
            <motion.p 
              className="text-muted-foreground max-w-sm mx-auto"
              variants={itemVariants}
            >
              Unlock the full potential of your mental well-being journey
            </motion.p>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <AuthForm onSuccess={handleFormSuccess} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
