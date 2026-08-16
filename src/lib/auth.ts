import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "@/lib/email";

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
});