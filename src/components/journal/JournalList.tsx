
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Calendar, Tag, Clock, Search, Filter, ChevronDown, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Define the journal entry type
interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  wordCount: number;
}

// Custom hook for animations
const useAnimateEntrance = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: delay * 0.1 }
});

const JournalList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Load entries from localStorage
  useEffect(() => {
    const storedEntries = localStorage.getItem('journal_entries');
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries);
        setEntries(parsedEntries);
      } catch (e) {
        console.error("Error parsing journal entries:", e);
        toast.error("Error loading journal entries");
      }
    }
  }, []);
  
  // Filter entries based on search term and filter option
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    if (filter === "all") return matchesSearch;
    if (filter === "recent") return matchesSearch; // Already sorted by most recent
    if (filter === "mood") {
      return matchesSearch && ["Happy", "Calm", "Inspired", "Grateful"].includes(entry.mood);
    }
    
    return matchesSearch;
  });

  const getMoodColor = (mood: string) => {
    const moodColors: Record<string, string> = {
      "Calm": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      "Happy": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
      "Inspired": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      "Thoughtful": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      "Grateful": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
      "Neutral": "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800",
      "Sad": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
      "Anxious": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800"
    };
    
    return moodColors[mood] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800";
  };

  const handleViewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setViewDialogOpen(true);
  };

  const handleDeleteEntry = (id: string) => {
    // Filter out the entry with the matching id
    const updatedEntries = entries.filter(entry => entry.id !== id);
    
    // Update state
    setEntries(updatedEntries);
    
    // Update localStorage
    localStorage.setItem('journal_entries', JSON.stringify(updatedEntries));
    
    toast.success("Journal entry deleted", {
      description: "Entry has been removed from your journal"
    });
  };

  // Calculate estimated read time based on word count
  const getReadTime = (wordCount: number) => {
    // Average adult reads about 200-250 words per minute
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    return readTime;
  };

  // Format the date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">Journal Entries</h2>
          <p className="text-sm text-muted-foreground">
            Review and reflect on your past thoughts and feelings
          </p>
        </div>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search entries..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" /> 
                Filter
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All Entries
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("recent")}>
                Recent First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("mood")}>
                Positive Moods
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
      
      <div className="grid gap-4">
        {filteredEntries.length === 0 ? (
          <motion.div 
            className="text-center py-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted">
              <PenLine className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No journal entries found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchTerm || filter !== "all" 
                ? "No entries match your current search or filter. Try changing your search terms."
                : "Start journaling to see your entries appear here. Record your thoughts, feelings, and experiences."}
            </p>
          </motion.div>
        ) : (
          filteredEntries.map((entry, index) => (
            <motion.div 
              key={entry.id}
              {...useAnimateEntrance(index)}
            >
              <Card 
                className={`cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800 neumorph-card dark:neumorph-card-dark overflow-hidden ${
                  hoveredId === entry.id ? 'scale-[1.01] shadow-lg' : ''
                }`}
                onMouseEnter={() => setHoveredId(entry.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(entry.date)}</span>
                    </div>
                    <Badge variant="outline" className={getMoodColor(entry.mood)}>
                      {entry.mood}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-primary">{entry.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {entry.content.slice(0, 150)}...
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1.5">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      <div className="flex flex-wrap gap-1">
                        {entry.tags && entry.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs text-muted-foreground hover:text-primary transition-colors">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{getReadTime(entry.wordCount)} min read</span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 h-auto opacity-70 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewEntry(entry);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {hoveredId === entry.id && (
                    <motion.div 
                      className="absolute bottom-0 right-0 left-0 p-2 bg-gradient-to-t from-background via-background/90 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs gap-1 bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewEntry(entry);
                          }}
                        >
                          Read Entry <ChevronRight className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs gap-1 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEntry(entry.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
      
      {/* Entry Viewing Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedEntry?.title}</DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span>{selectedEntry && formatDate(selectedEntry.date)}</span>
              {selectedEntry?.mood && (
                <Badge variant="outline" className={getMoodColor(selectedEntry.mood)}>
                  {selectedEntry.mood}
                </Badge>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="whitespace-pre-wrap py-4 text-base leading-relaxed">
            {selectedEntry?.content}
          </div>
          
          {selectedEntry?.tags && selectedEntry.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-4 border-t">
              {selectedEntry.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="bg-secondary/20">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <DialogFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {selectedEntry?.wordCount || 0} words · {getReadTime(selectedEntry?.wordCount || 0)} min read
            </div>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Adding missing component for empty state
const PenLine = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
};

export default JournalList;
