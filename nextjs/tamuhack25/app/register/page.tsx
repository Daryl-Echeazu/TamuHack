"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      alert("Registration successful! Please check your email to confirm your account.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

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
          <a href="/home" className="hover:underline text-sm sm:text-base">
            Home
          </a>
          <a href="/register" className="hover:underline text-sm sm:text-base">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Create an Account
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
          >
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-md transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Google Auth */}
          <button
            onClick={handleGoogleAuth}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Up with Google
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center border-t">
        <p>&copy; 2025 Gymdex. All rights reserved.</p>
      </footer>
    </div>
  );
}
