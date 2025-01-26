import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/">Gym Tracker</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard" className="hover:underline">
              {" "}
              {/* Fix dynamic href issue ([id]) */}
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/nutrition" className="hover:underline">
              Nutrition
            </Link>
          </li>
          <li>
            <Link href="/workouts" className="hover:underline">
              Community
            </Link>
          </li>
          <li>
            <Link href="/forum" className="hover:underline">
              Forum
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
