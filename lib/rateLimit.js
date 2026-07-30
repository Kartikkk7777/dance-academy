import prisma from '@/lib/db';

const MAX_REQUESTS = 5;
const WINDOW_LABEL = 'enquiry';
const WINDOW_MINUTES = 15;

/**
 * Checks and increments the rate limit for a given IP address.
 * Uses PostgreSQL via Prisma with time-window cleanup.
 *
 * @param {string} ip - The client IP address.
 * @returns {Promise<{allowed: boolean, remaining: number}>}
 */
export async function checkRateLimit(ip) {
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);

  // Clean up expired rate limit entries older than 15 mins
  try {
    await prisma.rateLimit.deleteMany({
      where: {
        createdAt: {
          lt: windowStart,
        },
      },
    });
  } catch (error) {
    console.error('Failed to cleanup old rate limits:', error);
  }

  // Find existing rate limit entry for this IP + endpoint within current window
  const existing = await prisma.rateLimit.findFirst({
    where: {
      ip,
      endpoint: WINDOW_LABEL,
      createdAt: {
        gte: windowStart,
      },
    },
  });

  if (!existing) {
    // First request in this window — create a new entry
    await prisma.rateLimit.create({
      data: {
        ip,
        endpoint: WINDOW_LABEL,
        count: 1,
      },
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (existing.count >= MAX_REQUESTS) {
    // Rate limit exceeded — block the request
    return { allowed: false, remaining: 0 };
  }

  // Increment the counter
  const updated = await prisma.rateLimit.update({
    where: { id: existing.id },
    data: { count: { increment: 1 } },
  });

  return { allowed: true, remaining: MAX_REQUESTS - updated.count };
}
