"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Inbox, 
  Calendar, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck,
  Users
} from "lucide-react";

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Enquiries", href: "/admin/dashboard/enquiries", icon: Inbox },
    { name: "Events", href: "/admin/dashboard/events", icon: Calendar },
    { name: "Timetable", href: "/admin/dashboard/timetable", icon: Calendar },
    { name: "Students", href: "/admin/dashboard/students", icon: Users },
    { name: "Settings", href: "/admin/dashboard/settings", icon: SettingsIcon },
  ];

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-primary text-cream px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 font-serif text-lg font-bold">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white border border-accent/30 flex items-center justify-center shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Shivangikam Logo"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span>Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-cream hover:bg-white/10"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-primary text-cream flex-shrink-0 flex flex-col justify-between p-6 border-r border-accent/20`}
      >
        <div>
          <div className="hidden md:flex items-center gap-3 pb-8 mb-6 border-b border-white/10">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-accent/30 flex items-center justify-center shadow-inner shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Shivangikam Logo"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-cream leading-tight">Shivangikam</h1>
              <span className="text-xs text-accent font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Control
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin/dashboard"
                  ? pathname === "/admin/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? "bg-accent text-primary font-bold shadow-md"
                      : "text-cream/80 hover:text-accent hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 mt-6 md:mt-0">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-300 hover:text-red-100 hover:bg-red-900/30 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
