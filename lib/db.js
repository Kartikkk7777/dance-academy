import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Cache unconditionally — not just in development.
// Without this, production (Netlify serverless) creates a new PrismaClient
// on every cold function invocation, causing a fresh Neon connection each time.
globalForPrisma.prisma = prisma;

export default prisma;
