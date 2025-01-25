import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 -mt-3">
        <div className="flex items-center gap-4">
          <Image
            src="/gymdexlogo.png" // Replace with your app logo
            alt="App Logo"
            width={75}
            height={75}
          />
          <h1 className="text-xl font-bold font-fontlogo">Gymdex</h1>
        </div>
        <div className="flex gap-6">
          <a
            href="/register"
            className="hover:underline text-sm sm:text-base"
          >
            Register
          </a>
          <a href="/login" className="hover:underline text-sm sm:text-base">
            Login
          </a>
          <a
  href="/about"
  className="text-sm sm:text-base h-8 px-4 border border-gray-400 rounded-full hover:bg-gray-100 transition-colors flex items-center -mt-1"
>
  About Us
</a>


        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <section className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Fitness App
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your ultimate platform to track your fitness goals and achieve a healthier life.
          </p>
          <div className="flex gap-4">
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-10 items-center justify-center">
          <div className="text-center">
            <Image
              src="/workout-icon.png" // Replace with relevant image
              alt="Track Workouts"
              width={100}
              height={100}
            />
            <h2 className="text-lg font-bold mt-4">Track Your Workouts</h2>
            <p className="text-sm text-gray-600">
              Log your exercises and monitor progress effortlessly.
            </p>
          </div>
          <div className="text-center">
            <Image
              src="/goals-icon.png" // Replace with relevant image
              alt="Set Goals"
              width={100}
              height={100}
            />
            <h2 className="text-lg font-bold mt-4">Set Your Goals</h2>
            <p className="text-sm text-gray-600">
              Define clear targets and achieve your fitness aspirations.
            </p>
          </div>
          <div className="text-center">
            <Image
              src="/community-icon.png" // Replace with relevant image
              alt="Join Community"
              width={100}
              height={100}
            />
            <h2 className="text-lg font-bold mt-4">Join Our Community</h2>
            <p className="text-sm text-gray-600">
              Connect with like-minded fitness enthusiasts.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center border-t">
        <p>&copy; 2025 Gymdex. All rights reserved.</p>
      </footer>
    </div>
  );
}
