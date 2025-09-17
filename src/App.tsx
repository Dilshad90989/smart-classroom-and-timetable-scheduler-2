import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from './components/Dashboard';
import Timetable from './components/Timetable';
import SubjectManager from './components/SubjectManager';
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'timetable':
        return <Timetable />;
      case 'subjects':
        return <SubjectManager />;
      case 'students':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 flex items-center justify-center pt-24 lg:pt-28">
            <div className="text-center animate-bounce-in">
              <h1 className="font-fredoka text-4xl font-bold gradient-text mb-4">👥 Students</h1>
              <p className="text-muted-foreground">Coming soon! Student management features.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 flex items-center justify-center pt-24 lg:pt-28">
            <div className="text-center animate-bounce-in">
              <h1 className="font-fredoka text-4xl font-bold gradient-text mb-4">⚙️ Settings</h1>
              <p className="text-muted-foreground">Coming soon! Customization options.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
          {renderPage()}
        </div>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
