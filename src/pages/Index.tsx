
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import MoodTracker from '@/components/dashboard/MoodTracker';
import JournalPrompt from '@/components/dashboard/JournalPrompt';
import SoulPrintInsight from '@/components/dashboard/SoulPrintInsight';
import MilestoneCard from '@/components/dashboard/MilestoneCard';
import { Button } from '@/components/ui/button';
import UserButton from '@/components/auth/UserButton';
import { 
  Brain, 
  PenTool, 
  Heart, 
  BarChart3, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  Code,
  Zap,
  Star,
  Globe,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const particles = Array.from({ length: 30 }).map((_, index) => ({
  id: index,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 5 + 2,
  color: [
    'bg-mindspace-500', 
    'bg-neuro-500', 
    'bg-soul-500', 
    'bg-pink-500', 
    'bg-purple-500'
  ][Math.floor(Math.random() * 5)]
}));

const FeatureCard = ({ icon: Icon, title, description, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ 
      scale: 1.05, 
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.2 } 
    }}
    className="rounded-xl p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-100 dark:border-gray-800 group"
  >
    <div className={`p-3 rounded-full w-fit mb-4 ${color} transition-all duration-300 group-hover:scale-110`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ name, role, quote, avatar, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ 
      y: -10,
      transition: { duration: 0.2 } 
    }}
    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-md"
  >
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mindspace-100 to-neuro-100 dark:from-mindspace-900 dark:to-neuro-900 flex items-center justify-center mr-4">
        <span className="text-xl font-bold">{avatar}</span>
      </div>
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
    <p className="italic text-muted-foreground">{quote}</p>
  </motion.div>
);

