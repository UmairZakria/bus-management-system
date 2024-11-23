import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import Admin from "@/app/models/Admin";
import { connectMongo } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo();

        // Check for admin
        const admin = await Admin.findOne({ email: credentials.email });
        if (admin) {
          const pass = await bcrypt.compare(credentials.password, admin.password);
          if (!pass) {
            throw new Error("Invalid email or password for admin");
          }
          return { id: admin._id, email: admin.email, role: "admin" };
        }

        // Check for user
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          const pass = await bcrypt.compare(credentials.password, user.password);
          if (!pass) {
            throw new Error("Invalid email or password for user");
          }
          return { id: user._id, email: user.email, role: "user" };
        }

        // No match found
        throw new Error("No account found with this email");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role; // Add role to the session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role; // Include role in the JWT
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
