import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  getLoggedInUserServer,
  signInServer,
} from "./app/_api/services/authService";
import Google from "next-auth/providers/google";

import { LoginDto } from "./app/_models/DTOs/loginDto";
import { LoginSchema } from "./schemas";
import { RegisterDto } from "./app/_models/DTOs/registerDto";

export type ExtendedUser = DefaultSession["user"] & {
  role: 1 | 2 | 3;
  user_visibility: boolean;
  user_library_visibility: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
// refreshenv
export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }


      if (token.role && session.user) {
        //auth.js new version is making some error so we fix it like this
        session.user.role = token.role as 1 | 2 | 3;
        session.user.user_visibility = token.user_visibility as boolean;
        session.user.user_library_visibility =
          token.user_library_visibility as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      await getLoggedInUserServer().then(async (value: any) => {
        if (value.error) {
          await signOut();
          console.log("error içine düştü");
          return;
        } else {
          token.role = value.user_authority_id;
          token.user_visibility = value.user_visibility;
          token.user_library_visibility = value.user_library_visibility;
        }
      });
      return token;
    },
    async signIn({ account, profile }) {
      // if user try to login with google
      if (
        account &&
        account.provider === "google" &&
        profile &&
        profile.given_name &&
        profile.sub &&
        profile.email &&
        profile.email.endsWith("@gmail.com")
      ) {
        const signUpServerApi = await signInServer(
          profile.given_name,
          profile.email,
          profile.sub,
          profile.sub
        );
        if (signUpServerApi.error) {
          console.log(signUpServerApi.error);
          return false;
        } else {
          return true;
        }
      } else if (account && account.provider == "credentials" && !profile) {
        return true;
      }
      return false;
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
              email: user.user_email,
            };
          }
        } catch (error) {
          throw new Error("User authentication error");
        }

        return null;
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "__Secure-authjs.callback-url",
      options: {
        domain: ".atalaykarahan.com",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false
      }
    }
  }
},
);
