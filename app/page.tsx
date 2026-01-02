'use client';

import React, { useState, useEffect } from 'react';
import { Brain, RefreshCcw } from 'lucide-react';
import AcademicForm from '@/components/AcademicForm';
import SleepForm from '@/components/SleepForm';
import SocialForm from '@/components/SocialForm';
import StatusCard from '@/components/StatusCard';
import AIRecommendations from '@/components/AIRecommendations';
import { AcademicDeadline, SleepData, SocialData, BurnoutData, BurnoutResult } from '@/lib/types';
import { calculateBurnoutRisk } from '@/lib/burnout-calculator';

export default function Home() {
  const [academicDeadlines, setAcademicDeadlines] = useState<AcademicDeadline[]>([]);
  const [sleepData, setSleepData] = useState<SleepData>({
    hoursSlept: 7,
    qualityScore: 7
  });
  const [socialData, setSocialData] = useState<SocialData>({
    highEnergyHours: 2
  });
  const [result, setResult] = useState<BurnoutResult | null>(null);

  // Calculate burnout risk whenever data changes
  useEffect(() => {
    const burnoutData: BurnoutData = {
      academic: academicDeadlines,
      sleep: sleepData,
      social: socialData
    };
    const calculatedResult = calculateBurnoutRisk(burnoutData);
    setResult(calculatedResult);
  }, [academicDeadlines, sleepData, socialData]);

  const resetAll = () => {
    setAcademicDeadlines([]);
    setSleepData({ hoursSlept: 7, qualityScore: 7 });
    setSocialData({ highEnergyHours: 2 });
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 border-b border-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="text-purple-300" size={40} />
              <div>
                <h1 className="text-3xl font-bold text-white">Student Burnout Predictor</h1>
                <p className="text-purple-200 text-sm">Track your well-being and prevent burnout</p>
              </div>
            </div>
            <button
              onClick={resetAll}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              <RefreshCcw size={18} />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Forms */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Data Input Dashboard</h2>
              <p className="text-gray-400 mb-6">
                Fill in your current academic, sleep, and social data to calculate your burnout risk.
              </p>
              
              <div className="space-y-6">
                <AcademicForm 
                  deadlines={academicDeadlines}
                  onChange={setAcademicDeadlines}
                />
                
                <SleepForm 
                  data={sleepData}
                  onChange={setSleepData}
                />
                
                <SocialForm 
                  data={socialData}
                  onChange={setSocialData}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {result && (
              <>
                <StatusCard result={result} />
                <AIRecommendations result={result} />
              </>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">📖 How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Academic Load (50%)</h4>
              <p>Calculated based on upcoming deadlines, their difficulty, and urgency. Closer deadlines with higher difficulty increase your score.</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Sleep Deficit (30%)</h4>
              <p>Based on hours slept and sleep quality. Optimal sleep is 7-9 hours with high quality scores.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Social Exhaustion (20%)</h4>
              <p>Measures time in high-energy social settings. Balance is key—2-4 hours is typically optimal.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
