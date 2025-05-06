
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Journal from "./pages/Journal";
import Mood from "./pages/Mood";
import SoulPrint from "./pages/SoulPrint";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Index />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/soulprint" element={<SoulPrint />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
