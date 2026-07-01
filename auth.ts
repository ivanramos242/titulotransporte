import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const googleConfigured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || "titulotransporte-local-development-secret",
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login/",
    newUser: "/mi-cuenta/",
  },
  providers: googleConfigured
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
      ]
    : [],
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as typeof session.user & { id?: string }).id = token.sub;
      }

      return session;
    },
  },
});
