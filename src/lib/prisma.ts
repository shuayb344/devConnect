import dns from "node:dns";

if (typeof window === "undefined" && dns && dns.lookup) {
  const origLookup = dns.lookup;
  // @ts-ignore
  dns.lookup = (hostname: any, options: any, callback: any) => {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    return origLookup(hostname, { ...options, family: 4 }, callback);
  };
}

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}