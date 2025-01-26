import Navbar from "@/components/navbar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div>
        {/* Include Navbar */}
        <Navbar />
        <main>{children}</main>
      </div>
  );
} 
