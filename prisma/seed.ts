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

import { prisma } from "../src/lib/prisma";

const HARDCODED_USER_ID = "cmsk4c1mu000066pofb2hqwzb";

async function main() {
  const user = await prisma.user.upsert({
    where: { username: "john_doe" },
    update: {},
    create: {
      id: HARDCODED_USER_ID,
      username: "john_doe",
      email: "john@example.com",
    },
  });

  console.log("Seeded user:", user);

  const postCount = await prisma.post.count();
  if (postCount === 0) {
    await prisma.post.createMany({
      data: [
        { title: "Welcome to DevConnect! Built with Next.js 16 & Prisma 7.", authorId: user.id },
        { title: "Exploring React 19 Server Components and Server Actions.", authorId: user.id },
        { title: "How to handle database pooling with Neon & Driver Adapters.", authorId: user.id },
      ],
    });
    console.log("Seeded initial posts.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });