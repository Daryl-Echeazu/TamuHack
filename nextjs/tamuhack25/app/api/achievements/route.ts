// app/api/achievements/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const achievements = [
    {
      id: '1',
      name: '10 Workouts',
      description: 'Complete 10 workouts',
      icon: 'Medal',
      progress: 80,
      unlocked: false,
    },
    {
      id: '2',
      name: 'Weight Goal',
      description: 'Reach your target weight',
      icon: 'Target',
      progress: 65,
      unlocked: false,
    },
    {
      id: '3',
      name: 'Strength Master',
      description: 'Lift 200% of your starting weight',
      icon: 'Dumbbell',
      progress: 90,
      unlocked: false,
    },
  ];
  
  return NextResponse.json(achievements);
}