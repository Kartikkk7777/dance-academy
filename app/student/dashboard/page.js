"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, BookOpen, CheckCircle, LogOut, Music } from "lucide-react";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StudentDashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/student/me");
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
        if (res.ok) {
          setData(await res.json());
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/student/logout", { method: "POST" });
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        {/* Header skeleton */}
        <div className="bg-dark-maroon py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-white/20 rounded animate-pulse" />
              <div className="h-7 w-48 bg-white/20 rounded animate-pulse" />
              <div className="h-3 w-36 bg-white/20 rounded animate-pulse" />
            </div>
            <div className="h-9 w-24 bg-white/20 rounded-xl animate-pulse" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Enrollment card skeleton */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
            <div className="flex-grow space-y-2">
              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-14 w-40 bg-gray-100 rounded-xl animate-pulse" />
          </div>

          {/* Timetable card skeleton */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="h-6 w-40 bg-gray-100 rounded animate-pulse mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="h-3 w-20 bg-gray-100 rounded animate-pulse flex-shrink-0" />
                  <div className="h-8 w-36 bg-gray-100 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { student, timetableSlots, events } = data;

  // Group timetable slots by day
  const slotsByDay = DAY_ORDER.reduce((acc, day) => {
    const daySlots = timetableSlots.filter((s) => s.dayOfWeek === day);
    if (daySlots.length > 0) acc[day] = daySlots;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-dark-maroon text-cream py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-accent text-xs font-bold uppercase tracking-wider mb-1">Student Portal</p>
            <h1 className="text-2xl md:text-3xl font-serif font-bold">Welcome, {student.name}</h1>
            <p className="text-cream/70 text-sm mt-1">Shivangikam Sangeet Kala Kendra</p>
          </div>
          <button
            id="student-logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-cream text-sm font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{loggingOut ? "Logging out..." : "Log Out"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Enrollment Status Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-xl flex-shrink-0">
            <CheckCircle className="w-7 h-7 text-green-500" />
          </div>
          <div className="flex-grow">
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Enrollment Status</p>
            <p className="text-xl font-serif font-bold text-primary">{student.status}</p>
            <p className="text-sm text-gray-500 mt-0.5">Registered since {new Date(student.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-3 bg-primary/5 rounded-xl px-4 py-3">
            <Music className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Enrolled Program</p>
              <p className="text-sm font-bold text-primary">{student.program}</p>
            </div>
          </div>
        </div>

        {/* Timetable */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-serif font-bold text-primary">Your Class Timetable</h2>
          </div>
          {Object.keys(slotsByDay).length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-xl">
              <p className="text-gray-400 text-sm">No timetable slots have been set for your program yet.</p>
              <p className="text-gray-400 text-xs mt-1">Please contact the academy for your schedule.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(slotsByDay).map(([day, slots]) => (
                <div key={day} className="flex flex-col sm:flex-row gap-2 sm:items-start">
                  <div className="w-28 flex-shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">{day}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot, i) => (
                      <div key={i} className="bg-primary/5 border border-primary/10 rounded-lg px-3 py-1.5 text-sm text-primary">
                        <span className="font-semibold">{slot.startTime} – {slot.endTime}</span>
                        {slot.instructor && <span className="text-gray-500 ml-1.5">({slot.instructor})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
