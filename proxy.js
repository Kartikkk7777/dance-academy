import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_session';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only-must-set-env-secret-key-32-chars';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, secretKey);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // 1. Protection for /api/admin/* endpoints
  if (pathname.startsWith('/api/admin')) {
    // Check CORS origin (reject if origin header present and doesn't match host)
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

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Session expired or invalid.' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // 2. Protect /admin/dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3. Redirect logged-in admin away from login page (/admin) to dashboard
  if (pathname === '/admin') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/dashboard/:path*',
    '/api/admin/:path*',
  ],
};
