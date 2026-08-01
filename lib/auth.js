import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const ADMIN_COOKIE_NAME = 'admin_session';
const STUDENT_COOKIE_NAME = 'student_session';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only-must-set-env-secret-key-32-chars';

const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Creates and signs a JWT session token.
 * Expires in 8 hours.
 *
 * @param {Object} payload - { id, email, role: 'admin'|'student' }
 * @returns {Promise<string>} JWT token string
 */
export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secretKey);
}

/**
 * Verifies a JWT session token string.
 *
 * @param {string} token
 * @returns {Promise<Object|null>} Decoded payload or null if invalid/expired
 */
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// Admin session helpers
// ─────────────────────────────────────────────

/**
 * Sets the admin authentication httpOnly cookie.
 * Secure in production, SameSite=Lax, Path=/, 8 hour maxAge.
 *
 * @param {string} token
 */
export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60,
  });
}

/**
 * Removes the admin session cookie.
 */
export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Retrieves and verifies current admin session from request cookies.
 *
 * @returns {Promise<Object|null>}
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  // Ensure the token's role is admin (or legacy token without role)
  if (payload && payload.role && payload.role !== 'admin') return null;
  return payload;
}

// ─────────────────────────────────────────────
// Student session helpers
// ─────────────────────────────────────────────

/**
 * Sets the student authentication httpOnly cookie.
 * Uses a separate cookie name from admin. 8 hour maxAge.
 *
 * @param {string} token
 */
export async function setStudentAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(STUDENT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60,
  });
}

/**
 * Removes the student session cookie.
 */
export async function removeStudentAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(STUDENT_COOKIE_NAME);
}

/**
 * Retrieves and verifies current student session from request cookies.
 * Strictly enforces role === 'student'.
 *
 * @returns {Promise<Object|null>}
 */
export async function getStudentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(STUDENT_COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'student') return null;
  return payload;
}

// ─────────────────────────────────────────────
// Password utilities
// ─────────────────────────────────────────────

/**
 * Hashes a plaintext password using bcrypt with cost factor 12.
 *
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

/**
 * Compares plaintext password with bcrypt hash.
 *
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
