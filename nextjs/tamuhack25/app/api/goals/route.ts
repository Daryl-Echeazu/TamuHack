// app/api/goals/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const goals = [
      {
        id: '1',
        type: 'weight',
        current: 165,
        target: 160,
        deadline: '2024-03-01',
        progress: 75,
      },
      {
        id: '2',
        type: 'strength',
        current: 200,
        target: 250,
        deadline: '2024-03-15',
        progress: 80,
      },
      {
        id: '3',
        type: 'cardio',
        current: 25,
        target: 30,
        deadline: '2024-02-28',
        progress: 83,
      },
    ];
    
    return NextResponse.json(goals);
  }