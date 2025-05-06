
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User, Shield, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

interface UserButtonProps {
  className?: string;
}

const UserButton: React.FC<UserButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const { user, logout } = useAuth();

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out');
  };

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={`${className} bg-gradient-to-r from-mindspace-500/10 to-neuro-500/10 hover:from-mindspace-500/20 hover:to-neuro-500/20`}
        onClick={() => navigate('/login')}
      >
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign In
        </motion.div>
      </Button>
    );
  }

  const initials = getInitials(user.name);

  // Animation variants for dropdown items
  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    })
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative h-10 w-10 rounded-full ${className}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            animate={isHovering ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarFallback className="bg-gradient-to-br from-mindspace-500 to-neuro-400 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isHovering ? 1.2 : 0, opacity: isHovering ? 0.5 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-full bg-mindspace-500/20 dark:bg-mindspace-400/20"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 overflow-hidden">
        <motion.div 
          className="flex flex-col space-y-1 p-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-medium">{user.name}</p>
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
            <Badge variant="outline" size={14} className="ml-2">Demo</Badge>
          </div>
        </motion.div>
        <DropdownMenuSeparator />
        
        <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
          <DropdownMenuItem 
            onClick={() => navigate('/profile')}
            className="flex items-center cursor-pointer hover:bg-mindspace-50 dark:hover:bg-mindspace-900/20 py-2 my-1 transition-colors rounded-md"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
          <DropdownMenuItem 
            onClick={() => navigate('/settings')}
            className="flex items-center cursor-pointer hover:bg-mindspace-50 dark:hover:bg-mindspace-900/20 py-2 my-1 transition-colors rounded-md"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </motion.div>
        
        <DropdownMenuSeparator />
        
        <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="flex items-center cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 my-1 transition-colors rounded-md"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Add a Badge component to avoid type errors
const Badge = ({ children, variant, size = 16, className = "" }) => {
  return (
    <div className={`
      inline-flex items-center justify-center 
      ${variant === "outline" ? "border border-gray-300 dark:border-gray-700 text-xs font-medium" : ""}
      px-1.5 py-0.5 rounded-full
      ${className}
    `}>
      <span style={{ fontSize: `${size}px` }}>{children}</span>
    </div>
  );
};

export default UserButton;
