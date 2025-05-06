
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import SoulprintMainTab from '@/components/soulprint/SoulprintMainTab';
import LegacyDataTab from '@/components/soulprint/LegacyDataTab';
import { ConnectionsTabContent } from '@/components/soulprint/ConnectionsTab/ConnectionsTabContent';
import SoulprintHeader from '@/components/soulprint/SoulprintHeader';
import SoulprintTabs from '@/components/soulprint/SoulprintTabs';
import SoulprintWeb3StatusBar from '@/components/soulprint/SoulprintWeb3StatusBar';

const SoulPrint = () => {
  const [activeTab, setActiveTab] = useState("soulprint");
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <SoulprintHeader />
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <SoulprintTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <TabsContent value="soulprint" className="mt-0">
            <SoulprintMainTab />
          </TabsContent>
          
          <TabsContent value="legacy" className="mt-0">
            <LegacyDataTab />
          </TabsContent>
          
          <TabsContent value="connections" className="mt-0">
            <ConnectionsTabContent />
          </TabsContent>
        </Tabs>
        
        <SoulprintWeb3StatusBar />
      </motion.div>
    </MainLayout>
  );
};

export default SoulPrint;
