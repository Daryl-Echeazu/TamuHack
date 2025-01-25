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
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/dashboard/id" className="hover:underline"> # Fix id
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/workout" className="hover:underline">
              Workouts
            </Link>
          </li>
          <li>
            <Link href="/community" className="hover:underline">
              Community
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
