
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MoodChart from '@/components/mood/MoodChart';
import MoodCheck from '@/components/mood/MoodCheck';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartBar, BarChart, PieChart, LineChart } from 'lucide-react';

const Mood = () => {
  const [activeTab, setActiveTab] = useState("check");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mood Tracker</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <div></div> {/* Empty div for spacing */}
            <TabsList className="grid grid-cols-2 w-[240px]">
              <TabsTrigger value="check">
                <BarChart className="h-4 w-4 mr-2" />
                Check-in
              </TabsTrigger>
              <TabsTrigger value="history">
                <LineChart className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="check" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MoodCheck />
              <MoodChart />
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChartBar className="h-5 w-5 mr-2 text-mindspace-500" />
                    Monthly Mood Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    View your detailed mood history for deeper insights.
                  </p>
                  <div className="h-64 bg-gray-50 dark:bg-gray-800/30 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Start tracking your mood to see history here</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-neuro-500" />
                    Influencing Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Factors that most influence your mood patterns.
                  </p>
                  <div className="h-64 bg-gray-50 dark:bg-gray-800/30 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Check in regularly to see your patterns</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Mood;
