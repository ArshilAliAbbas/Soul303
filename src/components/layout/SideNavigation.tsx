
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, 
  BarChart3, 
  PenTool, 
  Heart, 
  User, 
  Settings, 
  Home 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import UserButton from '@/components/auth/UserButton';

const SideNavigation = () => {
  // This will throw an error if we're not in a router context
  // We use it to detect if we're mounted inside a router
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Journal', path: '/journal', icon: PenTool },
    { name: 'Mood', path: '/mood', icon: Heart },
    { name: 'SoulPrint', path: '/soulprint', icon: Brain },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-border dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-6 border-b border-border dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mindspace-600 to-neuro-500 animate-pulse-slow"></div>
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-mindspace-600 to-neuro-500 animate-ripple opacity-60"></div>
          </div>
          <h1 className="text-xl font-bold">NeuroSphere</h1>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={cn(
                "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon size={18} className={cn("mr-3 transition-all", isActive ? "text-current" : "text-muted-foreground")} />
              <span>{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border dark:border-gray-700">
        <UserButton />
      </div>
    </aside>
  );
};

export default SideNavigation;
