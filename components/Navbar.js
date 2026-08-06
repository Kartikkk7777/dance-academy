"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogIn, LogOut, UserPlus, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState({ authenticated: false });
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Instructors", path: "/instructors" },
    { name: "Gallery", path: "/gallery" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          setSession(data);
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
      }
    }
    checkSession();
  }, [pathname]); // Check on navigation in case they just logged in/out

  async function handleLogout() {
    try {
      if (session.role === "admin") {
        await fetch("/api/auth/logout", { method: "POST" });
      } else {
        await fetch("/api/student/logout", { method: "POST" });
      }
      setSession({ authenticated: false });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <nav className="bg-light-gray text-dark-maroon sticky top-0 z-50 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-full overflow-hidden ring-1 ring-dark-maroon/10 bg-white flex items-center justify-center">
              <Image
                src="/logo.jpeg"
                alt="Shivangikam Sangeet Kala Kendra"
                fill
                sizes="80px"
                className="object-cover"
                priority
                quality={100}
              />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider hidden sm:block select-none">
              Shivangikam
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.path
                      ? "bg-dark-maroon text-cream"
                      : "hover:text-accent hover:bg-dark-maroon/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 border-l border-dark-maroon/15 pl-6">
              {session.authenticated ? (
                <>
                  <Link
                    href={session.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold text-primary hover:text-accent hover:bg-dark-maroon/5 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 bg-dark-maroon text-cream px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary transition-all shadow-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold text-primary hover:text-accent hover:bg-dark-maroon/5 transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/student/register"
                    className="flex items-center gap-1.5 bg-dark-maroon text-cream px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary transition-all shadow-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-maroon hover:text-accent hover:bg-dark-maroon/5 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-light-gray border-t border-dark-maroon/10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.path
                    ? "text-cream bg-dark-maroon"
                    : "text-dark-maroon hover:text-accent hover:bg-dark-maroon/5"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Links */}
            <div className="border-t border-dark-maroon/10 mt-4 pt-4 px-3 space-y-2">
              {session.authenticated ? (
                <>
                  <Link
                    href={session.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-2 text-base font-medium text-dark-maroon hover:text-accent"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 w-full text-left py-2 text-base font-medium text-red-700 hover:text-red-900"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-2 text-base font-medium text-dark-maroon hover:text-accent"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/student/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-2 text-base font-medium text-dark-maroon hover:text-accent"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}