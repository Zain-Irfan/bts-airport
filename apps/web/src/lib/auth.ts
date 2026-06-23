import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { isStaffRole } from "@/lib/auth-roles";
import { prisma } from "@/lib/prisma";

async function authorizeCredentials(
  email: string,
  password: string,
  allowed: "customer" | "staff",
) {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user || user.status !== "ACTIVE") return null;

  const staff = isStaffRole(user.role);
  if (allowed === "customer" && staff) return null;
  if (allowed === "staff" && !staff) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone ?? "",
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "customer",
      name: "Customer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        return authorizeCredentials(
          credentials.email,
          credentials.password,
          "customer",
        );
      },
    }),
    CredentialsProvider({
      id: "admin",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        return authorizeCredentials(credentials.email, credentials.password, "staff");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.phone = (user as { phone?: string }).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.sub!;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { phone?: string }).phone = token.phone as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
};

export function auth() {
  return getServerSession(authOptions);
}

/** Logged-in customer (USER role) for booking and account pages. */
export async function authCustomer() {
  const session = await auth();
  if (!session?.user || session.user.role !== "USER") return null;
  return session;
}

/** Admin/staff only — for protected API routes and layouts. */
export async function authStaff() {
  const session = await auth();
  if (!session?.user || !isStaffRole(session.user.role)) return null;
  return session;
}
