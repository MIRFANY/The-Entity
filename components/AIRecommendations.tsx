'use client';

import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';
import { BurnoutResult } from '@/lib/types';
import { generateRecommendations } from '@/lib/burnout-calculator';

interface AIRecommendationsProps {
  result: BurnoutResult;
}

export default function AIRecommendations({ result }: AIRecommendationsProps) {
  const recommendations = generateRecommendations(result);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-6 border border-indigo-700">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-purple-300" size={24} />
        <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
      </div>

      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <div className="flex gap-3">
              <Lightbulb className="text-yellow-300 flex-shrink-0 mt-1" size={20} />
              <p className="text-white text-sm leading-relaxed">{recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-purple-200 bg-white/5 rounded p-3">
        <strong>Note:</strong> These recommendations are generated based on your current data. 
        For persistent burnout symptoms, please consult with a mental health professional.
      </div>
    </div>
  );
}
