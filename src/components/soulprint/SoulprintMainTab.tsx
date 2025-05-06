
import React from 'react';
import SoulprintVisual from './SoulprintVisual';
import InsightCard from './InsightCard';
import { motion } from 'framer-motion';

const SoulprintMainTab = () => {
  return (
    <div className="mt-0">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <SoulprintVisual />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <InsightCard />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SoulprintMainTab;
