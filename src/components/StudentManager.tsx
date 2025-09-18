import React, { useState } from 'react';
import { Plus, User, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  id: string;
  name: string;
  age: number;
  class: string;
  gender: 'Male' | 'Female' | 'Other';
}

const StudentManager = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Emma Johnson', age: 8, class: '3rd Grade', gender: 'Female' },
    { id: '2', name: 'Liam Smith', age: 9, class: '4th Grade', gender: 'Male' },
    { id: '3', name: 'Sophia Davis', age: 7, class: '2nd Grade', gender: 'Female' },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    class: '',
    gender: '' as 'Male' | 'Female' | 'Other' | ''
  });
  const { toast } = useToast();

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.age || !newStudent.class || !newStudent.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a student.",
        variant: "destructive"
      });
      return;
    }

    const student: Student = {
      id: Date.now().toString(),
      name: newStudent.name,
      age: parseInt(newStudent.age),
      class: newStudent.class,
      gender: newStudent.gender as 'Male' | 'Female' | 'Other'
    };

    setStudents([...students, student]);
    setNewStudent({ name: '', age: '', class: '', gender: '' });
    setIsAddModalOpen(false);
    toast({
      title: "Student Added! 🎉",
      description: `${student.name} has been added to the class.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    setStudents(students.filter(s => s.id !== id));
    toast({
      title: "Student Removed",
      description: `${student?.name} has been removed from the class.`,
    });
  };

  const getGenderEmoji = (gender: string) => {
    switch (gender) {
      case 'Male': return '👦';
      case 'Female': return '👧';
      default: return '🧒';
    }
  };

  const getClassColor = (className: string) => {
    const colors = {
      '1st Grade': 'bg-gradient-to-br from-accent-pink to-pink-400',
      '2nd Grade': 'bg-gradient-to-br from-accent-orange to-orange-400',
      '3rd Grade': 'bg-gradient-to-br from-accent-green to-emerald-400',
      '4th Grade': 'bg-gradient-to-br from-primary to-primary-light',
      '5th Grade': 'bg-gradient-to-br from-secondary to-secondary-light',
    };
    return colors[className as keyof typeof colors] || 'bg-gradient-to-br from-muted to-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 pt-24 lg:pt-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <h1 className="font-fredoka text-4xl font-bold gradient-text mb-4">
            👥 Student Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your classroom roster with ease
          </p>
        </div>

        {/* Add Student Button */}
        <div className="flex justify-center mb-8">
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="btn-playful animate-pulse-glow">
                <Plus className="w-5 h-5 mr-2" />
                Add New Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-fredoka text-2xl gradient-text">
                  Add New Student
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Student Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter student name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={newStudent.age}
                    onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="class" className="text-sm font-medium">
                    Class
                  </Label>
                  <Select onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Grade">1st Grade</SelectItem>
                      <SelectItem value="2nd Grade">2nd Grade</SelectItem>
                      <SelectItem value="3rd Grade">3rd Grade</SelectItem>
                      <SelectItem value="4th Grade">4th Grade</SelectItem>
                      <SelectItem value="5th Grade">5th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender
                  </Label>
                  <Select onValueChange={(value) => setNewStudent({ ...newStudent, gender: value as any })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddStudent} className="w-full btn-warm">
                  Add Student
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {students.map((student, index) => (
            <Card 
              key={student.id} 
              className="card-hover border-0 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className={`${getClassColor(student.class)} text-white p-4`}>
                <CardTitle className="font-fredoka text-xl flex items-center justify-between">
                  <span className="flex items-center">
                    {getGenderEmoji(student.gender)} {student.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteStudent(student.id)}
                    className="text-white hover:bg-white/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 bg-card">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Age:</span>
                    <span className="font-medium">{student.age} years old</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Class:</span>
                    <span className="font-medium">{student.class}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Gender:</span>
                    <span className="font-medium">{student.gender}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {students.length === 0 && (
          <div className="text-center py-12 animate-bounce-in">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-fredoka text-xl text-muted-foreground mb-2">
              No students yet
            </h3>
            <p className="text-muted-foreground">
              Click "Add New Student" to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManager;