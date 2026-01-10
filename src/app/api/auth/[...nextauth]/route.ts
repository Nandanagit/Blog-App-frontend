import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 👇 Replace this with your own DB check
        if (credentials?.email === "nandanakamundayil@gmail.com" && credentials.password === "1234") {
          return { id: "1", name: "Test User", email: "nandanakamundayil@gmail.com" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt", // ✅ use JWT instead of database
  },
  secret: process.env.NEXTAUTH_SECRET, 
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // add custom claims
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
