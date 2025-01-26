"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Activity, Award, Dumbbell, Flame, Heart, Target, TrendingUp, Trophy, User, Medal 
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  fetchStats, fetchProgress, fetchAchievements, 
  fetchGoals, fetchWorkoutPlans
} from '../app/services/api';
import type { 
  UserStats, WorkoutProgress, Achievement, 
  Goal, WorkoutPlan, StatsCardProps, ChartData
} from '@/lib/types';
import Image from "next/image";
import NotificationSystem from "@/components/notis";

const iconMap = {
  Medal,
  Target,
  Dumbbell,
  Activity,
  Heart,
  Trophy
} as const;

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-2xl font-bold">{value}</span>
        </div>
        {trend && <trend.icon className={`h-6 w-6 text-${trend.color}`} />}
      </div>
    </CardContent>
  </Card>
);

// Progress Chart Component


const ProgressChart = ({ data }: { data: ChartData[] }) => (
  <Card className="col-span-full">
    <CardHeader>
      <CardTitle>Progress Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString()} 
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              name="Weight (lbs)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="strength"
              stroke="#82ca9d"
              name="Strength Score"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cardio"
              stroke="#ffc658"
              name="Cardio Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

// Achievement Card Component
const AchievementCard = ({ achievements }: { achievements: Achievement[] }) => (
  <Card className="col-span-full md:col-span-1">
    <CardHeader>
      <CardTitle>Achievements</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="space-y-2">
            <div className="flex items-center gap-2">
            {achievement.icon && iconMap[achievement.icon as keyof typeof iconMap] && 
              React.createElement(iconMap[achievement.icon as keyof typeof iconMap], {
                className: "h-4 w-4"
              })
            }
              <span className="font-medium">{achievement.name}</span>
              <Badge 
                variant={achievement.unlocked ? "default" : "secondary"} 
                className="ml-auto"
              >
                {achievement.progress}%
              </Badge>
            </div>
            <Progress value={achievement.progress} />
            <p className="text-sm text-gray-500">{achievement.description}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Goals Component
const GoalsOverview = ({ goals }: { goals: Goal[] }) => (
  <Card className="col-span-full md:col-span-2">
    <CardHeader>
      <CardTitle>Current Goals</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => (
          <div key={goal.id} className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              {goal.type === 'weight' && <Target className="h-5 w-5 text-purple-500" />}
              {goal.type === 'strength' && <Dumbbell className="h-5 w-5 text-blue-500" />}
              {goal.type === 'cardio' && <Activity className="h-5 w-5 text-green-500" />}
              <h3 className="font-semibold capitalize">{goal.type} Goal</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Current: {goal.current} / Target: {goal.target}
            </p>
            <Progress value={goal.progress} className="mt-2" />
            <p className="mt-1 text-xs text-gray-500">
              Due by {new Date(goal.deadline).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Workout Plan Component
const WorkoutPlan = ({ plan }: { plan: WorkoutPlan }) => (
  <Card>
    <CardHeader>
      <CardTitle>Today&apos;s Workout</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="text-lg font-semibold mb-4">{plan.name}</h3>
      <div className="space-y-4">
        {plan.exercises.map((exercise) => (
          <div key={exercise.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
            <div>
              <p className="font-medium">{exercise.name}</p>
              <p className="text-sm text-gray-500">
                {exercise.sets} sets × {exercise.reps} reps
                {exercise.weight && ` @ ${exercise.weight}lbs`}
              </p>
            </div>
            <Button variant="outline" size="sm">Log</Button>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Main Dashboard Component
const GymDexDashboard = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [progress, setProgress] = useState<WorkoutProgress[] | null>(null);
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [goals, setGoals] = useState<Goal[] | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, progressData, achievementsData, goalsData, workoutData] = 
          await Promise.all([
            fetchStats(),
            fetchProgress(),
            fetchAchievements(),
            fetchGoals(),
            fetchWorkoutPlans(),
          ]);

        setStats(statsData);
        setProgress(progressData);
        setAchievements(achievementsData);
        setGoals(goalsData);
        setWorkoutPlan(workoutData[0]); // Get today's workout
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, []);

  if (!stats || !progress || !achievements || !goals) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image 
            src="/Dex.png"
            alt="Gymdex logo" 
            width={36}
            height={36}
            className="text-primary"
          />
          <h1 className="text-3xl font-bold text-secondary-foreground">GymDex</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NotificationSystem />
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Stats */}
        <StatsCard
          title="Today's Progress"
          value={`${stats.dailyProgress}%`}
          icon={Activity}
          trend={{ icon: Flame, color: "orange-500" }}
        />

        <StatsCard
          title="Weekly Streak"
          value={`${stats.weeklyStreak} days`}
          icon={Trophy}
          trend={{ icon: TrendingUp, color: "blue-500" }}
        />

        <StatsCard
          title="Health Score"
          value={stats.healthScore}
          icon={Heart}
          trend={{ icon: Award, color: "purple-500" }}
        />

        {/* Progress Chart */}
        <ProgressChart data={progress} />

        {/* Achievements */}
        <AchievementCard achievements={achievements} />

        {/* Goals */}
        <GoalsOverview goals={goals} />

        {/* Workout Plan */}
        {workoutPlan && (
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Today&apos;s Workout Plan</span>
                <Badge variant={workoutPlan.completed ? "default" : "secondary"}>
                  {workoutPlan.completed ? "Completed" : "In Progress"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {workoutPlan.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{exercise.name}</h3>
                      <Dumbbell className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{exercise.sets} sets × {exercise.reps} reps</p>
                      {exercise.weight && <p>Weight: {exercise.weight} lbs</p>}
                      {exercise.duration && <p>Duration: {exercise.duration} min</p>}
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Log Set
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Metrics Section */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Total Workouts</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-green-500">↑ 20% from last week</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Calories Burned</p>
                <p className="text-2xl font-bold">8,439</p>
                <p className="text-xs text-green-500">↑ 12% from last week</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Active Minutes</p>
                <p className="text-2xl font-bold">360</p>
                <p className="text-xs text-red-500">↓ 5% from last week</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Weight Change</p>
                <p className="text-2xl font-bold">-2.5 lbs</p>
                <p className="text-xs text-green-500">On track with goal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GymDexDashboard;