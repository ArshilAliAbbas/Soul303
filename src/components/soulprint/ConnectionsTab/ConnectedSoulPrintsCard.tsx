
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Brain, Network, PlusCircle, Coins, BadgeCheck, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ConnectedSoulPrintsCard = () => {
  const [isJoiningDao, setIsJoiningDao] = React.useState(false);
  
  const handleJoinDao = () => {
    setIsJoiningDao(true);
    // Simulate joining DAO
    setTimeout(() => {
      setIsJoiningDao(false);
      toast.success('Joined Memory DAO', {
        description: 'You are now part of the decentralized memory archive'
      });
    }, 1500);
  };

  return (
    <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 mr-1" />
          Connected SoulPrints
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Connect with other SoulPrints in the Memory DAO to expand your consciousness network.</p>
        <div className="flex flex-wrap gap-3">
          {['Family', 'Friends', 'Mentors', 'Historical Figures', 'Memory DAO'].map((group, i) => (
            <Button 
              key={i} 
              variant={i === 4 ? "default" : "outline"} 
              className={i === 4 ? "bg-soul-500 hover:bg-soul-600" : "border-mindspace-200 dark:border-mindspace-800"}
            >
              {i === 4 && <Brain className="h-3 w-3 mr-1" />}
              {group}
            </Button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-medium text-sm flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-soul-500" />
              Memory DAO
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Opt-in to share your insights with the decentralized memory archive and earn tokens for valuable contributions.
            </p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs bg-soul-100 dark:bg-soul-900/30 text-soul-800 dark:text-soul-300 px-2 py-1 rounded-full">
                12 DAO Members Online
              </span>
              <Button variant="outline" size="sm" className="h-8 text-xs border-soul-200 dark:border-soul-800"
                onClick={handleJoinDao} disabled={isJoiningDao}>
                {isJoiningDao ? 'Joining...' : 'Join DAO'}
              </Button>
            </div>
            
            <div className="p-3 bg-soul-50 dark:bg-soul-900/20 rounded-lg mb-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-medium flex items-center text-soul-800 dark:text-soul-300">
                  <Coins className="h-3 w-3 mr-1" />
                  MIND Token Balance
                </h4>
                <span className="text-xs font-mono">0.00 MIND</span>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium flex items-center text-soul-800 dark:text-soul-300">
                  <Vote className="h-3 w-3 mr-1" />
                  Governance Power
                </h4>
                <span className="text-xs font-mono">0.00 vMIND</span>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-mindspace-500 to-mindspace-600 hover:from-mindspace-600 hover:to-mindspace-700 hover-float">
            <PlusCircle className="h-4 w-4 mr-2" /> Create SoulLink
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedSoulPrintsCard;
