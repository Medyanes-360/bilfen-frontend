import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "T.C. Kimlik ile Giriş",
      credentials: {
        tc: { label: "T.C. Kimlik No", type: "text", placeholder: "TC No" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const { tc, password } = credentials ?? {};

        try {
          // backend projesindeki verify API endpoint'ine istek atılır
          const response = await fetch(`http://localhost:3001/api/auth/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tc, password }),
          });

          if (!response.ok) {
            return null;
          }

          const user = await response.json();
          return user;
        } catch (error) {
          console.error("Giriş doğrulama hatası:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
