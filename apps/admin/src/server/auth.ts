import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import { signInAction } from "@/app/_actions/auth";
import { type User as UserData } from "@repo/types";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    data: UserData;
  }

  interface User {
    data: UserData;
    accessToken?: string;
  }

  interface Profile {
    email_verified?: string;
    picture?: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        const { data, error } = await signInAction(credentials);
        if (error) throw new Error(error);

        if (data.user.role !== "admin") throw new Error("Only admin can login");

        const accessToken = data.accessToken;
        const user = data.user;

        return { id: user.id, data: user, accessToken };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          data: user.data,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        data: token.data,
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin", // on signout redirects users to a custom login page.
    newUser: "/", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt",
    maxAge: Number(env.JWT_EXPIRES_IN), // 1 day
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
