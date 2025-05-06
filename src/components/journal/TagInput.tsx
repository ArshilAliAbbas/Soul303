
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tags } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Tags className="h-4 w-4 mr-2 text-muted-foreground" />
        <label className="text-sm font-medium">Add tags to categorize your entry</label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Add a tag..."
          className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-mindspace-500 dark:bg-gray-800 dark:border-gray-700"
        />
        <Button size="sm" onClick={addTag} disabled={!tagInput.trim()}>Add</Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="px-2 py-1 flex items-center gap-1 cursor-default">
              #{tag}
              <button 
                onClick={() => removeTag(tag)}
                className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 w-4 h-4 inline-flex items-center justify-center text-xs"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
