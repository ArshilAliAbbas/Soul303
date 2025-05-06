
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md w-full p-6 sm:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl neumorph-card dark:neumorph-card-dark"
      >
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>
        
        <motion.h1 
          className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-700 dark:text-gray-300 mb-6"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Oops! This page seems to have vanished into the neural network.
        </motion.p>
        
        <motion.p 
          className="text-sm text-gray-500 dark:text-gray-400 mb-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button asChild className="bg-gradient-to-r from-mindspace-500 to-neuro-600 hover:from-mindspace-600 hover:to-neuro-700">
            <Link to="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
