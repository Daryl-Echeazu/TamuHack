// app/api/progress/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const progress = Array.from({ length: 6 }, (_, i) => ({
      date: new Date(2024, i, 1).toISOString(),
      weight: 180 - i * 3,
      strength: 100 + i * 20,
      cardio: 75 + i * 5,
    }));
    
    return NextResponse.json(progress);
  }