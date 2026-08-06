import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_COOKIE_NAME = 'admin_session';
const STUDENT_COOKIE_NAME = 'student_session';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only-must-set-env-secret-key-32-chars';
const secretKey = new TextEncoder().encode(JWT_SECRET);

async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const studentToken = request.cookies.get(STUDENT_COOKIE_NAME)?.value;

  const adminPayload = await verifySessionToken(adminToken);
  const studentPayload = await verifySessionToken(studentToken);

  // Admin is authenticated if their token has role=admin (or is a legacy token without role)
  const isAdmin = adminPayload && (adminPayload.role === 'admin' || !adminPayload.role);
  // Student is authenticated if their token explicitly has role=student
  const isStudent = studentPayload && studentPayload.role === 'student';

  // ─────────────────────────────────────────────
  // 1. CORS check helper (used on all API routes)
  // ─────────────────────────────────────────────
  function corsCheck() {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          return NextResponse.json(
            { error: 'Forbidden: Invalid request origin.' },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: 'Forbidden: Invalid origin format.' },
          { status: 403 }
        );
      }
    }
    return null;
  }

  // ─────────────────────────────────────────────
  // 2. Admin API routes — admin role only
  // ─────────────────────────────────────────────
  if (pathname.startsWith('/api/admin')) {
    const corsError = corsCheck();
    if (corsError) return corsError;

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: Session expired or invalid.' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 3. Student API routes — student role only
  // ─────────────────────────────────────────────
  if (pathname.startsWith('/api/student/dashboard') || pathname.startsWith('/api/student/me')) {
    const corsError = corsCheck();
    if (corsError) return corsError;

    if (!isStudent) {
      return NextResponse.json(
        { error: 'Unauthorized: Student session required.' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 4. Protect /admin/dashboard routes — admin only
  // ─────────────────────────────────────────────
  if (pathname.startsWith('/admin/dashboard')) {
    if (!isAdmin) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 5. Protect /student/dashboard — student only
  //    A student cookie must NOT grant access to /admin
  // ─────────────────────────────────────────────
  if (pathname.startsWith('/student/dashboard')) {
    if (!isStudent) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 6. Redirect logged-in admin away from login page
  // ─────────────────────────────────────────────
  if (pathname === '/admin') {
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ─────────────────────────────────────────────
  // 7. Redirect logged-in student away from login/register pages
  // ─────────────────────────────────────────────
  if (pathname === '/student/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/student/register') {
    if (isStudent) {
      return NextResponse.redirect(new URL('/student/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────
  // 8. Redirect logged-in users away from unified login page
  // ─────────────────────────────────────────────
  if (pathname === '/login') {
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    if (isStudent) {
      return NextResponse.redirect(new URL('/student/dashboard', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/admin',
    '/admin/dashboard/:path*',
    '/api/admin/:path*',
    '/student/register',
    '/student/dashboard/:path*',
    '/api/student/dashboard/:path*',
    '/api/student/me',
  ],
};
