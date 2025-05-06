
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Sparkles, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface JournalEditorHeaderProps {
  wordCount: number;
  content: string;
  title: string;
  setTitle: (title: string) => void;
  handleSave: () => void;
  isAnalyzing: boolean;
  aiInsights: string | null;
  requestAIAnalysis: () => void;
}

const JournalEditorHeader = ({ 
  wordCount, 
  content = '', // Provide default empty string
  title, 
  setTitle,
  handleSave, 
  isAnalyzing, 
  aiInsights,
  requestAIAnalysis 
}: JournalEditorHeaderProps) => {
  
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Journal Entry</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            {formatDate()}
            <div className="ml-4 flex items-center">
              <Badge variant="outline" className="ml-2">
                {wordCount} words
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={handleSave} 
            disabled={!content || !content.trim() || !title || !title.trim()}
          >
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button 
            className="bg-gradient-to-r from-mindspace-500 to-neuro-600 hover:from-mindspace-600 hover:to-neuro-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={!content || content.length < 20 || isAnalyzing || !!aiInsights}
            onClick={requestAIAnalysis}
          >
            <Sparkles className="mr-2 h-4 w-4" /> AI Insights
          </Button>
        </div>
      </div>
      
      <div>
        <Input 
          type="text" 
          placeholder="Enter a title for your journal entry" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium"
        />
      </div>
    </div>
  );
};

export default JournalEditorHeader;
