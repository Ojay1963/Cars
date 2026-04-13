import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prismaClient =
  globalForPrisma.prisma ??
  (process.env.DATABASE_URL
    ? new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
      })
    : undefined);

const missingDatabaseUrlError = () =>
  new Error(
    "DATABASE_URL is not configured. Set it in your environment before using database-backed routes."
  );

export const prisma =
  prismaClient ??
  (new Proxy(
    {},
    {
      get() {
        throw missingDatabaseUrlError();
      }
    }
  ) as PrismaClient);

if (process.env.NODE_ENV !== "production" && prismaClient) {
  globalForPrisma.prisma = prismaClient;
}
