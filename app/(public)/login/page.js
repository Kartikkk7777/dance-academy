"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
        setLoading(false);
      } else {
        // Successful login - redirect to the page they came from, or the role-specific dashboard
        const destination = from || data.redirectTo || "/student/dashboard";
        router.push(destination);
        router.refresh();
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100/50">
      <div className="text-center mb-8">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden mb-4 border border-primary/10 flex items-center justify-center bg-white shadow-sm mx-auto">
          <Image
            src="/logo.jpeg"
            alt="Shivangikam Logo"
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <h1 className="text-3xl font-serif font-bold text-primary tracking-wide">Academy Portal</h1>
        <p className="text-sm text-gray-500 mt-2">
          Sign in to access your student dashboard or admin panel.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3 text-amber-800 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <input
              id="login-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Password
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="h-4.5 w-4.5" />
            </div>
            <input
              id="login-password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        <button
          id="login-submit"
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-primary text-cream py-3.5 rounded-xl font-bold text-sm hover:bg-dark-maroon transition-all shadow-md hover:shadow-lg disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-cream" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      <div className="border-t border-gray-100 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-500">
          New student?{" "}
          <Link href="/student/register" className="text-accent font-semibold hover:underline">
            Apply for admission here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function UnifiedLogin() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Premium background blur highlights */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full z-10">
        <Suspense fallback={
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100/50 flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-sm">Loading login form...</p>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
