
import React, { useState } from 'react';
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
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center sm:justify-start mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Write</span> Journal
              </TabsTrigger>
              <TabsTrigger value="entries" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">View</span> Entries
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="editor" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <JournalEditor selectedPrompt={selectedPrompt} />
              </div>
              <div className="space-y-6">
                <JournalPrompts onSelectPrompt={handlePromptSelect} />
                <SoulPrintInsight />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="entries" className="mt-0 space-y-4">
            <JournalList />
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default Journal;
