
import React from 'react';
import { Button } from '@/components/ui/button';
import { Database, Wallet, HelpCircle, Shield, FileKey, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SoulprintHeader = () => {
  const { user } = useAuth();
  const [hasConnectedWallet, setHasConnectedWallet] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const handleConnectWallet = () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setHasConnectedWallet(true);
      setIsConnecting(false);
      toast.success('Wallet connected successfully', {
        description: 'Your identity is now secured via blockchain'
      });
    }, 1500);
  };

  const handleGenerateMemoryCrystal = () => {
    if (!hasConnectedWallet) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    setIsGenerating(true);
    // Simulate memory crystal generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Memory Crystal generated successfully', {
        description: 'Your memories have been encrypted and stored on IPFS'
      });
    }, 2000);
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-foreground">Your SoulPrint</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <HelpCircle className="h-5 w-5 ml-2 text-muted-foreground cursor-help" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-sm">
                <p>Your SoulPrint is your digital consciousness profile, secured by blockchain technology and evolving with every interaction. All data is encrypted and stored on IPFS/Filecoin.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-muted-foreground mt-2">
          Your digital consciousness profile, evolving with every interaction.
        </p>
        {hasConnectedWallet ? (
          <div className="flex items-center mt-2 text-sm text-green-500">
            <Wallet className="h-4 w-4 mr-1" />
            <span>Wallet connected: 0x71C...93eA</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Shield className="h-4 w-4 ml-2 text-green-500 cursor-help" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-sm">
                  <div className="flex items-center">
                    <FileKey className="h-4 w-4 mr-2 text-green-500" />
                    <p>Your data is secured with ZK encryption and stored on decentralized networks.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : null}
      </div>
      <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
        {!hasConnectedWallet ? (
          <Button 
            variant="outline" 
            disabled={isConnecting}
            className="border-mindspace-500/20 text-mindspace-600 dark:text-mindspace-400 hover:bg-mindspace-50 dark:hover:bg-mindspace-900/20"
            onClick={handleConnectWallet}
          >
            <Wallet className={`h-4 w-4 mr-2 ${isConnecting ? "animate-pulse" : ""}`} />
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
          >
            <Wallet className="h-4 w-4 mr-2" /> Connected
          </Button>
        )}
        <Button 
          className={`bg-gradient-to-r ${hasConnectedWallet ? 'from-neuro-500 to-neuro-600 hover:from-neuro-600 hover:to-neuro-700' : 'from-mindspace-500 to-mindspace-600 hover:from-mindspace-600 hover:to-mindspace-700'} hover-float`}
          disabled={!hasConnectedWallet || isGenerating}
          onClick={handleGenerateMemoryCrystal}
        >
          {isGenerating ? 
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" /> : 
            <Database className="h-4 w-4 mr-2" />
          }
          {isGenerating ? "Generating..." : "Generate Memory Crystal"}
        </Button>
      </div>
    </div>
  );
};

export default SoulprintHeader;
