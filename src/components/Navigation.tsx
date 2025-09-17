import React, { useState } from 'react';
import { Home, Calendar, BookOpen, Users, Settings, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'primary' },
    { id: 'timetable', label: 'Timetable', icon: Calendar, color: 'secondary' },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, color: 'accent-green' },
    { id: 'students', label: 'Students', icon: Users, color: 'accent-orange' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'accent-pink' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl px-6 py-3 shadow-xl animate-bounce-in">
        <div className="flex space-x-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  relative flex items-center px-4 py-2 rounded-xl font-fredoka font-medium transition-all duration-300 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white scale-105' 
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground hover:scale-105'
                  }
                  animate-slide-up
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className={`w-5 h-5 mr-2 transition-transform ${isActive ? '' : 'group-hover:scale-110'}`} />
                {item.label}
                
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg animate-bounce-in"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-4 p-6">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    flex items-center w-full max-w-xs px-6 py-4 rounded-2xl font-fredoka font-medium text-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white scale-105' 
                      : 'bg-card text-foreground hover:scale-105'
                    }
                    animate-bounce-in
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-6 h-6 mr-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Mobile Navigation (Alternative) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/50 px-4 py-2 z-30">
        <div className="flex justify-around max-w-md mx-auto">
          {navItems.slice(0, 4).map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  flex flex-col items-center p-2 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'text-primary scale-110' 
                    : 'text-muted-foreground hover:text-foreground hover:scale-105'
                  }
                  animate-slide-up
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-fredoka font-medium">{item.label}</span>
                
                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full mt-1 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;