const Index = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('neurosphere_user');
  const isAuthenticated = !!userString;
  const [animateParticles, setAnimateParticles] = useState(false);
  
  useEffect(() => {
    // Start particle animation after a short delay
    const timer = setTimeout(() => {
      setAnimateParticles(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const handleDemoMode = () => {
    // Store demo user in localStorage to simulate login
    localStorage.setItem('neurosphere_user', JSON.stringify({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@neurosphere.ai',
      isDemo: true
    }));
    
    toast.success('Welcome to NeuroSphere Demo!', {
      description: 'Experience the full platform features in demo mode'
    });
    
    // Force reload to update authentication state
    window.location.reload();
  };

  // If authenticated, show dashboard, otherwise show landing page
  if (isAuthenticated) {
    return (
      <MainLayout>
        <div className="grid grid-cols-1 gap-6">
          <WelcomeCard />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <MoodTracker />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <JournalPrompt />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <SoulPrintInsight />
            </motion.div>
          </div>
          
          <MilestoneCard />
        </div>
      </MainLayout>
    );
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 overflow-x-hidden relative">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${particle.color} opacity-40 dark:opacity-20`}
            style={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={animateParticles ? {
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              transition: {
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            } : {}}
          />
        ))}
      </div>

      {/* Header/Navigation */}
      <header className="px-4 py-6 bg-white/80 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mindspace-600 to-neuro-500"></div>
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-mindspace-600 to-neuro-500 animate-ripple opacity-60"></div>
            </div>
            <motion.h1 
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              NeuroSphere
            </motion.h1>
          </motion.div>
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="bg-gradient-to-r from-mindspace-500 to-neuro-500 hover:from-mindspace-600 hover:to-neuro-600 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-mindspace-400/10 dark:bg-mindspace-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-neuro-400/10 dark:bg-neuro-400/5 rounded-full blur-3xl"></div>
        
        <motion.div 
          className="max-w-6xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-mindspace-600 to-neuro-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Your Journey to Mental Wellbeing
          </motion.h1>
          
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-gray-300"
            variants={itemVariants}
          >
            Track your moods, journal your thoughts, and discover deeper insights about yourself with NeuroSphere's comprehensive mental wellness tools.
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/login')} 
              className="group bg-gradient-to-r from-mindspace-500 to-neuro-500 hover:from-mindspace-600 hover:to-neuro-600 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="mr-2">Start Your Journey</span>
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleDemoMode}
              className="group border-mindspace-500 hover:bg-mindspace-50 dark:hover:bg-mindspace-900/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="mr-2">Try Demo Mode</span>
              <span className="group-hover:rotate-90 transition-transform">
                <Sparkles className="h-4 w-4" />
              </span>
            </Button>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="mt-16 animate-bounce mx-auto w-10 h-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <ChevronDown className="text-muted-foreground" />
          </motion.div>

          {/* Features grid with animated hover effects */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Heart}
              title="Track Your Mood"
              description="Log and visualize your emotional patterns over time."
              color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
              delay={0.1}
            />
            <FeatureCard 
              icon={PenTool}
              title="Journal Thoughts"
              description="Express yourself freely in a private, secure space."
              color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              delay={0.2}
            />
            <FeatureCard 
              icon={Brain}
              title="SoulPrint Analysis"
              description="Gain deeper insights into your mental patterns."
              color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
              delay={0.3}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Progress Analytics"
              description="Visualize your growth and improvements over time."
              color="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              delay={0.4}
            />
          </div>
        </motion.div>
      </section>

      {/* New tech showcase section */}
      <section className="py-16 px-4 bg-gradient-to-br from-mindspace-50/70 to-neuro-50/70 dark:from-mindspace-900/30 dark:to-neuro-900/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyIj4KICAgICAgICAgICAgPHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoLTZ2LTZoNnYtNmg2djZoNnY2aC02eiIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+')] opacity-50"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4">Next-Gen Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Powered by cutting-edge AI and blockchain technology for secure mental wellness journaling.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div 
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-12 w-12 rounded-full bg-mindspace-100 dark:bg-mindspace-900/50 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-mindspace-600 dark:text-mindspace-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Neural Analysis</h3>
              <p className="text-sm text-muted-foreground">Our AI analyzes your journal entries to identify emotional patterns and provide actionable insights.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Web3 Security</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and stored on IPFS with blockchain verification for maximum privacy.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Memory Crystals</h3>
              <p className="text-sm text-muted-foreground">Store your most important memories as NFTs in our SoulBound Memory Crystal system.</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              variant="outline" 
              className="group border-neuro-500 hover:bg-neuro-50 dark:hover:bg-neuro-900/20"
              onClick={() => navigate('/soulprint')}
            >
              <Code className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              <span>Explore the Technology</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonial section with improved cards */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover how NeuroSphere has helped people on their mental wellness journey.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Alex Johnson"
              role="Mindfulness Practitioner"
              quote="NeuroSphere has transformed my self-awareness. The mood tracking feature helps me recognize patterns I never noticed before."
              avatar="AJ"
              delay={0.2}
            />
            <TestimonialCard 
              name="Sarah Chen"
              role="Mental Health Advocate"
              quote="The journaling prompts are thoughtful and insightful. I've had breakthroughs I wouldn't have experienced otherwise."
              avatar="SC"
              delay={0.3}
            />
            <TestimonialCard 
              name="Marcus Taylor"
              role="Psychology Student"
              quote="As someone studying psychology, I appreciate the science-backed approach. The SoulPrint analysis is particularly impressive."
              avatar="MT"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Call to action with interactive elements */}
      <section className="py-16 px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-gradient-to-r from-mindspace-500/20 to-neuro-500/20 dark:from-mindspace-500/10 dark:to-neuro-500/10 p-8 sm:p-12 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-white/5 relative overflow-hidden shadow-xl">
            {/* Animated background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
                Join thousands of others who are discovering new insights about themselves and improving their mental wellbeing.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-mindspace-500 to-neuro-500 hover:from-mindspace-600 hover:to-neuro-600 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Begin Your NeuroSphere Experience
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleDemoMode}
                  className="border-neuro-500/30 text-neuro-600 dark:text-neuro-400 hover:bg-neuro-50 dark:hover:bg-neuro-900/20"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Try Demo Mode
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer with subtle animations */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4 bg-white/80 dark:bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mindspace-600 to-neuro-500"></div>
                <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-mindspace-600 to-neuro-500 animate-pulse-slow"></div>
              </div>
              <h2 className="text-xl font-bold">NeuroSphere</h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <a href="#" className="text-sm text-gray-500 hover:text-mindspace-500 transition-colors">About</a>
                <a href="#" className="text-sm text-gray-500 hover:text-mindspace-500 transition-colors">Features</a>
                <a href="#" className="text-sm text-gray-500 hover:text-mindspace-500 transition-colors">Privacy</a>
                <a href="#" className="text-sm text-gray-500 hover:text-mindspace-500 transition-colors">Terms</a>
                <a href="#" className="text-sm text-gray-500 hover:text-mindspace-500 transition-colors">Contact</a>
              </div>
            </motion.div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} NeuroSphere. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
