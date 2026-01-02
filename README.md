# Student Burnout Predictor 🧠

A Next.js web application that helps students track and predict their burnout risk based on academic load, sleep quality, and social energy levels.

## Features

- **📊 Interactive Dashboard**: Three comprehensive input forms for tracking:
  - Academic deadlines with difficulty ratings
  - Sleep hours and quality scores
  - Social energy expenditure

- **🎯 Risk Calculation**: Intelligent TypeScript algorithm that calculates burnout risk (0-100%) using:
  - Academic Load: 50% weight
  - Sleep Deficit: 30% weight
  - Social Exhaustion: 20% weight

- **🎨 Visual Feedback**: Color-coded status card that changes based on risk level:
  - 🟢 Green: Low Risk (0-33%)
  - 🟡 Yellow: Medium Risk (33-66%)
  - 🔴 Red: High Risk (66-100%)

- **🤖 AI Recommendations**: Personalized tips based on your highest risk factors
- **🌙 Dark Mode**: Clean, student-friendly aesthetic with Tailwind CSS
- **✨ Icons**: Beautiful Lucide-react icons throughout

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## How It Works

### Burnout Calculation

The app uses a weighted formula to calculate your burnout risk:

```
Burnout Score = (Academic × 0.5) + (Sleep × 0.3) + (Social × 0.2)
```

**Academic Load:**
- Considers upcoming deadlines, their difficulty (1-10), and urgency
- Deadlines within 3 days get 2× urgency multiplier
- Deadlines within 7 days get 1.5× urgency multiplier

**Sleep Deficit:**
- Optimal: 7-9 hours with quality score 7-10
- Calculates deficit based on deviation from 8-hour baseline
- Factors in sleep quality rating

**Social Exhaustion:**
- Optimal: 2-4 hours of high-energy social interaction
- Too little (<2h) or too much (>6h) increases exhaustion score

## Project Structure

```
The_Entity/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── AcademicForm.tsx     # Academic deadlines input
│   ├── SleepForm.tsx        # Sleep tracking form
│   ├── SocialForm.tsx       # Social energy form
│   ├── StatusCard.tsx       # Risk visualization
│   └── AIRecommendations.tsx # AI-powered tips
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   └── burnout-calculator.ts # Core calculation logic
└── package.json
```

## Usage

1. **Add Academic Deadlines**: Input upcoming assignments/exams with their difficulty and due dates
2. **Track Sleep**: Record hours slept and rate your sleep quality
3. **Log Social Activity**: Note time spent in high-energy social settings
4. **Monitor Risk**: View your real-time burnout risk score and breakdown
5. **Follow Recommendations**: Implement AI-suggested tips to reduce burnout risk

## Development

The app automatically recalculates your burnout score as you input data. All state is managed client-side with React hooks, and calculations happen in real-time.
