'use client';

import React, { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { AcademicDeadline } from '@/lib/types';

interface AcademicFormProps {
  deadlines: AcademicDeadline[];
  onChange: (deadlines: AcademicDeadline[]) => void;
}

export default function AcademicForm({ deadlines, onChange }: AcademicFormProps) {
  const [newDeadline, setNewDeadline] = useState<AcademicDeadline>({
    name: '',
    difficulty: 5,
    daysUntilDue: 7
  });

  const addDeadline = () => {
    if (newDeadline.name.trim()) {
      onChange([...deadlines, newDeadline]);
      setNewDeadline({ name: '', difficulty: 5, daysUntilDue: 7 });
    }
  };

  const removeDeadline = (index: number) => {
    onChange(deadlines.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-blue-400" size={24} />
        <h2 className="text-xl font-semibold text-white">Academic Load</h2>
      </div>

      <div className="space-y-4">
        {/* Add New Deadline */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Assignment/Exam name"
            value={newDeadline.name}
            onChange={(e) => setNewDeadline({ ...newDeadline, name: e.target.value })}
            className="w-full bg-gray-800 text-white rounded px-4 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Difficulty (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newDeadline.difficulty}
                onChange={(e) => setNewDeadline({ ...newDeadline, difficulty: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-center text-white font-semibold">{newDeadline.difficulty}</div>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 block mb-1">Days Until Due</label>
              <input
                type="number"
                min="0"
                max="30"
                value={newDeadline.daysUntilDue}
                onChange={(e) => setNewDeadline({ ...newDeadline, daysUntilDue: parseInt(e.target.value) })}
                className="w-full bg-gray-800 text-white rounded px-4 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={addDeadline}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Deadline
          </button>
        </div>

        {/* List of Deadlines */}
        {deadlines.length > 0 && (
          <div className="space-y-2 mt-4">
            <h3 className="text-sm text-gray-400 font-medium">Upcoming Deadlines:</h3>
            {deadlines.map((deadline, index) => (
              <div key={index} className="bg-gray-800 rounded p-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white font-medium">{deadline.name}</div>
                  <div className="text-sm text-gray-400">
                    Difficulty: {deadline.difficulty}/10 • Due in {deadline.daysUntilDue} days
                  </div>
                </div>
                <button
                  onClick={() => removeDeadline(index)}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
