import connectToDatabase from '@/lib/db';
import RateLimit from '@/models/RateLimit';

const MAX_REQUESTS = 5;
const WINDOW_LABEL = 'enquiry'; // identifies which endpoint this limit applies to

/**
 * Checks and increments the rate limit for a given IP address.
 * Uses MongoDB with a TTL index (15-minute window auto-cleanup).
 *
 * @param {string} ip - The client IP address.
 * @returns {Promise<{allowed: boolean, remaining: number}>}
 */
export async function checkRateLimit(ip) {
  await connectToDatabase();

  // Find existing rate limit entry for this IP + endpoint
  const existing = await RateLimit.findOne({ ip, endpoint: WINDOW_LABEL });

  if (!existing) {
    // First request in this window — create a new entry
    await RateLimit.create({ ip, endpoint: WINDOW_LABEL, count: 1 });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (existing.count >= MAX_REQUESTS) {
    // Rate limit exceeded — block the request
    return { allowed: false, remaining: 0 };
  }

  // Increment the counter
  existing.count += 1;
  await existing.save();

  return { allowed: true, remaining: MAX_REQUESTS - existing.count };
}
