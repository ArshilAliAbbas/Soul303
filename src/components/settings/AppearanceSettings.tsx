import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Check, Moon, Palette, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme, themeColors } from '@/hooks/useTheme';
import { toast } from 'sonner';

const AppearanceSettings = () => {
  const { theme, mode, setTheme, toggleMode } = useTheme();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${themeColors[newTheme as keyof typeof themeColors].name}`, {
      description: "Your app appearance has been updated"
    });
  };
  
  const handleModeToggle = () => {
    toggleMode();
    toast.success(`Mode changed to ${mode === 'dark' ? 'light' : 'dark'}`, {
      description: "Your app appearance has been updated"
    });
  };

  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Palette className="h-5 w-5" /> Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <div>
            <h4 className="font-medium text-foreground">Dark Mode</h4>
            <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <Switch checked={mode === 'dark'} onCheckedChange={handleModeToggle} />
            <Moon className="h-5 w-5 text-indigo-400" />
          </div>
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h4 className="font-medium text-foreground">Color Theme</h4>
          <p className="text-sm text-muted-foreground">Select your preferred color theme</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {Object.entries(themeColors).map(([key, { bg, ring, name }], index) => (
              <motion.button 
                key={key}
                className={`relative w-10 h-10 rounded-full ${bg} transition-all`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleThemeChange(key)}
                aria-label={`${name} theme`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { delay: 0.3 + index * 0.1 }
                }}
              >
                {theme === key && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="text-white stroke-2" size={16} />
                  </motion.div>
                )}
                
                {theme === key && (
                  <motion.div
                    className={`absolute -inset-1 rounded-full ${ring} opacity-50`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="space-y-2 pt-2"
          variants={itemVariants}
          initial="hidden"
          animate="visible" 
          custom={4}
        >
          <h4 className="font-medium text-foreground">Preview</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-lg border bg-background text-foreground shadow-sm">
              <h5 className="font-medium mb-2">Light UI Elements</h5>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <div className={`h-6 w-6 rounded-md ${themeColors[theme as keyof typeof themeColors].bg}`}></div>
                  <span>Primary</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="h-6 w-6 rounded-md bg-secondary"></div>
                  <span>Secondary</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="h-6 w-6 rounded-md bg-accent"></div>
                  <span>Accent</span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border dark:bg-gray-900 dark:text-white bg-gray-200 text-gray-800 shadow-sm">
              <h5 className="font-medium mb-2">Dark UI Elements</h5>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <div className={`h-6 w-6 rounded-md ${themeColors[theme as keyof typeof themeColors].bg}`}></div>
                  <span>Primary</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="h-6 w-6 rounded-md bg-secondary"></div>
                  <span>Secondary</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="h-6 w-6 rounded-md bg-accent"></div>
                  <span>Accent</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
