// services/api.ts

export const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      return null;
    }
  };
  
  export const fetchProgress = async () => {
    try {
      const response = await fetch('/api/progress');
      if (!response.ok) throw new Error('Failed to fetch progress');
      return response.json();
    } catch (error) {
      console.error('Error fetching progress:', error);
      return [];
    }
  };
  
  export const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      if (!response.ok) throw new Error('Failed to fetch achievements');
      return response.json();
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }
  };
  
  export const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals');
      if (!response.ok) throw new Error('Failed to fetch goals');
      return response.json();
    } catch (error) {
      console.error('Error fetching goals:', error);
      return [];
    }
  };
  
  export const fetchWorkoutPlans = async () => {
    try {
      const response = await fetch('/api/workout-plans');
      if (!response.ok) throw new Error('Failed to fetch workout plans');
      return response.json();
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      return [];
    }
  };