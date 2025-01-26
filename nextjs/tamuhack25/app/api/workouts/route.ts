import { NextRequest, NextResponse } from "next/server";

let workouts = [
  { id: 1, userId: "123", name: "Leg Day", exercises: ["Squats", "Lunges"] },
  {
    id: 2,
    userId: "456",
    name: "Chest Day",
    exercises: ["Bench Press", "Push-ups"],
  },
];

// Handle GET, POST, DELETE requests
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (userId) {
    const userWorkouts = workouts.filter(
      (workout) => workout.userId === userId
    );
    return NextResponse.json(userWorkouts);
  }

  return NextResponse.json(workouts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newWorkout = { id: workouts.length + 1, ...body };
  workouts.push(newWorkout);

  return NextResponse.json(newWorkout, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workoutId = searchParams.get("id");

  if (workoutId) {
    workouts = workouts.filter((workout) => workout.id !== parseInt(workoutId));
    return NextResponse.json({ message: "Workout deleted" });
  }

  return NextResponse.json(
    { error: "Workout ID not provided" },
    { status: 400 }
  );
}
