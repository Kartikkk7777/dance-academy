"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, CheckCircle } from "lucide-react";

const PROGRAMS = [
  "Classical Dance",
  "Semi-Classical",
  "Bollywood",
  "Zumba",
  "Yoga",
  "Vocal Music",
  "Guitar",
  "Tabla",
  "Wedding Choreography",
];

export default function StudentRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    program: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-serif font-bold text-primary">Registration Submitted!</h1>
          <p className="text-gray-600 leading-relaxed">
            Your application is <strong>pending admin approval</strong>. Once approved, you will be
            able to log in and access your student dashboard.
          </p>
          <p className="text-sm text-gray-400">
            Please contact the academy if you have not heard back within 2–3 business days.
          </p>
          <Link
            href="/student/login"
            className="inline-block mt-4 text-accent font-semibold hover:underline"
          >
            Go to Student Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
              <UserPlus className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-primary">Student Registration</h1>
            <p className="text-sm text-gray-500 mt-1">
              Apply to join Shivangikam. Your account will be activated after admin approval.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="student-reg-name"
                type="text"
                name="name"
                required
                maxLength={100}
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="student-reg-email"
                type="email"
                name="email"
                required
                maxLength={254}
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="student-reg-phone"
                type="tel"
                name="phone"
                required
                maxLength={20}
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Program Interested In <span className="text-red-500">*</span>
              </label>
              <select
                id="student-reg-program"
                name="program"
                required
                value={form.program}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-white"
              >
                <option value="" disabled>Select a program...</option>
                {PROGRAMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="student-reg-password"
                type="password"
                name="password"
                required
                minLength={8}
                maxLength={72}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <button
              id="student-reg-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-cream py-3 rounded-xl font-bold text-sm hover:bg-dark-maroon transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already approved?{" "}
            <Link href="/student/login" className="text-accent font-semibold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
