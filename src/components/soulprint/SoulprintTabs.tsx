
import React from 'react';
import { Brain, BookText, Users } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SoulprintTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const SoulprintTabs = ({ activeTab, setActiveTab }: SoulprintTabsProps) => {
  return (
    <div className="flex justify-center sm:justify-start mb-8">
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="soulprint" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          <span className="hidden sm:inline">Soul</span>Print
        </TabsTrigger>
        <TabsTrigger value="legacy" className="flex items-center gap-2">
          <BookText className="h-4 w-4" />
          <span className="hidden sm:inline">Legacy</span> Data
        </TabsTrigger>
        <TabsTrigger value="connections" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Soul</span>Links
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default SoulprintTabs;
