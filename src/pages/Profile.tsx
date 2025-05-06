
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRound, Shield, Brain, Database } from 'lucide-react';

const Profile = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        
        <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5" /> Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mindspace-500 to-neuro-500 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <div>
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-muted-foreground">john.doe@example.com</p>
                <Button variant="link" className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400">
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">End-to-End Encryption</h4>
                <p className="text-sm text-muted-foreground">Your data is encrypted and only accessible to you.</p>
              </div>
              <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Decentralized Storage</h4>
                <p className="text-sm text-muted-foreground">Your journals are stored on IPFS/Filecoin.</p>
              </div>
              <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>
            </div>
            <Button variant="outline" className="w-full mt-2">Manage Privacy Settings</Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" /> AI Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Configure how the AI analyzes your journals and provides insights.</p>
              <Button variant="outline" className="w-full">Customize AI Settings</Button>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" /> Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Export your data or manage what's stored in your vault.</p>
              <Button variant="outline" className="w-full">Manage Data</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
