import dns from "node:dns";

if (typeof window === "undefined" && dns && dns.lookup) {
  type LookupCallback = (
    err: NodeJS.ErrnoException | null,
    address: string | dns.LookupAddress[],
    family?: number
  ) => void;

  const origLookup = dns.lookup.bind(dns);

  dns.lookup = ((hostname, options, callback) => {
    if (typeof options === "function") {
      return origLookup(hostname, { family: 4 }, options as LookupCallback);
    }

    if (typeof options === "number") {
      const family = options === 6 ? 6 : 4;
      return origLookup(hostname, family, callback as LookupCallback);
    }

    return origLookup(
      hostname,
      { ...(options ?? {}), family: 4 },
      callback as LookupCallback
    );
  }) as typeof dns.lookup;
}

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}