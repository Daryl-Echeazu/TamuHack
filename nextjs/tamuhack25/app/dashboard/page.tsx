import GymDexDashboard from '@/components/db-page';

export const metadata = {
  title: 'Dashboard | GymDex',
  description: 'Track your fitness journey with GymDex',
};

export default function DashboardPage() {
  return (
    <main>
      <GymDexDashboard />
    </main>
  );
}