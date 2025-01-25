import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Gym Tracker",
  description: "Track your macros and workouts with a community!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Include Navbar */}
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
