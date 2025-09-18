import React, { useState } from 'react';
import { BookOpen, Plus, Edit3, Trash2, Save, X, Clock, User, MapPin } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  teacher: string;
  room: string;
  duration: string;
  color: string;
  emoji: string;
}

const SubjectManager = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', teacher: 'Ms. Johnson', room: 'A101', duration: '60 min', color: 'subject-math', emoji: '🔢' },
    { id: '2', name: 'Science', teacher: 'Dr. Smith', room: 'Lab B', duration: '90 min', color: 'subject-science', emoji: '🔬' },
    { id: '3', name: 'English', teacher: 'Mr. Words', room: 'A102', duration: '45 min', color: 'subject-english', emoji: '📖' },
    { id: '4', name: 'Art', teacher: 'Ms. Creative', room: 'Art Studio', duration: '75 min', color: 'subject-art', emoji: '🎨' },
    { id: '5', name: 'Physical Education', teacher: 'Coach Strong', room: 'Gymnasium', duration: '60 min', color: 'subject-pe', emoji: '⚽' },
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Subject>>({});

  const colorOptions = [
    { name: 'Math Blue', class: 'subject-math' },
    { name: 'Science Green', class: 'subject-science' },
    { name: 'English Pink', class: 'subject-english' },
    { name: 'Art Orange', class: 'subject-art' },
    { name: 'PE Purple', class: 'subject-pe' },
  ];

  const handleEdit = (subject: Subject) => {
    setIsEditing(subject.id);
    setEditForm(subject);
  };

  const handleSave = () => {
    if (isEditing && editForm.id) {
      setSubjects(subjects.map(sub => 
        sub.id === editForm.id ? { ...sub, ...editForm } as Subject : sub
      ));
    } else if (showAddForm && editForm.name) {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: editForm.name || '',
        teacher: editForm.teacher || '',
        room: editForm.room || '',
        duration: editForm.duration || '60 min',
        color: editForm.color || 'subject-math',
        emoji: editForm.emoji || '📚',
      };
      setSubjects([...subjects, newSubject]);
      setShowAddForm(false);
    }
    setIsEditing(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setShowAddForm(false);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  const SubjectCard = ({ subject, index }: { subject: Subject; index: number }) => {
    const isCurrentlyEditing = isEditing === subject.id;

    return (
      <div 
        className={`subject-card ${subject.color} animate-bounce-in`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {isCurrentlyEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editForm.name || ''}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 bg-white/20 rounded-xl text-white placeholder-white/70 font-fredoka"
              placeholder="Subject Name"
            />
            <input
              type="text"
              value={editForm.teacher || ''}
              onChange={(e) => setEditForm({ ...editForm, teacher: e.target.value })}
              className="w-full px-3 py-2 bg-white/20 rounded-xl text-white placeholder-white/70 font-inter"
              placeholder="Teacher Name"
            />
            <input
              type="text"
              value={editForm.room || ''}
              onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
              className="w-full px-3 py-2 bg-white/20 rounded-xl text-white placeholder-white/70 font-inter"
              placeholder="Room"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-fredoka font-medium transition-all"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-fredoka font-medium transition-all"
              >
                <X className="w-4 h-4 mr-2 inline" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl animate-bounce">{subject.emoji}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(subject)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all hover:scale-110"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(subject.id)}
                  className="p-2 bg-white/20 hover:bg-red-400/50 rounded-lg transition-all hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-fredoka text-xl font-bold mb-2">{subject.name}</h3>
            
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {subject.teacher}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {subject.room}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {subject.duration}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/5 p-6 pt-24 lg:pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <h1 className="font-fredoka text-5xl font-bold gradient-text mb-4">
            📚 Subject Manager
          </h1>
          <p className="font-inter text-lg text-muted-foreground">
            Organize your magical learning subjects! ✨
          </p>
        </div>

        {/* Add New Subject Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-playful group animate-slide-up"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Add New Subject
          </button>
        </div>

        {/* Add Subject Form */}
        {showAddForm && (
          <div className="mb-8 bg-card rounded-2xl p-6 shadow-xl animate-bounce-in max-w-2xl mx-auto">
            <h2 className="font-fredoka text-xl font-bold mb-4 text-center">Create New Subject</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                value={editForm.name || ''}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 bg-muted rounded-lg font-fredoka placeholder-muted-foreground text-sm"
                placeholder="Subject Name"
              />
              <input
                type="text"
                value={editForm.teacher || ''}
                onChange={(e) => setEditForm({ ...editForm, teacher: e.target.value })}
                className="w-full px-3 py-2 bg-muted rounded-lg font-inter placeholder-muted-foreground text-sm"
                placeholder="Teacher Name"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editForm.room || ''}
                  onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
                  className="w-full px-3 py-2 bg-muted rounded-lg font-inter placeholder-muted-foreground text-sm"
                  placeholder="Room"
                />
                <input
                  type="text"
                  value={editForm.duration || ''}
                  onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                  className="w-full px-3 py-2 bg-muted rounded-lg font-inter placeholder-muted-foreground text-sm"
                  placeholder="Duration"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editForm.emoji || ''}
                  onChange={(e) => setEditForm({ ...editForm, emoji: e.target.value })}
                  className="w-full px-3 py-2 bg-muted rounded-lg font-inter placeholder-muted-foreground text-sm"
                  placeholder="Emoji"
                />
                <select
                  value={editForm.color || 'subject-math'}
                  onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                  className="w-full px-3 py-2 bg-muted rounded-lg font-inter text-sm"
                >
                  {colorOptions.map(color => (
                    <option key={color.class} value={color.class}>{color.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 btn-warm text-sm py-2"
              >
                <Save className="w-4 h-4 mr-2" />
                Create
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-muted hover:bg-muted/70 text-muted-foreground px-4 py-2 rounded-full font-fredoka font-medium transition-all hover:scale-105 text-sm"
              >
                <X className="w-4 h-4 mr-2 inline" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <SubjectCard key={subject.id} subject={subject} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {subjects.length === 0 && (
          <div className="text-center py-16 animate-bounce-in">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-fredoka text-2xl font-bold mb-2">No Subjects Yet</h3>
            <p className="text-muted-foreground mb-6">Add your first subject to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectManager;