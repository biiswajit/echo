import { prisma } from "db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import providers from "./providers";
import { signin, jwt } from "./callbacks";
import { clearExpiredTokens } from "./tokens";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    // TODO: add custom pages here
    signIn: "/login",
  },
  providers: providers,
  callbacks: {
    async signIn({ user, account, profile}) {
      return await signin(user, account, profile)
    },
    async jwt({ token, user, trigger}) {
      // TODO: make it a corn job
      await clearExpiredTokens();
      return await jwt(token, user, trigger);
    },
    async session({ session, token}) {
      session.user.id = token.sub as string;
      return session;
    }
  }
});