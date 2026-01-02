'use client';

import React from 'react';
import { Moon } from 'lucide-react';
import { SleepData } from '@/lib/types';

interface SleepFormProps {
  data: SleepData;
  onChange: (data: SleepData) => void;
}

export default function SleepForm({ data, onChange }: SleepFormProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Moon className="text-purple-400" size={24} />
        <h2 className="text-xl font-semibold text-white">Sleep Quality</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 block mb-2">Hours Slept Last Night</label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={data.hoursSlept}
            onChange={(e) => onChange({ ...data, hoursSlept: parseFloat(e.target.value) })}
            className="w-full bg-gray-800 text-white rounded px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none text-lg"
          />
          <div className="text-xs text-gray-500 mt-1">Recommended: 7-9 hours</div>
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-2">
            Sleep Quality Score (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={data.qualityScore}
            onChange={(e) => onChange({ ...data, qualityScore: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Poor</span>
            <span className="text-white font-semibold text-lg">{data.qualityScore}/10</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Visual indicator */}
        <div className="bg-gray-800 rounded p-4 mt-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              {data.hoursSlept}h
            </div>
            <div className="text-sm text-gray-400">
              Quality: {data.qualityScore >= 7 ? '😴 Great' : data.qualityScore >= 4 ? '😐 Fair' : '😵 Poor'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
