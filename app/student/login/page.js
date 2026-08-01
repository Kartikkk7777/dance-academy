"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function StudentLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
      } else {
        router.push("/student/dashboard");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="max-w-sm w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
              <LogIn className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-primary">Student Login</h1>
            <p className="text-sm text-gray-500 mt-1">
              Access your Shivangikam student portal.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-amber-50 text-amber-800 text-sm rounded-xl border border-amber-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                id="student-login-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                id="student-login-password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <button
              id="student-login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-cream py-3 rounded-xl font-bold text-sm hover:bg-dark-maroon transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Not registered yet?{" "}
            <Link href="/student/register" className="text-accent font-semibold hover:underline">
              Apply here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
