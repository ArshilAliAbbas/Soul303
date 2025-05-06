
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Database, Brain, Users, Lock, FileKey, ChevronRight, Link, Code } from 'lucide-react';

const Web3SecurityFeaturesCard = () => {
  return (
    <Card className="mt-6 border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 mr-1" /> 
          Web3 Security Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors cursor-pointer group">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-mindspace-500" /> 
                <span>Decentralized Storage</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Your memories are encrypted and stored on IPFS/Filecoin, not on centralized servers.
              </p>
              <div className="mt-2 p-2 bg-mindspace-50 dark:bg-mindspace-900/30 rounded text-xs text-muted-foreground">
                <code>ipfs.add(encryptedData, {"{pin: true}"})</code>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors cursor-pointer group">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-neuro-500" /> 
                <span>ZK Encryption</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Military-grade privacy using Zero Knowledge protocols to protect your data with Lit Protocol.
              </p>
              <div className="mt-2 p-2 bg-neuro-50 dark:bg-neuro-900/30 rounded text-xs text-muted-foreground">
                <code>await litNodeClient.saveEncryptionKey({"{accessControlConditions}"})</code>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors cursor-pointer group">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-soul-500" /> 
                <span>Soulbound NFTs</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Non-transferable tokens that cryptographically prove your memory ownership on Polygon.
              </p>
              <div className="mt-2 p-2 bg-soul-50 dark:bg-soul-900/30 rounded text-xs text-muted-foreground">
                <code>contract MemoryCrystal is ERC721, Soulbound {"{}"}</code>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors cursor-pointer group">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-mindspace-500" /> 
                <span>DAO Governance</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Opt-in to share insights with a decentralized memory archive governed by the community.
              </p>
              <div className="mt-2 p-2 bg-mindspace-50 dark:bg-mindspace-900/30 rounded text-xs text-muted-foreground">
                <code>function submitProposal(bytes32 insightHash) public {"{}"}</code>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-3 bg-mindspace-50 dark:bg-mindspace-900/20 rounded-lg flex items-center">
          <FileKey className="h-5 w-5 text-mindspace-500 mr-3 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Your private key is your access. We never store your keys or have access to your unencrypted memories.
          </p>
        </div>
        <div className="mt-4 p-3 bg-neuro-50 dark:bg-neuro-900/20 rounded-lg flex items-center">
          <Link className="h-5 w-5 text-neuro-500 mr-3 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Connected to Polygon network for gas-efficient operations and permanence of your memory records.
          </p>
        </div>
        <div className="mt-4 p-3 bg-soul-50 dark:bg-soul-900/20 rounded-lg flex items-center">
          <Code className="h-5 w-5 text-soul-500 mr-3 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            All smart contracts are open-source and audited for maximum security and transparency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Web3SecurityFeaturesCard;
