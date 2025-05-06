
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Upload, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const SoulPrintInsight = () => {
  const [analysisItems, setAnalysisItems] = useState([
    { title: 'Emotional Depth', value: 78, color: 'from-mindspace-400 to-mindspace-600' },
    { title: 'Memory Impact', value: 65, color: 'from-neuro-400 to-neuro-600' },
    { title: 'Legacy Value', value: 82, color: 'from-soul-400 to-soul-600' }
  ]);
  
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [encryptionInProgress, setEncryptionInProgress] = useState(false);
  
  const handleEncrypt = () => {
    setEncryptionInProgress(true);
    
    // Simulate encryption process
    setTimeout(() => {
      setEncryptionInProgress(false);
      setIsEncrypted(true);
      toast.success('Journal entry encrypted', {
        description: 'Your data is now protected with ZK encryption'
      });
    }, 1500);
  };
  
  const handleUploadToCrystal = () => {
    if (!isEncrypted) {
      toast.error('Please encrypt your data first');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      
      // Update analysis values to simulate AI processing
      setAnalysisItems([
        { title: 'Emotional Depth', value: 85, color: 'from-mindspace-400 to-mindspace-600' },
        { title: 'Memory Impact', value: 72, color: 'from-neuro-400 to-neuro-600' },
        { title: 'Legacy Value', value: 90, color: 'from-soul-400 to-soul-600' }
      ]);
      
      toast.success('Entry added to SoulPrint', {
        description: 'Your journal is now part of your digital consciousness'
      });
    }, 2000);
  };

  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-foreground">SoulPrint Analysis</CardTitle>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-mindspace-500" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-mindspace-50 dark:bg-mindspace-900/20 rounded-lg border border-mindspace-100 dark:border-mindspace-800">
          <p className="text-sm text-mindspace-800 dark:text-mindspace-200">
            {isUploaded 
              ? "This entry has been added to your SoulPrint profile, enhancing your unique thought patterns."
              : "This entry will add to your SoulPrint profile, capturing your unique thought patterns and values."}
          </p>
        </div>
        
        {analysisItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
            className="space-y-1"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">{item.title}</span>
              <span className="text-xs font-semibold text-mindspace-600">{item.value}%</span>
            </div>
            <Progress value={item.value} className="h-2 bg-gray-100 dark:bg-gray-800">
              <motion.div 
                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: 0.3 * index }}
              />
            </Progress>
          </motion.div>
        ))}
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button 
            variant={isEncrypted ? "default" : "outline"} 
            className={`flex items-center justify-center gap-1 hover-float ${
              isEncrypted 
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                : ""
            }`}
            onClick={handleEncrypt}
            disabled={encryptionInProgress || isEncrypted}
          >
            <Lock size={14} className={encryptionInProgress ? "animate-pulse" : ""} />
            <span className="text-xs">
              {encryptionInProgress 
                ? "Encrypting..." 
                : isEncrypted 
                  ? "Encrypted" 
                  : "Encrypt"}
            </span>
          </Button>
          <Button 
            className="bg-gradient-to-r from-mindspace-500 to-mindspace-600 hover:from-mindspace-600 hover:to-mindspace-700 flex items-center justify-center gap-1 hover-float"
            disabled={!isEncrypted || isUploading || isUploaded}
            onClick={handleUploadToCrystal}
          >
            {isUploading ? (
              <Sparkles size={14} className="animate-pulse" />
            ) : (
              <Upload size={14} />
            )}
            <span className="text-xs">
              {isUploading 
                ? "Uploading..." 
                : isUploaded 
                  ? "Uploaded" 
                  : "To Crystal"}
            </span>
          </Button>
        </div>
        
        {isUploaded && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg"
          >
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-xs text-green-700 dark:text-green-300 font-medium">
                Added to SoulPrint Memory Crystal
              </span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default SoulPrintInsight;
