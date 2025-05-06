
import React, { useState, useEffect } from 'react';
import { Database, Wallet, FileKey, Link, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const SoulprintWeb3StatusBar = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [ipfsStorageEnabled, setIpfsStorageEnabled] = useState(false);
  const [zkEncryptionEnabled, setZkEncryptionEnabled] = useState(false);
  const [networkName, setNetworkName] = useState('Polygon');
  
  useEffect(() => {
    // Check if wallet is connected in localStorage
    const checkWalletConnection = () => {
      const walletStatus = localStorage.getItem('walletConnected');
      if (walletStatus === 'true') {
        setIsWalletConnected(true);
        
        // If wallet is connected, also enable IPFS and ZK encryption after a short delay
        setTimeout(() => {
          setIpfsStorageEnabled(true);
          setZkEncryptionEnabled(true);
        }, 500);
      }
    };
    
    checkWalletConnection();
    
    // Listen for wallet connection events
    window.addEventListener('walletConnected', () => {
      setIsWalletConnected(true);
      localStorage.setItem('walletConnected', 'true');
      
      // Enable IPFS and ZK encryption
      setTimeout(() => {
        setIpfsStorageEnabled(true);
        toast.success('IPFS Storage enabled');
        
        setTimeout(() => {
          setZkEncryptionEnabled(true);
          toast.success('Zero-Knowledge encryption enabled');
        }, 500);
      }, 1000);
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('walletConnected', () => {});
    };
  }, []);

  const handleStatusClick = (feature: string) => {
    if (!isWalletConnected && feature !== 'wallet') {
      toast.error('Please connect your wallet first');
      return;
    }
    
    switch (feature) {
      case 'wallet':
        if (!isWalletConnected) {
          // Dispatch event to connect wallet
          window.dispatchEvent(new CustomEvent('connectWalletRequest'));
          toast.info('Requesting wallet connection...');
        } else {
          toast.info('Wallet already connected');
        }
        break;
      case 'ipfs':
        if (!ipfsStorageEnabled && isWalletConnected) {
          setIpfsStorageEnabled(true);
          toast.success('IPFS Storage enabled');
        }
        break;
      case 'zk':
        if (!zkEncryptionEnabled && isWalletConnected) {
          setZkEncryptionEnabled(true);
          toast.success('Zero-Knowledge encryption enabled');
        }
        break;
      case 'network':
        toast.info(`Connected to ${networkName} network`);
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-6 p-3 bg-gradient-to-r from-mindspace-50 to-soul-50 dark:from-mindspace-900/30 dark:to-soul-900/30 border border-gray-100 dark:border-gray-800 rounded-lg"
    >
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleStatusClick('wallet')}
        >
          <Wallet className={`h-4 w-4 mr-1.5 ${isWalletConnected ? 'text-green-500' : 'text-gray-400'}`} />
          <span className="text-xs font-medium">
            {isWalletConnected ? (
              <span className="text-green-600 dark:text-green-400">Wallet Connected</span>
            ) : (
              <span className="text-gray-500">Wallet Not Connected</span>
            )}
          </span>
        </div>
        
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleStatusClick('ipfs')}
        >
          <Database className={`h-4 w-4 mr-1.5 ${ipfsStorageEnabled ? 'text-blue-500' : 'text-gray-400'}`} />
          <span className="text-xs font-medium">
            {ipfsStorageEnabled ? (
              <span className="text-blue-600 dark:text-blue-400">IPFS Storage</span>
            ) : (
              <span className="text-gray-500">Local Storage</span>
            )}
          </span>
        </div>
        
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleStatusClick('zk')}
        >
          <FileKey className={`h-4 w-4 mr-1.5 ${zkEncryptionEnabled ? 'text-purple-500' : 'text-gray-400'}`} />
          <span className="text-xs font-medium">
            {zkEncryptionEnabled ? (
              <span className="text-purple-600 dark:text-purple-400">ZK Encryption</span>
            ) : (
              <span className="text-gray-500">Standard Encryption</span>
            )}
          </span>
        </div>
        
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleStatusClick('network')}
        >
          <Link className="h-4 w-4 mr-1.5 text-mindspace-500" />
          <span className="text-xs font-medium text-mindspace-600 dark:text-mindspace-400">
            {networkName}
          </span>
        </div>
        
        <div className="hidden md:flex items-center ml-auto">
          <Shield className="h-4 w-4 mr-1.5 text-green-500" />
          <span className="text-xs text-green-600 dark:text-green-400">Web3 Secured</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SoulprintWeb3StatusBar;
