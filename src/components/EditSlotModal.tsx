import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Clock } from 'lucide-react';

interface ClassSlot {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  color: string;
}

interface EditSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: ClassSlot | null;
  day: string;
  time: string;
  onSave: (slot: ClassSlot | null) => void;
  availableSubjects: Array<{
    name: string;
    teacher: string;
    room: string;
    color: string;
    emoji: string;
  }>;
}

const EditSlotModal = ({ 
  isOpen, 
  onClose, 
  slot, 
  day, 
  time, 
  onSave, 
  availableSubjects 
}: EditSlotModalProps) => {
  const [editData, setEditData] = useState<Partial<ClassSlot>>({});
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  useEffect(() => {
    if (slot) {
      setEditData(slot);
      setSelectedSubject(slot.subject);
    } else {
      setEditData({
        id: Date.now().toString(),
        time,
        subject: '',
        teacher: '',
        room: '',
        color: 'subject-math'
      });
      setSelectedSubject('');
    }
  }, [slot, time]);

  const handleSubjectChange = (subjectName: string) => {
    const subject = availableSubjects.find(s => s.name === subjectName);
    if (subject) {
      setEditData({
        ...editData,
        subject: subject.name,
        teacher: subject.teacher,
        room: subject.room,
        color: subject.color
      });
      setSelectedSubject(subjectName);
    }
  };

  const handleSave = () => {
    if (editData.subject && editData.teacher && editData.room) {
      onSave(editData as ClassSlot);
    } else {
      onSave(null); // Mark as free
    }
    onClose();
  };

  const handleMarkFree = () => {
    onSave(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-card rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 animate-bounce-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-fredoka text-2xl font-bold gradient-text">
            Edit Time Slot
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Time & Day Info */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4">
            <div className="flex items-center text-primary font-fredoka font-semibold">
              <Clock className="w-5 h-5 mr-2" />
              {day} at {time}
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block font-fredoka font-semibold mb-3">Choose Subject</label>
            <div className="space-y-2">
              <button
                onClick={() => handleSubjectChange('')}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  selectedSubject === '' 
                    ? 'bg-muted border-2 border-primary' 
                    : 'bg-muted/50 hover:bg-muted'
                }`}
              >
                <span className="font-fredoka font-medium">🕐 Free Period</span>
                <p className="text-sm text-muted-foreground">No class scheduled</p>
              </button>

              {availableSubjects.map((subject) => (
                <button
                  key={subject.name}
                  onClick={() => handleSubjectChange(subject.name)}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    selectedSubject === subject.name 
                      ? 'bg-primary/10 border-2 border-primary' 
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{subject.emoji}</span>
                    <div>
                      <span className="font-fredoka font-medium">{subject.name}</span>
                      <p className="text-sm text-muted-foreground">
                        {subject.teacher} • {subject.room}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Subject Option */}
          <div>
            <label className="block font-fredoka font-semibold mb-2">Or Create Custom</label>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Subject Name"
                value={editData.subject || ''}
                onChange={(e) => {
                  setEditData({ ...editData, subject: e.target.value });
                  setSelectedSubject('custom');
                }}
                className="w-full px-4 py-3 bg-muted rounded-xl font-fredoka placeholder-muted-foreground"
              />
              <input
                type="text"
                placeholder="Teacher Name"
                value={editData.teacher || ''}
                onChange={(e) => setEditData({ ...editData, teacher: e.target.value })}
                className="w-full px-4 py-3 bg-muted rounded-xl font-inter placeholder-muted-foreground"
              />
              <input
                type="text"
                placeholder="Room/Location"
                value={editData.room || ''}
                onChange={(e) => setEditData({ ...editData, room: e.target.value })}
                className="w-full px-4 py-3 bg-muted rounded-xl font-inter placeholder-muted-foreground"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 btn-playful"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            
            {slot && (
              <button
                onClick={handleMarkFree}
                className="flex items-center justify-center px-4 py-3 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-full font-fredoka font-medium transition-all hover:scale-105"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Mark Free
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSlotModal;