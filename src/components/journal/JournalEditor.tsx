
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import JournalEditorHeader from './JournalEditorHeader';
import MoodSelector from './MoodSelector';
import TagInput from './TagInput';
import AIInsights from './AIInsights';
import { ThumbsUp, Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface JournalEditorProps {
  selectedPrompt?: string | null;
}

const JournalEditor = ({ selectedPrompt }: JournalEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [showAI, setShowAI] = useState(false);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    const words = content ? content.split(/\s+/).filter(word => word.length > 0) : [];
    setWordCount(words.length);
  }, [content]);
  
  useEffect(() => {
    if (selectedPrompt && content.trim() === '') {
      setContent(selectedPrompt + '\n\n');
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          selectedPrompt.length + 2,
          selectedPrompt.length + 2
        );
      }
    }
    
    const storedPrompt = localStorage.getItem('selected_prompt');
    const storedMood = localStorage.getItem('selected_mood');
    
    if (storedPrompt && content.trim() === '') {
      console.log("Found stored prompt:", storedPrompt);
      setContent(storedPrompt + '\n\n');
      
      localStorage.removeItem('selected_prompt');
      
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          storedPrompt.length + 2,
          storedPrompt.length + 2
        );
      }
    }
    
    if (storedMood) {
      console.log("Found stored mood:", storedMood);
      const moodMapping: Record<string, string> = {
        'Great': 'Happy',
        'Okay': 'Neutral',
        'Not Good': 'Sad'
      };
      
      setMood(moodMapping[storedMood as keyof typeof moodMapping] || storedMood);
      localStorage.removeItem('selected_mood');
    }
  }, [selectedPrompt, content]);

  const requestAIAnalysis = () => {
    if (!content || content.length < 20) {
      toast.error("Please write more to get AI insights");
      return;
    }

    setIsAnalyzing(true);
    setShowAI(true);
    
    setTimeout(() => {
      const insights = `Based on your entry, I notice a reflective tone. You seem to be processing thoughts carefully. 
                        Consider exploring how these feelings connect to your values and long-term goals.`;
      setAiInsights(insights);
      setIsAnalyzing(false);
      
      toast.success("AI insights generated!", {
        description: "New patterns and suggestions are available"
      });
    }, 2000);
  };
  
  const handleSave = () => {
    if (!title || !title.trim()) {
      toast.error("Please add a title to your journal entry");
      return;
    }
    
    if (!content || !content.trim()) {
      toast.error("Your journal entry is empty");
      return;
    }
    
    const newEntry = {
      id: Date.now().toString(),
      title,
      content,
      mood,
      tags,
      date: new Date().toISOString(),
      wordCount
    };
    
    const entries = JSON.parse(localStorage.getItem('journal_entries') || '[]');
    entries.unshift(newEntry);
    localStorage.setItem('journal_entries', JSON.stringify(entries));
    
    toast.success("Journal entry saved", {
      description: "Your thoughts have been recorded"
    });
    
    setTitle('');
    setContent('');
    setMood('');
    setTags([]);
    setShowAI(false);
    setAiInsights(null);
  };
  
  return (
    <div className="space-y-4">
      <JournalEditorHeader 
        wordCount={wordCount} 
        content={content} 
        title={title} 
        setTitle={setTitle}
        handleSave={handleSave} 
        isAnalyzing={isAnalyzing}
        aiInsights={aiInsights}
        requestAIAnalysis={requestAIAnalysis}
      />
      
      <Card className="border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark overflow-hidden">
        <CardContent className="p-4">
          <div className="mb-4">
            <Textarea
              ref={textareaRef}
              placeholder="Write your thoughts here..."
              className="min-h-[300px] resize-none border-none focus-visible:ring-0 p-0 shadow-none text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <MoodSelector mood={mood} setMood={setMood} />
              
              <TagInput tags={tags} setTags={setTags} />
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-muted-foreground">
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAI(!showAI)}
                    className="flex items-center gap-1"
                    disabled={!content || content.length < 20}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Get</span> AI Insights
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={!content || !content.trim() || !title || !title.trim()}
                    className="bg-gradient-to-r from-mindspace-500 to-neuro-600 hover:from-mindspace-600 hover:to-neuro-700"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save Entry
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showAI && content && content.length > 20 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AIInsights 
            isAnalyzing={isAnalyzing}
            aiInsights={aiInsights}
            mood={mood}
          />
        </motion.div>
      )}
    </div>
  );
};

export default JournalEditor;
