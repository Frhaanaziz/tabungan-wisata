import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { env } from "@/env";
import {
  refreshJwtTokenAction,
  signInAction,
  signInGoogleAction,
} from "@/app/_actions/auth";
import { type User as UserData } from "@repo/types";
import * as Sentry from "@sentry/nextjs";

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
    Google({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
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

        const accessToken = data.accessToken;
        const user = data.user;

        return { id: user.id, data: user, accessToken };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile && account && account.provider === "google") {
        const input = {
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture,
          accounts: {
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          },
        };

        try {
          const { error, data } = await signInGoogleAction(input);
          if (error) throw new Error(error);
          if (!data) throw new Error("No data returned");

          user.id = data.user.id;
          user.accessToken = data.accessToken;
          user.data = data.user;
        } catch (error) {
          console.error("Google signin callbacks", error);
          throw new Error(
            "Error signing in with Google, try signing in with email and password instead.",
          );
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          data: user.data,
          accessToken: user.accessToken,
        };
      }

      if (trigger === "update" && session.accessToken) {
        const { data: newAccessToken, error } = await refreshJwtTokenAction({
          token: session.accessToken,
        });
        if (error) throw new Error("Error refreshing token");

        return {
          ...token,
          data: session.data,
          accessToken: newAccessToken,
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
  events: {
    signIn({ user }) {
      const { id, email } = user.data;
      Sentry.setUser({ id, email });
    },
    signOut() {
      Sentry.setUser(null);
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin", // on signout redirects users to a custom login page.
    newUser: "/", // New users will be directed here on first sign in (leave the property out if not of interest)
    error: "/auth/signin", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt",
    maxAge: Number(env.JWT_EXPIRES_IN), // 1 day
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
