// types/index.ts

export interface UserStats {
    dailyProgress: number;
    weeklyStreak: number;
    healthScore: string;
  }
  
export interface WorkoutProgress {
    date: string;
    weight: number;
    strength: number;
    cardio: number;
  }
  
export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    progress: number;
    unlocked: boolean;
  }
  
export interface Goal {
    id: string;
    type: 'weight' | 'strength' | 'cardio';
    current: number;
    target: number;
    deadline: string;
    progress: number;
  }
  
export interface WorkoutPlan {
    id: string;
    name: string;
    exercises: Exercise[];
    scheduledDate: string;
    completed: boolean;
  }
  
export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: number;
  }

export interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    trend?: {
      icon: React.ElementType;
      color: string;
    };
  }
  
export interface ChartData {
    date: string;
    weight: number;
    strength: number;
    cardio: number;
  }