import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(process.env.URL_BACKEND + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token.token}`,
    },
  });

  const response = await res.json();

  return {
    ...response,
  };
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        const res = await fetch(process.env.URL_BACKEND + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) return null;

        const user = await res.json();

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
        if(user) return { ...token, ...user };

        if (new Date().getTime() < token.expiresIn) {
            return token;
        }

        return await refreshToken(token);
    },
    async session({ token, session}) {
        session.user = token.user;
        session.token = token.token;

        return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
