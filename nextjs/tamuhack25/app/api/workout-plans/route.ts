
// app/api/workout-plans/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
    const plans = [
      {
        id: '1',
        name: 'Upper Body Power',
        exercises: [
          {
            id: '1',
            name: 'Bench Press',
            sets: 4,
            reps: 8,
            weight: 185,
          },
          {
            id: '2',
            name: 'Pull-ups',
            sets: 3,
            reps: 12,
          },
        ],
        scheduledDate: '2024-01-27',
        completed: false,
      },
    ];
    
    return NextResponse.json(plans);
  }