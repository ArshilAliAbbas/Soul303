
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Calendar, Tag, Clock, Search, Filter, ChevronDown, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for journal entries with additional fields
const journalEntries = [
  {
    id: 1,
    date: '2023-04-07',
    title: 'Finding Peace in Chaos',
    excerpt: 'Today I discovered that even in the midst of a busy schedule, there are moments of tranquility to be found...',
    mood: 'Calm',
    tags: ['reflection', 'mindfulness'],
    wordCount: 342,
    readTime: 3
  },
  {
    id: 2,
    date: '2023-04-05',
    title: 'Breakthrough Moment',
    excerpt: 'I had an important realization today about how I approach challenges. It seems that when I focus on...',
    mood: 'Inspired',
    tags: ['growth', 'insight'],
    wordCount: 516,
    readTime: 4
  },
  {
    id: 3,
    date: '2023-04-03',
    title: 'Dealing with Uncertainty',
    excerpt: 'The past few days have been filled with questions about the future. I\'m trying to remind myself that...',
    mood: 'Thoughtful',
    tags: ['challenge', 'patience'],
    wordCount: 278,
    readTime: 2
  },
  {
    id: 4,
    date: '2023-04-01',
    title: 'Gratitude Practice',
    excerpt: 'Started my morning with a new gratitude practice. I listed five things I\'m thankful for and it really changed my...',
    mood: 'Grateful',
    tags: ['gratitude', 'routine'],
    wordCount: 325,
    readTime: 3
  }
];

// Custom hook for animations
const useAnimateEntrance = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: delay * 0.1 }
});

const JournalList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Filter entries based on search term and filter option
  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === "all") return matchesSearch;
    if (filter === "recent") return matchesSearch; // In a real app, this would be date-filtered
    if (filter === "mood") {
      return matchesSearch && ["Calm", "Happy", "Inspired"].includes(entry.mood);
    }
    
    return matchesSearch;
  });

  const getMoodColor = (mood: string) => {
    const moodColors: Record<string, string> = {
      "Calm": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      "Inspired": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      "Thoughtful": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      "Grateful": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
      "Happy": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
      "Anxious": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
    };
    
    return moodColors[mood] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800";
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
          <div className="text-center py-8">
            <p className="text-muted-foreground">No journal entries found matching your search.</p>
          </div>
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
                      <span>{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="outline" className={getMoodColor(entry.mood)}>
                      {entry.mood}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-primary">{entry.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{entry.excerpt}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1.5">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs text-muted-foreground hover:text-primary transition-colors">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{entry.readTime} min read</span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 h-auto opacity-70 hover:opacity-100"
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
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs gap-1 bg-background/80 backdrop-blur-sm hover:bg-background"
                        >
                          Read Entry <ChevronRight className="h-3 w-3" />
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
    </div>
  );
};

export default JournalList;
