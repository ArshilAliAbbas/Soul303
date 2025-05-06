
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import JournalEditor from '@/components/journal/JournalEditor';
import JournalList from '@/components/journal/JournalList';
import JournalPrompts from '@/components/journal/JournalPrompts';
import SoulPrintInsight from '@/components/journal/SoulPrintInsight';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Edit, BookOpen } from 'lucide-react';

const Journal = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [refreshEntries, setRefreshEntries] = useState(0);
  
  // Listen for storage events to refresh the journal list when entries are added/modified
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'journal_entries') {
        setRefreshEntries(prev => prev + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setActiveTab("editor"); // Switch to editor tab when prompt is selected
  };
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="relative mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-mindspace-600 via-neuro-500 to-soul-500 text-transparent bg-clip-text pb-2"
          >
            Soul Journal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground max-w-2xl mx-auto"
          >
            Document your journey, track your emotions, and gain insights into your inner self
          </motion.p>
          <motion.div 
            className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-gradient-to-r from-mindspace-500 via-neuro-400 to-soul-500 rounded-full"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-10">
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-background/50 backdrop-blur-sm border border-muted rounded-full p-1 shadow-lg">
              <TabsTrigger 
                value="editor" 
                className="flex items-center gap-2 rounded-full data-[state=active]:bg-gradient-to-r from-mindspace-500 to-neuro-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Write</span> Journal
              </TabsTrigger>
              <TabsTrigger 
                value="entries" 
                className="flex items-center gap-2 rounded-full data-[state=active]:bg-gradient-to-r from-neuro-500 to-soul-500 data-[state=active]:text-white transition-all duration-300"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">View</span> Entries
              </TabsTrigger>
            </TabsList>
          </div>
          
          <motion.div 
            className="relative w-full pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TabsContent value="editor" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <JournalEditor 
                    selectedPrompt={selectedPrompt} 
                  />
                </div>
                <div className="space-y-6">
                  <JournalPrompts onSelectPrompt={handlePromptSelect} />
                  <SoulPrintInsight />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="entries" className="mt-0 space-y-4">
              <JournalList key={refreshEntries} />
            </TabsContent>
            
            {/* Background decorative elements */}
            <div className="absolute -z-10 top-1/4 right-0 w-64 h-64 bg-mindspace-500/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-0 left-1/4 w-80 h-80 bg-neuro-500/10 rounded-full blur-3xl" />
          </motion.div>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default Journal;
