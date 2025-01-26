import { NextRequest, NextResponse } from "next/server";

// Sample data (you can replace this with Supabase queries later)
let macros = [
  { id: 1, userId: "123", protein: 150, carbs: 200, fats: 50 },
  { id: 2, userId: "456", protein: 100, carbs: 150, fats: 40 },
];

// Handle GET and POST requests
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (userId) {
    const userMacros = macros.filter((macro) => macro.userId === userId);
    return NextResponse.json(userMacros);
  }

  return NextResponse.json(macros);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newMacro = { id: macros.length + 1, ...body };
  macros.push(newMacro);

  return NextResponse.json(newMacro, { status: 201 });
}
