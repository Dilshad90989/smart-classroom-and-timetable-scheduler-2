import React from 'react';
import { Clock, Users, BookOpen, Calendar, Star, Award } from 'lucide-react';
import heroImage from '@/assets/smart-classroom-hero.jpg';

const StatCard = ({ icon: Icon, title, value, color, delay }: {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
  delay: number;
}) => (
  <div 
    className={`card-hover rounded-2xl p-6 text-white ${color} animate-slide-up`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between mb-4">
      <Icon className="w-8 h-8" />
      <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" />
    </div>
    <h3 className="font-fredoka text-2xl font-bold">{value}</h3>
    <p className="font-inter text-sm opacity-90">{title}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-bounce-in">
            <h1 className="font-fredoka text-6xl font-bold gradient-text mb-4">
              Smart Classroom
            </h1>
            <p className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Welcome to your magical learning adventure! 🌟 Let's make education fun and organized!
            </p>
            
            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto mb-8 animate-float">
              <img 
                src={heroImage} 
                alt="Smart classroom with children learning and digital timetables"
                className="w-full h-auto rounded-3xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-3xl" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard 
              icon={BookOpen} 
              title="Active Classes" 
              value="12" 
              color="subject-math" 
              delay={100}
            />
            <StatCard 
              icon={Users} 
              title="Students" 
              value="324" 
              color="subject-science" 
              delay={200}
            />
            <StatCard 
              icon={Calendar} 
              title="This Week" 
              value="28 hrs" 
              color="subject-english" 
              delay={300}
            />
            <StatCard 
              icon={Award} 
              title="Completed" 
              value="85%" 
              color="subject-pe" 
              delay={400}
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-3xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '500ms' }}>
            <h2 className="font-fredoka text-3xl font-bold mb-6 flex items-center">
              <Star className="w-8 h-8 text-accent-yellow mr-3" />
              Quick Actions
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <button className="btn-playful group">
                <Clock className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                View Timetable
              </button>
              <button className="btn-warm group">
                <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Manage Subjects
              </button>
              <button className="bg-gradient-to-r from-accent-green to-emerald-400 text-white rounded-full px-6 py-3 font-fredoka font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                <Users className="w-5 h-5 mr-2 group-hover:bounce" />
                Add Students
              </button>
            </div>
          </div>

          {/* Today's Highlights */}
          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 animate-float">
              <h3 className="font-fredoka text-2xl font-bold mb-4 text-primary">
                📚 Today's Schedule
              </h3>
              <div className="space-y-3">
                {[
                  { time: '09:00', subject: 'Mathematics', room: 'Room A1' },
                  { time: '10:30', subject: 'Science', room: 'Lab B2' },
                  { time: '14:00', subject: 'Art Class', room: 'Art Studio' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-white/50 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent-orange to-accent-pink rounded-xl flex items-center justify-center text-white font-fredoka font-bold mr-4">
                      {item.time}
                    </div>
                    <div>
                      <p className="font-fredoka font-semibold">{item.subject}</p>
                      <p className="text-sm text-muted-foreground">{item.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 rounded-3xl p-8 animate-float" style={{ animationDelay: '2s' }}>
              <h3 className="font-fredoka text-2xl font-bold mb-4 text-accent-green">
                🎯 Weekly Progress
              </h3>
              <div className="space-y-4">
                {[
                  { subject: 'Math', progress: 85 },
                  { subject: 'Science', progress: 92 },
                  { subject: 'Art', progress: 78 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-fredoka font-medium">{item.subject}</span>
                      <span className="text-sm font-bold">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-accent-green to-accent-yellow h-3 rounded-full animate-pulse-glow transition-all duration-1000"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;