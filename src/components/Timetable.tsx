import React, { useState } from 'react';
import { Clock, MapPin, User, ChevronLeft, ChevronRight, Edit3, Plus } from 'lucide-react';
import EditSlotModal from './EditSlotModal';

interface ClassSlot {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  color: string;
}

const Timetable = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<{ day: string; time: string; class?: ClassSlot } | null>(null);
  
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
  ];
  
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const [schedule, setSchedule] = useState<{ [key: string]: ClassSlot[] }>({
    Monday: [
      { id: '1', subject: 'Mathematics', teacher: 'Ms. Johnson', room: 'A101', time: '09:00', color: 'subject-math' },
      { id: '2', subject: 'Science', teacher: 'Dr. Smith', room: 'Lab B', time: '10:00', color: 'subject-science' },
      { id: '3', subject: 'Art', teacher: 'Ms. Creative', room: 'Art Studio', time: '14:00', color: 'subject-art' },
    ],
    Tuesday: [
      { id: '4', subject: 'English', teacher: 'Mr. Words', room: 'A102', time: '09:00', color: 'subject-english' },
      { id: '5', subject: 'PE', teacher: 'Coach Strong', room: 'Gym', time: '11:00', color: 'subject-pe' },
      { id: '6', subject: 'Science', teacher: 'Dr. Smith', room: 'Lab B', time: '15:00', color: 'subject-science' },
    ],
    Wednesday: [
      { id: '7', subject: 'Mathematics', teacher: 'Ms. Johnson', room: 'A101', time: '08:00', color: 'subject-math' },
      { id: '8', subject: 'Art', teacher: 'Ms. Creative', room: 'Art Studio', time: '13:00', color: 'subject-art' },
    ],
    Thursday: [
      { id: '9', subject: 'English', teacher: 'Mr. Words', room: 'A102', time: '10:00', color: 'subject-english' },
      { id: '10', subject: 'PE', teacher: 'Coach Strong', room: 'Gym', time: '14:00', color: 'subject-pe' },
    ],
    Friday: [
      { id: '11', subject: 'Science', teacher: 'Dr. Smith', room: 'Lab B', time: '09:00', color: 'subject-science' },
      { id: '12', subject: 'Mathematics', teacher: 'Ms. Johnson', room: 'A101', time: '11:00', color: 'subject-math' },
    ],
  });

  // Available subjects for assignment
  const availableSubjects = [
    { name: 'Mathematics', teacher: 'Ms. Johnson', room: 'A101', color: 'subject-math', emoji: '🔢' },
    { name: 'Science', teacher: 'Dr. Smith', room: 'Lab B', color: 'subject-science', emoji: '🔬' },
    { name: 'English', teacher: 'Mr. Words', room: 'A102', color: 'subject-english', emoji: '📖' },
    { name: 'Art', teacher: 'Ms. Creative', room: 'Art Studio', color: 'subject-art', emoji: '🎨' },
    { name: 'PE', teacher: 'Coach Strong', room: 'Gym', color: 'subject-pe', emoji: '⚽' },
    { name: 'Music', teacher: 'Ms. Melody', room: 'Music Room', color: 'subject-math', emoji: '🎵' },
    { name: 'History', teacher: 'Mr. Past', room: 'A103', color: 'subject-english', emoji: '📚' },
  ];

  const getClassForTimeSlot = (day: string, time: string) => {
    return schedule[day]?.find(cls => cls.time === time);
  };

  const handleSlotClick = (day: string, time: string) => {
    const existingClass = getClassForTimeSlot(day, time);
    setEditingSlot({ day, time, class: existingClass });
    setEditModalOpen(true);
  };

  const handleSlotSave = (newSlot: ClassSlot | null) => {
    if (!editingSlot) return;

    setSchedule(prevSchedule => {
      const newSchedule = { ...prevSchedule };
      
      if (!newSchedule[editingSlot.day]) {
        newSchedule[editingSlot.day] = [];
      }

      // Remove existing class at this time slot
      newSchedule[editingSlot.day] = newSchedule[editingSlot.day].filter(
        cls => cls.time !== editingSlot.time
      );

      // Add new class if provided
      if (newSlot) {
        newSchedule[editingSlot.day].push(newSlot);
      }

      return newSchedule;
    });

    setEditingSlot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 p-6 pt-24 lg:pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <h1 className="font-fredoka text-5xl font-bold gradient-text mb-4">
            📅 Weekly Timetable
          </h1>
          <p className="font-inter text-lg text-muted-foreground">
            Your magical learning schedule awaits! ✨
          </p>
        </div>

        {/* Edit Mode Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-card rounded-2xl p-4 shadow-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center space-x-2 text-sm font-fredoka font-medium text-muted-foreground">
              <Edit3 className="w-4 h-4" />
              <span>✨ Click any time slot to customize your schedule! Add subjects or mark as free time.</span>
            </div>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-8 bg-card rounded-2xl p-4 shadow-lg animate-slide-up">
          <button 
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl hover:scale-105 transition-all"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>
          
          <h2 className="font-fredoka text-2xl font-bold">
            Week {Math.abs(currentWeek) + 1} - March 2024
          </h2>
          
          <button 
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-secondary to-secondary-light text-white rounded-xl hover:scale-105 transition-all"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Timetable Grid */}
        <div className="bg-card rounded-3xl p-6 shadow-xl animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-2 min-w-[800px]">
              {/* Header Row */}
              <div className="p-4 font-fredoka font-bold text-center text-muted-foreground">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                Time
              </div>
              {weekDays.map((day, index) => (
                <div 
                  key={day} 
                  className={`p-4 font-fredoka font-bold text-center bg-gradient-to-r ${
                    index === 0 ? 'from-primary/20 to-primary-light/20' :
                    index === 1 ? 'from-secondary/20 to-secondary-light/20' :
                    index === 2 ? 'from-accent-green/20 to-emerald-400/20' :
                    index === 3 ? 'from-accent-orange/20 to-orange-400/20' :
                    'from-accent-pink/20 to-pink-400/20'
                  } rounded-xl animate-bounce-in`}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {day}
                </div>
              ))}

              {/* Time Slots */}
              {timeSlots.map((time, timeIndex) => (
                <React.Fragment key={time}>
                  <div className="p-3 text-center font-fredoka font-semibold bg-muted/30 rounded-xl flex items-center justify-center">
                    {time}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const classData = getClassForTimeSlot(day, time);
                    return (
                      <div 
                        key={`${day}-${time}`} 
                        className={`time-slot min-h-[80px] ${classData ? 'occupied ' + classData.color : 'available'} animate-slide-up group cursor-pointer relative`}
                        style={{ animationDelay: `${(timeIndex * 5 + dayIndex) * 50}ms` }}
                        onClick={() => handleSlotClick(day, time)}
                      >
                        {/* Edit Indicator */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {classData ? (
                            <Edit3 className="w-4 h-4 text-white/70" />
                          ) : (
                            <Plus className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>

                        {classData ? (
                          <div className="text-white">
                            <h4 className="font-fredoka font-bold text-sm mb-1">
                              {classData.subject}
                            </h4>
                            <div className="space-y-1 text-xs opacity-90">
                              <div className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {classData.teacher}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {classData.room}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground group-hover:text-primary transition-colors">
                            <span className="text-xs font-medium">Click to add</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Edit Modal */}
          <EditSlotModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            slot={editingSlot?.class || null}
            day={editingSlot?.day || ''}
            time={editingSlot?.time || ''}
            onSave={handleSlotSave}
            availableSubjects={availableSubjects}
          />
        </div>

        {/* Legend */}
        <div className="mt-8 bg-card rounded-2xl p-6 shadow-lg animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h3 className="font-fredoka text-xl font-bold mb-4">Subject Colors</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'Mathematics', color: 'subject-math' },
              { name: 'Science', color: 'subject-science' },
              { name: 'English', color: 'subject-english' },
              { name: 'Art', color: 'subject-art' },
              { name: 'Physical Education', color: 'subject-pe' },
            ].map((subject, index) => (
              <div 
                key={subject.name}
                className={`flex items-center px-4 py-2 ${subject.color} text-white rounded-xl animate-bounce-in`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-3 h-3 bg-white/30 rounded-full mr-2" />
                <span className="font-fredoka font-medium text-sm">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;