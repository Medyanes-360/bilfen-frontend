import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "T.C. Kimlik ile Giriş",
      credentials: {
        tc: { label: "T.C. Kimlik No", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const { tc, password } = credentials ?? {};

        if (tc === "11111111111" && password === "123456") {
          return {
            id: "1",
            name: "Ahmet Yılmaz",
            tc: "11111111111",
            role: "student", 
          };
        }
      
        if (tc === "22222222222" && password === "123456") {
          return {
            id: "2",
            name: "Mehmet Öğretmen",
            tc: "22222222222",
            role: "teacher",
          };
        }

        return null;
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
        token.role = user.role; // 👈 add role to token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role; // 👈 expose to session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
