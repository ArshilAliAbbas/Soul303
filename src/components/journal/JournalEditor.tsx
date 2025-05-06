
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import JournalEditorHeader from './JournalEditorHeader';
import MoodSelector from './MoodSelector';
import TagInput from './TagInput';
import AIInsights from './AIInsights';
import { ThumbsUp, Save, PenLine, Clock } from 'lucide-react';
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
  const [isFocused, setIsFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    const words = content ? content.split(/\s+/).filter(word => word.length > 0) : [];
    setWordCount(words.length);
  }, [content]);
  
  useEffect(() => {
    if (selectedPrompt && content.trim() === '') {
      setContent(selectedPrompt + '\n\n');
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            selectedPrompt.length + 2,
            selectedPrompt.length + 2
          );
        }
      }, 100);
    }
    
    const storedPrompt = localStorage.getItem('selected_prompt');
    const storedMood = localStorage.getItem('selected_mood');
    
    if (storedPrompt && content.trim() === '') {
      console.log("Found stored prompt:", storedPrompt);
      setContent(storedPrompt + '\n\n');
      
      localStorage.removeItem('selected_prompt');
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            storedPrompt.length + 2,
            storedPrompt.length + 2
          );
        }
      }, 100);
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
    
    // Auto-save draft recovery
    const savedDraft = localStorage.getItem('journal_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        if (draft.title) setTitle(draft.title);
        if (draft.content) setContent(draft.content);
        if (draft.mood) setMood(draft.mood);
        if (draft.tags) setTags(draft.tags);
        
        toast.info("Draft recovered", {
          description: "Your previous unsaved work has been restored"
        });
      } catch (e) {
        console.error("Error parsing saved draft:", e);
      }
    }
  }, [selectedPrompt, content]);
  
  // Auto-save draft periodically
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      if (title.trim() || content.trim()) {
        const draft = {
          title,
          content,
          mood,
          tags,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem('journal_draft', JSON.stringify(draft));
      }
    }, 30000); // Auto-save every 30 seconds
    
    return () => clearInterval(autosaveInterval);
  }, [title, content, mood, tags]);

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
  
  const handleSave = async () => {
    if (!title || !title.trim()) {
      toast.error("Please add a title to your journal entry");
      return;
    }
    
    if (!content || !content.trim()) {
      toast.error("Your journal entry is empty");
      return;
    }
    
    setIsSaving(true);
    
    try {
      const newEntry = {
        id: Date.now().toString(),
        title,
        content,
        mood,
        tags,
        date: new Date().toISOString(),
        wordCount
      };
      
      // Get existing entries or initialize empty array
      const existingEntries = JSON.parse(localStorage.getItem('journal_entries') || '[]');
      
      // Add new entry at the beginning
      existingEntries.unshift(newEntry);
      
      // Save updated entries to localStorage
      localStorage.setItem('journal_entries', JSON.stringify(existingEntries));
      
      // Clear the draft after successful save
      localStorage.removeItem('journal_draft');
      
      toast.success("Journal entry saved successfully", {
        description: "Your thoughts have been recorded"
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setMood('');
      setTags([]);
      setShowAI(false);
      setAiInsights(null);
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast.error("Failed to save journal entry", {
        description: "Please try again"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-0 bg-card shadow-xl relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${isFocused ? 'from-mindspace-500/5 to-neuro-500/5' : 'from-transparent to-transparent'} transition-all duration-700`} />
          <div className={`absolute inset-0 border border-transparent ${isFocused ? 'border-mindspace-500/20' : ''} rounded-lg transition-all duration-500`} />
          
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Clock className="h-4 w-4 mr-2" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            
            <div className="relative mb-4 group">
              <div className="absolute -left-4 inset-y-0 w-1 bg-gradient-to-b from-mindspace-500 to-neuro-500 rounded opacity-0 group-focus-within:opacity-100 transition-opacity" />
              
              <Textarea
                ref={textareaRef}
                placeholder="Write your thoughts here..."
                className="min-h-[300px] resize-none border-none focus-visible:ring-0 p-0 shadow-none text-base bg-transparent"
                value={content}
                onChange={handleContentChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  background: 'transparent',
                  lineHeight: '1.8',
                }}
              />
              
              {!content && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                  <div className="flex flex-col items-center">
                    <PenLine className="h-12 w-12 mb-2 text-mindspace-400" />
                    <p className="text-sm">Start writing your thoughts...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex flex-col space-y-4">
                <MoodSelector mood={mood} setMood={setMood} />
                
                <TagInput tags={tags} setTags={setTags} />
                
                <motion.div 
                  className="flex items-center justify-between pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-sm text-muted-foreground">
                    {wordCount} {wordCount === 1 ? 'word' : 'words'}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAI(!showAI)}
                      className="flex items-center gap-1 relative overflow-hidden group"
                      disabled={!content || content.length < 20}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-mindspace-500/20 to-neuro-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ThumbsUp className="h-4 w-4" />
                      <span className="hidden sm:inline relative z-10">Get</span>
                      <span className="relative z-10">AI Insights</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={!content || !content.trim() || !title || !title.trim() || isSaving}
                      className="relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-mindspace-600 via-neuro-600 to-soul-600 opacity-100 group-hover:opacity-90 transition-opacity" />
                      <Save className="h-4 w-4 mr-1 relative z-10" />
                      <span className="relative z-10">{isSaving ? 'Saving...' : 'Save Entry'}</span>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
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
