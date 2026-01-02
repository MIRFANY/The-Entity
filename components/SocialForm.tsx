'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { SocialData } from '@/lib/types';

interface SocialFormProps {
  data: SocialData;
  onChange: (data: SocialData) => void;
}

export default function SocialForm({ data, onChange }: SocialFormProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-green-400" size={24} />
        <h2 className="text-xl font-semibold text-white">Social Energy</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 block mb-2">
            Hours in High-Energy Social Settings (Today)
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={data.highEnergyHours}
            onChange={(e) => onChange({ highEnergyHours: parseFloat(e.target.value) })}
            className="w-full bg-gray-800 text-white rounded px-4 py-2 border border-gray-700 focus:border-green-500 focus:outline-none text-lg"
          />
          <div className="text-xs text-gray-500 mt-1">
            Includes parties, group activities, networking events, etc.
          </div>
        </div>

        {/* Visual indicator */}
        <div className="bg-gray-800 rounded p-4 mt-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {data.highEnergyHours}h
            </div>
            <div className="text-sm text-gray-400">
              {data.highEnergyHours < 2 ? '🏠 Low social activity' :
               data.highEnergyHours <= 4 ? '✅ Balanced' :
               '⚡ High social load'}
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 bg-gray-800 rounded p-3">
          <strong>Tip:</strong> 2-4 hours of social interaction is typically optimal. Too little can lead to isolation, while too much can be draining.
        </div>
      </div>
    </div>
  );
}
