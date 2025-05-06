
import React from 'react';
import ConnectedSoulPrintsCard from './ConnectedSoulPrintsCard';
import Web3MemoryCrystalCard from './Web3MemoryCrystalCard';
import Web3SecurityFeaturesCard from './Web3SecurityFeaturesCard';
import { motion } from 'framer-motion';

export const ConnectionsTabContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConnectedSoulPrintsCard />
        <Web3MemoryCrystalCard />
      </div>
      
      <Web3SecurityFeaturesCard />
    </motion.div>
  );
};

export default ConnectionsTabContent;
