import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "@/lib/email";
import { loginIpRateLimit, loginRateLimit } from "./rate-limit";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const auth = betterAuth({
  database : prismaAdapter(prisma,{
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, 
    sendResetPassword: async ({url , user})=> {
       void sendEmail({
        to: user.email,
        subject: "Reset your DevConnect password",
        text: `Click to reset your password: ${url}`,
      });
    }
  },
   emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your DevConnect email",
        text: `Click to verify your email: ${url}`,
      });
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
      },
      role: {
        type: "string",
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-in/email") {
        return;
      }

      const email = ctx.body?.email as string | undefined;
      const ip = ctx.headers?.get("x-forwarded-for") ?? "unknown";

      const [emailCheck, ipCheck] = await Promise.all([
        email ? loginRateLimit.limit(email) : Promise.resolve({ success: true }),
        loginIpRateLimit.limit(ip),
      ]);

      if (!emailCheck.success || !ipCheck.success) {
        throw new APIError("TOO_MANY_REQUESTS", {
          message: "Too many login attempts. Please try again later.",
        });
      }
    }),
  },
});