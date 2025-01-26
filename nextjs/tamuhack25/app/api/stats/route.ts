// app/api/stats/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const stats = {
    dailyProgress: 85,
    weeklyStreak: 12,
    healthScore: 'Excellent',
  };
  
  return NextResponse.json(stats);
}