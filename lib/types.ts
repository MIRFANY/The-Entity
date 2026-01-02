export interface AcademicDeadline {
  name: string;
  difficulty: number; // 1-10
  daysUntilDue: number;
}

export interface SleepData {
  hoursSlept: number;
  qualityScore: number; // 1-10
}

export interface SocialData {
  highEnergyHours: number;
}

export interface BurnoutData {
  academic: AcademicDeadline[];
  sleep: SleepData;
  social: SocialData;
}

export interface BurnoutResult {
  totalScore: number;
  academicLoad: number;
  sleepDeficit: number;
  socialExhaustion: number;
  riskLevel: 'low' | 'medium' | 'high';
  topRiskFactor: 'academic' | 'sleep' | 'social';
}
