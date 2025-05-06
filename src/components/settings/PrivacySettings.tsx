
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacySettings = () => {
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
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5" /> Privacy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
          custom={2}
        >
          <div>
            <h4 className="font-medium text-foreground">End-to-End Encryption</h4>
            <p className="text-sm text-muted-foreground">Keep your journal entries encrypted</p>
          </div>
          <Switch defaultChecked />
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
          custom={3}
        >
          <div>
            <h4 className="font-medium text-foreground">Store on Decentralized Network</h4>
            <p className="text-sm text-muted-foreground">Save your data securely on IPFS/Filecoin</p>
          </div>
          <Switch defaultChecked />
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
          custom={4}
        >
          <div>
            <h4 className="font-medium text-foreground">Local-only Processing</h4>
            <p className="text-sm text-muted-foreground">Process your data locally whenever possible</p>
          </div>
          <Switch />
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettings;
