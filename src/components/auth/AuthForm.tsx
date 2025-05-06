
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, ArrowRight, Mail, Lock, User, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  onSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'register') {
        await register(name, email, password);
        toast.success('Account created successfully!');
      } else {
        await login(email, password);
        toast.success('Welcome back!');
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(mode === 'login' ? 'Login failed' : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants for form elements
  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="w-full overflow-hidden border-none shadow-xl bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-lg">
        <CardHeader className="space-y-2 text-center">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto relative w-14 h-14 rounded-full bg-gradient-to-br from-mindspace-500 to-neuro-400 flex items-center justify-center mb-2"
          >
            <div className="absolute inset-0 w-full h-full rounded-full animate-pulse-slow opacity-75 bg-mindspace-500"></div>
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              {mode === 'login' ? (
                <LogIn className="w-7 h-7 text-white" />
              ) : (
                <UserPlus className="w-7 h-7 text-white" />
              )}
            </motion.div>
          </motion.div>
          
          <CardTitle className="text-2xl font-bold">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          
          <CardDescription>
            {mode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Sign up for a new account to get started'}
          </CardDescription>
          
          <Badge variant="outline" className="mx-auto">
            Demo Mode <Shield className="w-3 h-3 ml-1" />
          </Badge>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div 
                  className="space-y-2"
                  key="name-field"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={0}
                  variants={formVariants}
                >
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <Input 
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                    />
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.div>
              )}
              
              <motion.div 
                className="space-y-2"
                key="email-field"
                initial="hidden"
                animate="visible"
                custom={mode === 'register' ? 1 : 0}
                variants={formVariants}
              >
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input 
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                  />
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                key="password-field"
                initial="hidden"
                animate="visible"
                custom={mode === 'register' ? 2 : 1}
                variants={formVariants}
              >
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </motion.div>
            </AnimatePresence>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            className="w-full group bg-gradient-to-r from-mindspace-500 to-neuro-500 hover:from-mindspace-600 hover:to-neuro-600 shadow-lg"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <motion.span
              className="flex items-center"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform" />
            </motion.span>
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={toggleMode} 
              className="underline text-primary hover:text-primary/80 transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AuthForm;
