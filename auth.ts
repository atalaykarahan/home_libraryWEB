import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  getLoggedInUserServer,
  signInServerWithGoole,
} from "./app/_api/services/authService";
import Google from "next-auth/providers/google";

import { LoginDto } from "./app/_models/DTOs/loginDto";
import { LoginSchema } from "./schemas";
import { RegisterDto } from "./app/_models/DTOs/registerDto";

export type ExtendedUser = DefaultSession["user"] & {
  role: 1 | 2 | 3;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        //auth.js new version is making some error so we fix it like this
        session.user.role = token.role as 1 | 2 | 3;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getLoggedInUserServer();

      //if there is no existing user;
      if (!existingUser) return token;

      token.role = existingUser.authority_id;
      return token;
    },
    async signIn({ account, profile }) {
      if (
        account &&
        account.provider === "google" &&
        profile &&
        profile.given_name &&
        profile.sub &&
        profile.email &&
        profile.email.endsWith("@gmail.com")
      ) {
        const user: RegisterDto = {
          user_name: profile.given_name,
          password: profile.sub,
          email: profile.email,
        };

        const signUpServerApi = await signInServerWithGoole(user);
        if (signUpServerApi) {
          return true;
        }

        return false;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const user = await getLoggedInUserServer();
          if (user) {
            return {
              id: user.user_id,
              name: user.user_name,
              email: user.email,
            };
          }
        } catch (error) {
          throw new Error("User authentication error");
        }

        return null;
      },
    }),
  ],
});
