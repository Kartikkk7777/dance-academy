"use client";

import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide on admin routes and student dashboard
  if (pathname.startsWith("/admin") || pathname.startsWith("/student/dashboard")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/918604415736"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.003 0c3.21.002 6.224 1.249 8.49 3.52 2.267 2.27 3.507 5.287 3.504 8.497 0 6.632-5.37 12.003-12.003 12.003-2.013-.002-3.993-.503-5.753-1.458L0 24zm6.59-4.846c1.6.95 3.51 1.45 5.4 1.45 5.56 0 10.077-4.52 10.08-10.08.001-2.695-1.047-5.228-2.951-7.136S14.694 1.08 12 1.08c-5.562 0-10.082 4.52-10.085 10.08 0 1.91.498 3.78 1.442 5.41L2.3 21.8l5.347-1.4c-.655-.388-1 .318-1 .318zm10.237-7.654c-.3-.15-1.78-.88-2.05-.98-.28-.1-.49-.15-.69.15-.2.3-.78.98-.96 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-1-.9-1.64-2-1.84-2.34-.2-.3-.02-.47.13-.62.14-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.67-.95-2.29-.26-.62-.52-.53-.69-.54-.18-.01-.39-.01-.6-.01-.2 0-.53.07-.8.37-.28.3-1.07 1.05-1.07 2.56s1.1 2.97 1.25 3.17c.15.2 2.16 3.3 5.23 4.62.73.3 1.3.5 1.74.64.74.23 1.4.2 1.93.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.1-.26-.2-.56-.35z" />
      </svg>
    </a>
  );
}
