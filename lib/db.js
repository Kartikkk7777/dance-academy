import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// Define base client
const basePrisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = basePrisma;
}

// Extend client with transparent retry-once-on-connection-error logic
export const prisma = basePrisma.$extends({
  query: {
    async $allOperations({ model, operation, args, query }) {
      try {
        return await query(args);
      } catch (error) {
        const errorMessage = error.message || '';
        const errorCode = error.code || '';
        
        // Match common connection closed, socket, timeout, or pgbouncer/stale pool issues
        const isConnectionError =
          errorCode === 'P1017' || // Server closed connection
          errorCode === 'P1001' || // Can't reach database server
          errorMessage.includes('Closed') ||
          errorMessage.includes('connection') ||
          errorMessage.includes('socket') ||
          errorMessage.includes('pool');

        if (isConnectionError) {
          console.warn(`Prisma connection issue detected on ${model || 'generic'}.${operation}. Retrying query once...`);
          try {
            return await query(args);
          } catch (retryError) {
            console.error(`Retry attempt failed:`, retryError);
            throw retryError;
          }
        }
        throw error;
      }
    },
  },
});

export default prisma;
