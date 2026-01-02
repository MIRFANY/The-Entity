import { BurnoutData, BurnoutResult, AcademicDeadline } from './types';

/**
 * Calculate Academic Load Score (0-100)
 * Based on upcoming deadlines and their difficulty
 */
function calculateAcademicLoad(deadlines: AcademicDeadline[]): number {
  if (deadlines.length === 0) return 0;

  // Calculate weighted score based on difficulty and urgency
  const totalScore = deadlines.reduce((acc, deadline) => {
    const urgencyMultiplier = deadline.daysUntilDue <= 3 ? 2 : 
                               deadline.daysUntilDue <= 7 ? 1.5 : 1;
    return acc + (deadline.difficulty * urgencyMultiplier);
  }, 0);

  // Normalize to 0-100 scale
  const maxPossibleScore = deadlines.length * 10 * 2; // max difficulty * max urgency
  return Math.min((totalScore / maxPossibleScore) * 100, 100);
}

/**
 * Calculate Sleep Deficit Score (0-100)
 * Based on hours slept and quality
 */
function calculateSleepDeficit(hoursSlept: number, qualityScore: number): number {
  // Optimal sleep: 7-9 hours with quality 7-10
  const optimalHours = 8;
  const hourDeficit = Math.max(0, optimalHours - hoursSlept);
  
  // Calculate deficit percentage (0-100)
  const hourScore = (hourDeficit / optimalHours) * 100;
  
  // Quality score (1-10) converted to deficit (inverse)
  const qualityDeficit = ((10 - qualityScore) / 10) * 100;
  
  // Average of both factors
  return (hourScore + qualityDeficit) / 2;
}

/**
 * Calculate Social Exhaustion Score (0-100)
 * Based on hours in high-energy social settings
 */
function calculateSocialExhaustion(highEnergyHours: number): number {
  // Assume optimal is 2-4 hours of social interaction
  // Too much (>6 hours) or too little (<1 hour) increases exhaustion
  if (highEnergyHours >= 2 && highEnergyHours <= 4) {
    return 0; // Optimal range
  } else if (highEnergyHours < 2) {
    // Social isolation can contribute to burnout
    return ((2 - highEnergyHours) / 2) * 50;
  } else {
    // Over-socializing can be exhausting
    return Math.min(((highEnergyHours - 4) / 6) * 100, 100);
  }
}

/**
 * Calculate overall Burnout Risk Score (0-100%)
 * Weighted: Academic 50%, Sleep 30%, Social 20%
 */
export function calculateBurnoutRisk(data: BurnoutData): BurnoutResult {
  const academicLoad = calculateAcademicLoad(data.academic);
  const sleepDeficit = calculateSleepDeficit(data.sleep.hoursSlept, data.sleep.qualityScore);
  const socialExhaustion = calculateSocialExhaustion(data.social.highEnergyHours);

  // Weighted average
  const totalScore = (
    academicLoad * 0.5 +
    sleepDeficit * 0.3 +
    socialExhaustion * 0.2
  );

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high';
  if (totalScore < 33) riskLevel = 'low';
  else if (totalScore < 66) riskLevel = 'medium';
  else riskLevel = 'high';

  // Find top risk factor
  const factors = [
    { name: 'academic' as const, score: academicLoad },
    { name: 'sleep' as const, score: sleepDeficit },
    { name: 'social' as const, score: socialExhaustion }
  ];
  const topRiskFactor = factors.reduce((max, factor) => 
    factor.score > max.score ? factor : max
  ).name;

  return {
    totalScore: Math.round(totalScore),
    academicLoad: Math.round(academicLoad),
    sleepDeficit: Math.round(sleepDeficit),
    socialExhaustion: Math.round(socialExhaustion),
    riskLevel,
    topRiskFactor
  };
}

/**
 * Generate AI recommendations based on risk factors
 */
export function generateRecommendations(result: BurnoutResult): string[] {
  const recommendations: string[] = [];

  // Top risk factor recommendation
  if (result.topRiskFactor === 'sleep' || result.sleepDeficit > 50) {
    recommendations.push('💤 Your sleep quality needs attention. Try taking a 20-minute power nap or going to bed 30 minutes earlier tonight.');
  }
  
  if (result.topRiskFactor === 'academic' || result.academicLoad > 50) {
    recommendations.push('📚 Your academic load is high. Break down large tasks into smaller chunks and tackle the most urgent ones first.');
  }
  
  if (result.topRiskFactor === 'social' || result.socialExhaustion > 50) {
    if (result.socialExhaustion > 60) {
      recommendations.push('🧘 You might be over-socializing. Schedule some alone time to recharge your energy.');
    } else {
      recommendations.push('👥 Consider balancing social time with quiet activities that help you decompress.');
    }
  }

  // Overall risk recommendations
  if (result.riskLevel === 'high') {
    recommendations.push('⚠️ High burnout risk detected. Consider talking to a counselor or taking a mental health day.');
  } else if (result.riskLevel === 'medium') {
    recommendations.push('⚡ Moderate burnout risk. Focus on self-care activities and maintain healthy boundaries.');
  } else {
    recommendations.push('✅ You\'re managing well! Keep maintaining this balance.');
  }

  return recommendations;
}
