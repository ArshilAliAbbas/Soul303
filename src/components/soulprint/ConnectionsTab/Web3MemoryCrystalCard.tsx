
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Database, Shield, AlertCircle, FileText, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Web3MemoryCrystalCard = () => {
  const [walletStatus, setWalletStatus] = React.useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [isStoring, setIsStoring] = React.useState(false);
  const [ipfsHash, setIpfsHash] = React.useState('');
  const [isEncrypting, setIsEncrypting] = React.useState(false);
  const [isEncrypted, setIsEncrypted] = React.useState(false);
  const [isMinting, setIsMinting] = React.useState(false);
  const [isMinted, setIsMinted] = React.useState(false);
  
  useEffect(() => {
    // Check if wallet is already connected from localStorage
    const walletConnectedStatus = localStorage.getItem('walletConnected');
    if (walletConnectedStatus === 'true') {
      setWalletStatus('connected');
    }
    
    // Listen for wallet connection events from other components
    const handleWalletConnected = () => {
      setWalletStatus('connected');
      localStorage.setItem('walletConnected', 'true');
    };
    
    const handleConnectRequest = () => {
      handleConnectWallet();
    };
    
    window.addEventListener('walletConnected', handleWalletConnected);
    window.addEventListener('connectWalletRequest', handleConnectRequest);
    
    return () => {
      window.removeEventListener('walletConnected', handleWalletConnected);
      window.removeEventListener('connectWalletRequest', handleConnectRequest);
    };
  }, []);
  
  const handleConnectWallet = () => {
    setWalletStatus('connecting');
    // Simulate wallet connection
    setTimeout(() => {
      setWalletStatus('connected');
      localStorage.setItem('walletConnected', 'true');
      // Dispatch event for other components to know wallet is connected
      window.dispatchEvent(new CustomEvent('walletConnected'));
      toast.success('Wallet connected successfully', {
        description: 'Your identity is now secured via blockchain'
      });
    }, 1500);
  };

  const handleEncryptData = () => {
    setIsEncrypting(true);
    // Simulate encryption process
    setTimeout(() => {
      setIsEncrypting(false);
      setIsEncrypted(true);
      toast.success('Data encrypted successfully', {
        description: 'Your memories are now protected with ZK encryption'
      });
    }, 2000);
  };

  const handleStoreMemoryCrystal = () => {
    if (!isEncrypted) {
      toast.error('Please encrypt your data first');
      return;
    }
    
    setIsStoring(true);
    // Simulate IPFS storage
    setTimeout(() => {
      setIsStoring(false);
      setIpfsHash('QmX7bVbhZKCWXcmxJPJ8ApeGJxKqQHQDbuPCwjKvka4D9A');
      toast.success('Memory Crystal stored on IPFS', {
        description: 'Your data is now permanently stored on decentralized networks'
      });
    }, 2000);
  };
  
  const handleMintNFT = () => {
    if (!ipfsHash) {
      toast.error('Please store your Memory Crystal on IPFS first');
      return;
    }
    
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      setIsMinted(true);
      toast.success('Soulbound NFT minted successfully', {
        description: 'Your Memory Crystal is now cryptographically secured on Polygon'
      });
    }, 3000);
  };

  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 mr-1" />
          Web3 Memory Crystal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-full py-6">
          <div className="relative mb-6">
            <motion.div 
              className={`w-24 h-24 rounded-lg bg-gradient-to-br ${
                walletStatus === 'connected' 
                  ? ipfsHash 
                    ? isMinted 
                      ? 'from-green-400 to-purple-500'
                      : 'from-blue-400 to-green-500' 
                    : 'from-green-400 to-blue-500' 
                  : 'from-mindspace-400 to-neuro-600'
              } rotate-45 ${walletStatus === 'connecting' ? 'animate-pulse' : isStoring || isMinting ? 'animate-pulse' : 'animate-pulse-slow'}`}
            />
            <motion.div 
              className={`absolute inset-0 w-24 h-24 rounded-lg bg-gradient-to-br ${
                walletStatus === 'connected' 
                  ? ipfsHash 
                    ? isMinted 
                      ? 'from-green-400 to-purple-500'
                      : 'from-blue-400 to-green-500' 
                    : 'from-green-400 to-blue-500' 
                  : 'from-mindspace-400 to-neuro-600'
              } rotate-45 animate-ripple opacity-60`}
            />
            {isEncrypted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1 right-1 transform -rotate-45 bg-purple-500 text-white p-1 rounded-full"
              >
                <Lock className="h-3 w-3" />
              </motion.div>
            )}
            {isMinted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-1 left-1 transform -rotate-45 bg-green-500 text-white p-1 rounded-full"
              >
                <Sparkles className="h-3 w-3" />
              </motion.div>
            )}
          </div>
          
          {walletStatus === 'connected' ? (
            <>
              <h3 className="text-xl font-semibold text-foreground mb-2">Wallet Connected</h3>
              <p className="text-muted-foreground text-center mb-2">0x71C...93eA</p>
              <div className="flex items-center text-green-500 mb-3">
                <Shield className="h-4 w-4 mr-1" />
                <span className="text-sm">Secure connection established</span>
              </div>

              {ipfsHash ? (
                <div className="mb-6 w-full space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="text-sm font-medium flex items-center text-green-700 dark:text-green-300 mb-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Memory Crystal Stored on IPFS
                    </h4>
                    <p className="text-xs text-green-600 dark:text-green-400 font-mono break-all">{ipfsHash}</p>
                  </div>
                  
                  {isMinted ? (
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="text-sm font-medium flex items-center text-purple-700 dark:text-purple-300 mb-1">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Soulbound NFT Minted
                      </h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        Your Memory Crystal has been minted as a non-transferable NFT on Polygon
                      </p>
                      <button className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium underline">
                        View on Polygon Explorer
                      </button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover-float"
                      onClick={handleMintNFT}
                      disabled={isMinting}
                    >
                      {isMinting ? (
                        <>
                          <Sparkles className="h-4 w-4 mr-2 animate-pulse" /> Minting Soulbound NFT...
                        </>
                      ) : (
                        <>
                          <Database className="h-4 w-4 mr-2" /> Mint as Soulbound NFT
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : isEncrypted ? (
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover-float w-full mb-3"
                  onClick={handleStoreMemoryCrystal}
                  disabled={isStoring}
                >
                  <Database className="h-4 w-4 mr-2" /> 
                  {isStoring ? 'Storing on IPFS...' : 'Store Memory Crystal'}
                </Button>
              ) : (
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover-float w-full mb-3"
                  onClick={handleEncryptData}
                  disabled={isEncrypting}
                >
                  <Lock className="h-4 w-4 mr-2" /> 
                  {isEncrypting ? 'Encrypting Data...' : 'Encrypt Data with ZK'}
                </Button>
              )}
            </>
          ) : walletStatus === 'connecting' ? (
            <>
              <h3 className="text-xl font-semibold text-foreground mb-2">Connecting Wallet</h3>
              <p className="text-muted-foreground text-center mb-6">Please approve the connection in your MetaMask...</p>
              <Button disabled className="bg-gradient-to-r from-neuro-500 to-neuro-600 opacity-70">
                <AlertCircle className="h-4 w-4 mr-2 animate-pulse" /> Awaiting Approval
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-foreground mb-2">Connect Wallet</h3>
              <p className="text-muted-foreground text-center mb-6">Store your memories on IPFS/Filecoin for true data sovereignty.</p>
              <Button 
                className="bg-gradient-to-r from-neuro-500 to-neuro-600 hover:from-neuro-600 hover:to-neuro-700 hover-float"
                onClick={handleConnectWallet}
              >
                <Wallet className="h-4 w-4 mr-2" /> Connect MetaMask
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Web3MemoryCrystalCard;
