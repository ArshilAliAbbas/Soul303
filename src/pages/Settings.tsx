
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

// Import extracted components
import GeneralSettings from '@/components/settings/GeneralSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
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

  return (
    <MainLayout>
      <motion.div 
        className="max-w-4xl mx-auto space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
      >
        <motion.h1 
          className="text-3xl font-bold"
          variants={itemVariants}
          custom={0}
        >
          Settings
        </motion.h1>
        
        <motion.div variants={itemVariants} custom={1}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="mt-6">
              <GeneralSettings />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-6">
              <AppearanceSettings />
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-6">
              <PrivacySettings />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Settings;
