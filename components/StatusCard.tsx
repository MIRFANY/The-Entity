'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, TrendingUp, Brain, Bed, BookOpen } from 'lucide-react';
import { BurnoutResult } from '@/lib/types';

interface StatusCardProps {
  result: BurnoutResult;
}

export default function StatusCard({ result }: StatusCardProps) {
  const getRiskColor = () => {
    switch (result.riskLevel) {
      case 'low': return 'from-green-600 to-green-700';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'high': return 'from-red-600 to-red-700';
    }
  };

  const getRiskIcon = () => {
    switch (result.riskLevel) {
      case 'low': return <CheckCircle size={32} />;
      case 'medium': return <AlertCircle size={32} />;
      case 'high': return <AlertTriangle size={32} />;
    }
  };

  const getRiskText = () => {
    switch (result.riskLevel) {
      case 'low': return 'Low Risk';
      case 'medium': return 'Medium Risk';
      case 'high': return 'High Risk';
    }
  };

  const getProgressColor = (score: number) => {
    if (score < 33) return 'bg-green-500';
    if (score < 66) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <div className={`bg-gradient-to-br ${getRiskColor()} rounded-lg p-8 text-white shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Burnout Risk Status</h2>
            <p className="text-white/80 text-sm">Real-time assessment</p>
          </div>
          {getRiskIcon()}
        </div>

        <div className="mb-4">
          <div className="text-6xl font-bold mb-2">{result.totalScore}%</div>
          <div className="text-xl font-semibold">{getRiskText()}</div>
        </div>

        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} />
            <span className="font-medium">Risk Breakdown</span>
          </div>
          <div className="text-sm text-white/90">
            Top concern: <span className="font-bold capitalize">{result.topRiskFactor}</span>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Metrics</h3>
        
        <div className="space-y-4">
          {/* Academic Load */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="text-blue-400" size={20} />
                <span className="text-white font-medium">Academic Load</span>
              </div>
              <span className="text-white font-bold">{result.academicLoad}%</span>
            </div>
            <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(result.academicLoad)} transition-all duration-500`}
                style={{ width: `${result.academicLoad}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">Weight: 50% of total score</div>
          </div>

          {/* Sleep Deficit */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bed className="text-purple-400" size={20} />
                <span className="text-white font-medium">Sleep Deficit</span>
              </div>
              <span className="text-white font-bold">{result.sleepDeficit}%</span>
            </div>
            <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(result.sleepDeficit)} transition-all duration-500`}
                style={{ width: `${result.sleepDeficit}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">Weight: 30% of total score</div>
          </div>

          {/* Social Exhaustion */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Brain className="text-green-400" size={20} />
                <span className="text-white font-medium">Social Exhaustion</span>
              </div>
              <span className="text-white font-bold">{result.socialExhaustion}%</span>
            </div>
            <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(result.socialExhaustion)} transition-all duration-500`}
                style={{ width: `${result.socialExhaustion}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">Weight: 20% of total score</div>
          </div>
        </div>
      </div>
    </div>
  );
}
