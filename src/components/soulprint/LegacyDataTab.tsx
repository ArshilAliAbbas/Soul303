
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import CustomProgressBar from './ProgressBar';
import { Database, FileText, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LegacyDataTab = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-neuro-500" /> Legacy Data Import
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your existing data from other platforms to enhance your SoulPrint.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Import Progress</span>
                  <span className="text-neuro-500">40%</span>
                </div>
                <CustomProgressBar value={40} variant="neuro" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" /> Import Journals
                </Button>
                <Button variant="outline" className="justify-start">
                  <Shield className="h-4 w-4 mr-2" /> Import Values
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-soul-500" /> Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your legacy data is protected with advanced encryption and privacy controls.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Security Level</span>
                  <span className="text-soul-500">Advanced</span>
                </div>
                <CustomProgressBar value={80} variant="soul" />
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button className="w-full bg-gradient-to-r from-soul-500 to-soul-600">
                  <Shield className="h-4 w-4 mr-2" /> Configure Privacy Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LegacyDataTab;
